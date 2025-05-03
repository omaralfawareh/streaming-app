/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext, useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import httpSourceSelector from "videojs-http-source-selector";
import qualityLevels from "videojs-contrib-quality-levels";
import "videojs-quality-selector-hls";

videojs.registerPlugin("httpSourceSelector", httpSourceSelector);
videojs.registerPlugin("qualityLevels", qualityLevels);

const playerOptions = {
  autoplay: true,
  controls: true,
  responsive: true,
  fluid: true,
  width: 500,
  height: 500,
  plugins: {
    httpSourceSelector: {
      default: "auto",
    },
  },
  controlBar: {
    children: [
      "playToggle",
      "volumePanel",
      "currentTimeDisplay",
      "timeDivider",
      "durationDisplay",
      "progressControl",
      "liveDisplay",
      "seekToLive",
      "remainingTimeDisplay",
      "playbackRateMenuButton",
      "chaptersButton",
      "descriptionsButton",
      "subsCapsButton",
      "audioTrackButton",
      "fullscreenToggle",
      "qualitySelector",
    ],
  },
  sources: [
    {
      src: "https://ddvt6ym7hiskl.cloudfront.net/production/output22/Forest.mp4/Forest.m3u8",
    },
  ],
};

export function VideoPlayer() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.className = "video-js vjs-big-play-centered";
      videoRef.current.appendChild(videoElement);

      const player = videojs(videoElement, playerOptions, function () {
        videojs.log("Player is ready");
        player.httpSourceSelector();
        playerRef.current = player;

        const levels = player.qualityLevels();

        levels.on("addqualitylevel", function (event) {
          const level = event.qualityLevel;
          console.log("New quality level added:", level);
        });
        player.qualitySelectorHls();
        player.on("waiting", () => videojs.log("player is waiting"));
        player.on("dispose", () => videojs.log("player will dispose"));
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Video Streaming</h1>
      <main className="flex flex-col gap-[32px] justify-center items-center w-1/2">
        <div data-vjs-player className="w-full">
          <div ref={videoRef} />
        </div>
      </main>
    </div>
  );
}
