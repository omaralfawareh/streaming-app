"use client";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { Player } from "bitmovin-player";
import { UIFactory } from "bitmovin-player/bitmovinplayer-ui";
import "bitmovin-player/bitmovinplayer-ui.css";

export function VideoPlayer({ data }) {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("omar theme", theme);

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  const [player, setPlayer] = useState(null);
  const playerDiv = useRef();

  const playerConfig = {
    key: "",
    ui: false,
  };

  const playerSource = {
    dash: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
    hls: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    poster:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg",
  };

  useEffect(() => {
    function setupPlayer() {
      const playerInstance = new Player(playerDiv.current, playerConfig);
      UIFactory.buildDefaultUI(playerInstance);
      playerInstance.load(playerSource).then(
        () => {
          setPlayer(playerInstance);
          console.log("Successfully loaded source");
        },
        () => {
          console.log("Error while loading source");
        }
      );
    }

    setupPlayer();

    return () => {
      function destroyPlayer() {
        if (player != null) {
          player.destroy();
          setPlayer(null);
        }
      }

      destroyPlayer();
    };
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Video Streaming</h1>
      <main className="flex flex-col gap-[32px] justify-center items-center align-center">
        <div id="player" ref={playerDiv}></div>
      </main>
    </div>
  );
}
