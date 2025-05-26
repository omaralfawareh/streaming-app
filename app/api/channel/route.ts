import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        channel: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch user channel", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response(JSON.stringify(user?.channel), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
