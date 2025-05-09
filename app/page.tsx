import { VideoPlayer } from "@/components/VideoPlayer";

async function Home() {
  return (
    <>
      <VideoPlayer />
    </>
  );
}

export default function HomeSuspense() {
  return (
    <>
      <Home />
    </>
  );
}
