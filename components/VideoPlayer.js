"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import httpSourceSelector from "videojs-http-source-selector";
import qualityLevels from "videojs-contrib-quality-levels";
import "videojs-quality-selector-hls";

videojs.registerPlugin("httpSourceSelector", httpSourceSelector);
videojs.registerPlugin("qualityLevels", qualityLevels);

export default function VideoPlayer({ playbackUrl }) {
  const playerOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
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
        src: playbackUrl,
      },
    ],
  };

  const videoRef = useRef(null);
  const playerRef = useRef(null);

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
    <div data-vjs-player className="w-full">
      <div ref={videoRef} />
    </div>
  );
}
