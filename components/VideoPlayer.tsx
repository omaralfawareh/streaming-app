"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export function VideoPlayer() {
  const IVSBroadcastClient = useRef(null);
  const clientRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const [isBroadcasting, setIsBroadcasting] = useState(false);

  useEffect(() => {
    (async () => {
      IVSBroadcastClient.current = (
        await import("amazon-ivs-web-broadcast")
      ).default;
      clientRef.current = IVSBroadcastClient.current.create({
        // Enter the desired stream configuration
        streamConfig: IVSBroadcastClient.current.BASIC_LANDSCAPE,
        // Enter the ingest endpoint from the AWS console or CreateChannel API
        ingestEndpoint: "",
      });
      // where #preview is an existing <canvas> DOM element on your page
      const previewEl = document.getElementById("canvas");
      clientRef.current.attachPreview(previewEl);
    })();
  }, []);

  return (
    <div className="pt-[100px] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-25 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Video Streaming</h1>
      <main className="flex flex-col gap-[32px] justify-center items-center align-center">
        <canvas
          id="canvas"
          width="640"
          height="480"
          className="border rounded"
        />

        {!isBroadcasting ? (
          <Button
            variant="destructive"
            onClick={() => {
              startBroadcast(IVSBroadcastClient, clientRef, videoRef, audioRef);
              setIsBroadcasting(true);
            }}
          >
            Start
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              setIsBroadcasting(false);
              try {
                clientRef.current?.stopBroadcast(clientRef);
                const videoStream = videoRef.current;
                const audioStream = audioRef.current;
                if (videoStream) {
                  const videoTrack = videoStream.getVideoTracks()[0];
                  videoTrack.enabled = false;
                  videoTrack.stop(); // This stops the video track completely
                }
                if (audioStream) {
                  const audioTrack = audioStream.getAudioTracks()[0];
                  audioTrack.enabled = false;
                  audioTrack.stop(); // This stops the audio track completely
                }
                console.log("Successfully ended broadcast");
              } catch (error) {
                console.error("Failed to stop broadcast:", error);
              }
            }}
          >
            Stop
          </Button>
        )}
      </main>
    </div>
  );
}

const startBroadcast = async (
  IVSBroadcastClient,
  clientRef,
  videoRef,
  audioRef
) => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter((d) => d.kind === "videoinput");
  const audioDevices = devices.filter((d) => d.kind === "audioinput");
  const streamConfig = IVSBroadcastClient.current.BASIC_LANDSCAPE;
  videoRef.current = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: videoDevices[0].deviceId,
      width: {
        ideal: streamConfig.maxResolution.width,
      },
      height: {
        ideal: streamConfig.maxResolution.height,
      },
    },
  });
  audioRef.current = await navigator.mediaDevices.getUserMedia({
    audio: { deviceId: audioDevices[1].deviceId },
  });
  clientRef.current.addVideoInputDevice(videoRef.current, "camera1", {
    index: 0,
  }); // only 'index' is required for the position parameter
  clientRef.current.addAudioInputDevice(audioRef.current, "mic1");
  clientRef.current
    .startBroadcast("")
    .then((result) => {
      console.log("I am successfully broadcasting!");
    })
    .catch((error) => {
      console.error("Something drastically failed while broadcasting!", error);
    });
};

async function handlePermissions() {
  let permissions = {
    audio: false,
    video: false,
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    for (const track of stream.getTracks()) {
      track.stop();
    }
    permissions = { video: true, audio: true };
  } catch (err) {
    permissions = { video: false, audio: false };
    console.error(err.message);
  }
  // If we still don't have permissions after requesting them display the error message
  if (!permissions.video) {
    console.error("Failed to get video permissions.");
  } else if (!permissions.audio) {
    console.error("Failed to get audio permissions.");
  }
}
