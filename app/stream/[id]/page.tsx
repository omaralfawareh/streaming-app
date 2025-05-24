import prisma from "@/lib/prisma";

const Stream = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const channel = await prisma.channel.findUnique({
    where: { slug: id },
  });
  let isLive;

  if (channel?.playbackUrl) {
    isLive = await fetch(channel?.playbackUrl)
      .then((res) => {
        return res.ok;
      })
      .catch(() => {
        return false;
      });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <h1>Live: {isLive ? "Yes" : "No"}</h1>
      <p>Playback url: {channel?.playbackUrl}</p>
    </div>
  );
};

export default Stream;
