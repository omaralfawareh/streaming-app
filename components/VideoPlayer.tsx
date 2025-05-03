"use client";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext, useEffect, useRef } from "react";
import ReactHlsPlayer from "react-hls-player";

export function VideoPlayer() {
  const { theme, setTheme } = useContext(ThemeContext);
  const playerRef = useRef<HTMLVideoElement>();

  console.log("omar theme", theme);
  useEffect(() => {
    const fireOnVideoStart = () => {
      console.log("Video Playing");
    };

    playerRef.current.addEventListener("play", fireOnVideoStart);
    return () => {
      playerRef.current.removeEventListener("play", fireOnVideoStart);
    };
  }, []);
  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Video Streaming</h1>
      <main className="flex flex-col gap-[32px] justify-center items-center align-center">
        <ReactHlsPlayer
          playerRef={playerRef}
          src="https://ddvt6ym7hiskl.cloudfront.net/production/output22/Forest.mp4/Forest.m3u8"
          autoPlay={true}
          controls={true}
          width="500"
          height="500"
        />
      </main>
    </div>
  );
}
