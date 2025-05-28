- Use the `/api/channel` endpoint to fetch user ingest url and stream key.
- Setup Live Badge on home page.

  ```js
  // app/api/channel/update-live-status/route.ts
  import { prisma } from "@/lib/prisma";
  import { revalidatePath } from "next/cache";
  import { NextResponse } from "next/server";

  export async function POST(req) {
    const { channelId, isLive } = await req.json();

    // Update DB
    await prisma.channel.update({
      where: { id: channelId },
      data: { is_live: isLive },
    });

    // Invalidate homepage so it refetches fresh data
    revalidatePath("/");

    return NextResponse.json({ success: true });
  }
  ```

- Change Auth provider or setup clerk for production.
