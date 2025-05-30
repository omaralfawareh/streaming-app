import prisma from "@/lib/prisma";
import VideoPlayer from "@/components/VideoPlayer";
const Stream = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const channel = await prisma.channel.findUnique({
    where: { slug: id },
  });

  return (
    <div className="flex flex-col items-center gap-7 pt-10 px-7 xl:px-20">
      <p>Playback url: {channel?.playbackUrl}</p>
      <div className=" w-full h-full xl:w-[70%]">
        <VideoPlayer playbackUrl={channel?.playbackUrl} />
      </div>
    </div>
  );
};

export default Stream;
