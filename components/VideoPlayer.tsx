"use client";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext, useEffect } from "react";

export function VideoPlayer({ data }) {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("omar theme", theme);

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Video Streaming</h1>
      <main className="flex flex-col gap-[32px] justify-center items-center align-center">
        <video
          controls
          muted
          src="https://ddvt6ym7hiskl.cloudfront.net/production/input/videoplayback.mp4"
        />
        {data ? data?.map((item: any) => item.title) : <div>...Loading</div>}
      </main>
    </div>
  );
}
