"use client";
import { VideoPlayer } from "@/components/VideoPlayer";

function Home() {
  return <VideoPlayer />;
}

export default function HomeSuspense() {
  return (
    <>
      <Home />
    </>
  );
}
