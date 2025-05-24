import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import {
  CreateChannelCommand,
  CreateChannelCommandInput,
  IvsClient,
} from "@aws-sdk/client-ivs";
import prisma from "@/lib/prisma";

const ivsClient = new IvsClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const secret = process.env.SIGNING_SECRET;
  if (!secret) return new Response("Missing secret", { status: 500 });

  const webhook = new Webhook(secret);
  const body = await req.text();
  const headerPayload = await headers();

  let event;
  try {
    event = webhook.verify(body, {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get("svix-timestamp")!,
      "svix-signature": headerPayload.get("svix-signature")!,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return new Response(
      JSON.stringify({ error: "Invalid webhook signature" }),
      { status: 401 }
    );
  }

  if (event.type === "user.created") {
    let user;
    try {
      user = await prisma.user.create({
        data: {
          clerkId: event.data.id,
          email: event.data.email_addresses?.[0]?.email_address,
          ...(event.data?.first_name &&
            event.data?.first_name && {
              name: `${event.data.first_name} ${event.data.last_name}`,
            }),
        },
      });
    } catch (error) {
      console.error("Error creating user in database:", error);
      return new Response(JSON.stringify({ error: "Failed to create user" }), {
        status: 500,
      });
    }

    const input: CreateChannelCommandInput = {
      name: `${user.email.split("@")[0]}_channel`,
      latencyMode: "LOW",
      type: "STANDARD",
      authorized: false,
      insecureIngest: false,
    };

    const command = new CreateChannelCommand(input);
    let response;

    try {
      response = await ivsClient.send(command);
    } catch (error) {
      console.error("Error creating IVS channel:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create IVS channel" }),
        {
          status: 500,
        }
      );
    }

    const { channel: ivsChannel, streamKey } = response;

    if (!ivsChannel || !streamKey) {
      console.error("Failed to create channel", response);
      return new Response(
        JSON.stringify({ error: "Failed to create channel", response }),
        {
          status: 500,
        }
      );
    }

    try {
      await prisma.channel.create({
        data: {
          arn: ivsChannel.arn!,
          streamKey: streamKey.value!,
          streamKeyArn: streamKey.arn!,
          ingestUrl: ivsChannel.ingestEndpoint!,
          playbackUrl: ivsChannel.playbackUrl!,
          type: ivsChannel.type!,
          latencyMode: ivsChannel.latencyMode!,
          name: ivsChannel.name!,
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error creating channel in database:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create channel" }),
        { status: 500 }
      );
    }
  }

  return new Response("OK");
}
