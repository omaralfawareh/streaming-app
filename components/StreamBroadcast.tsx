"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { MicIcon } from "./svgs/MicIcon";
import { MicMuteIcon } from "./svgs/MicMuteIcon";
import { CameraVideoIcon } from "./svgs/CameraVideoIcon";
import { CameraVideoOffIcon } from "./svgs/CameraVideoOffIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardIcon } from "./svgs/ClipboardIcon";
import { CheckMarkIcon } from "./svgs/CheckMarkIcon";

export default function StreamBroadcast() {
  const IVSBroadcastClient = useRef<any>(null);
  const clientRef = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const [isLive, setIsLive] = useState(false);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedAudio, setSelectedAudio] = useState<string>("");
  const [channelData, setChannelData] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyStreamLink = async () => {
    // Static stream link for now
    const streamLink = `${window.location.origin}/stream/${channelData?.slug}`;
    try {
      await navigator.clipboard.writeText(streamLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 4000);
    } catch (err) {
      console.error("Failed to copy stream link:", err);
    }
  };

  useEffect(() => {
    const fetchChannelData = async () => {
      const response = await fetch("/api/channel", {
        next: { revalidate: false },
      });
      const data = await response.json();
      setChannelData({
        ...data,
      });
    };
    fetchChannelData();
  }, []);

  useEffect(() => {
    const initiateClient = async () => {
      IVSBroadcastClient.current =
        // Dynacmically import the amazon-ivs-web-broadcast package to avoid an .self reference error
        (await import("amazon-ivs-web-broadcast")).default;
      const streamConfig =
        // Use portrait mode for mobile devices
        window.innerWidth <= 768
          ? IVSBroadcastClient.current.BASIC_PORTRAIT
          : IVSBroadcastClient.current.BASIC_LANDSCAPE;

      clientRef.current = IVSBroadcastClient.current.create({
        streamConfig,
        // Channel ingest endpoint
        ingestEndpoint: `${channelData?.ingestUrl}`,
      });

      const previewEl = document.getElementById("canvas");
      clientRef.current.attachPreview(previewEl);

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices?.filter((d) => d.kind === "videoinput");
      const audioDevices = devices?.filter((d) => d.kind === "audioinput");
      videoRef.current = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: videoDevices?.[0]?.deviceId,
          width: {
            ideal: streamConfig.maxResolution.width,
          },
          height: {
            ideal: streamConfig.maxResolution.height,
          },
        },
      });
      const videDevicesAfter = (
        await navigator.mediaDevices.enumerateDevices()
      ).filter((d) => d.kind === "videoinput");
      setVideoDevices(videDevicesAfter);
      audioRef.current = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: audioDevices?.[1]?.deviceId },
      });
      const audioDevicesAfter = (
        await navigator.mediaDevices.enumerateDevices()
      ).filter((d) => d.kind === "audioinput");
      setAudioDevices(audioDevicesAfter);
      setSelectedAudio(audioDevicesAfter[0]?.deviceId);
      setSelectedCamera(videDevicesAfter[0]?.deviceId);
      if (!clientRef.current.getVideoInputDevice("camera1")) {
        clientRef.current.addVideoInputDevice(videoRef.current, "camera1", {
          index: 0,
        });
      }
      if (!clientRef.current.getAudioInputDevice("mic1")) {
        clientRef.current.addAudioInputDevice(audioRef.current, "mic1");
      }
    };

    if (channelData) {
      initiateClient();
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.detachPreview();
      }
      if (clientRef.current && isLive) {
        clientRef.current.stopBroadcast();
      }
      const videoStream = videoRef.current;
      const audioStream = audioRef.current;
      if (videoStream) {
        const videoTrack = videoStream.getVideoTracks()?.[0];
        videoTrack.enabled = false;
        videoTrack.stop(); // This stops the video track completely\
        try {
          clientRef.current.removeVideoInputDevice("camera1");
        } catch (e) {
          console.log("Error removing video device", e);
          // Ignore RemoveDeviceNotFoundError or any error if device is already removed
        }
      }
      if (audioStream) {
        const audioTrack = audioStream.getAudioTracks()[0];
        audioTrack.enabled = false;
        audioTrack.stop(); // This stops the audio track completely
        try {
          clientRef.current.removeAudioInputDevice("mic1");
        } catch (e) {
          console.log("Error removing audio device", e);
          // Ignore RemoveDeviceNotFoundError or any error if device is already removed
        }
      }
      IVSBroadcastClient.current = null;
      clientRef.current = null;
      videoRef.current = null;
      audioRef.current = null;
    };
  }, [channelData]);

  return (
    <>
      <main className="flex flex-col gap-[32px] justify-center items-center align-center h-full">
        <canvas
          id="canvas"
          className="border rounded w-full h-full 2xl:min-h-[480px] max-w-[1280px] max-h-[720px] aspect-[4/5] md:aspect-video"
        />

        <div className="flex flex-row w-full gap-4 justify-center">
          <Select
            onValueChange={async (value) => {
              if (value === "off") {
                clientRef.current?.disableVideo();
              } else {
                clientRef.current?.removeVideoInputDevice("camera1");
                const streamConfig = IVSBroadcastClient.current.BASIC_LANDSCAPE;
                videoRef.current = await navigator.mediaDevices.getUserMedia({
                  video: {
                    deviceId: value,
                    width: {
                      ideal: streamConfig.maxResolution.width,
                    },
                    height: {
                      ideal: streamConfig.maxResolution.height,
                    },
                  },
                });
                clientRef.current?.addVideoInputDevice(
                  videoRef.current,
                  "camera1",
                  {
                    index: 0,
                  }
                );
                clientRef.current?.enableVideo();
              }
              setSelectedCamera(value);
            }}
            value={selectedCamera}
          >
            <SelectTrigger className="rounded-full">
              {selectedCamera === "off" ? (
                <CameraVideoOffIcon />
              ) : (
                <CameraVideoIcon />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="off" value="off">
                Off
              </SelectItem>
              {videoDevices?.map(
                (device) =>
                  device.deviceId && (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label || device.deviceId}
                    </SelectItem>
                  )
              )}
            </SelectContent>
          </Select>

          <Select
            onValueChange={async (value) => {
              setSelectedAudio(value);
              if (value === "off") {
                clientRef.current?.disableAudio();
              } else {
                clientRef.current?.removeAudioInputDevice("mic1");
                audioRef.current = await navigator.mediaDevices.getUserMedia({
                  audio: { deviceId: value },
                });
                clientRef.current?.addAudioInputDevice(
                  audioRef.current,
                  "mic1"
                );
                clientRef.current?.enableAudio();
              }
            }}
            value={selectedAudio}
          >
            <SelectTrigger className="rounded-full">
              {selectedAudio === "off" ? <MicMuteIcon /> : <MicIcon />}
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="off" value="off">
                Off
              </SelectItem>
              {audioDevices?.map(
                (device) =>
                  device?.deviceId && (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label || device.deviceId}
                    </SelectItem>
                  )
              )}
            </SelectContent>
          </Select>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleCopyStreamLink}
                variant="outline"
                className="rounded-full text-muted-foreground"
              >
                {copySuccess ? <CheckMarkIcon /> : <ClipboardIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Stream Link</p>
            </TooltipContent>
          </Tooltip>

          {!isLive ? (
            <Button
              variant="destructive"
              onClick={() => {
                startBroadcast(clientRef, channelData);
                setIsLive(true);
              }}
            >
              Start
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setIsLive(false);
                try {
                  clientRef.current?.stopBroadcast(clientRef);
                  console.log("Successfully ended broadcast");
                } catch (error) {
                  console.error("Failed to end broadcast:", error);
                }
              }}
            >
              Stop
            </Button>
          )}
        </div>
      </main>
    </>
  );
}

const startBroadcast = async (clientRef: any, channelData: any) => {
  clientRef.current
    .startBroadcast(
      // Streamer key
      channelData?.streamKey
    )
    .then(() => {
      console.log("Successfully broadcasting!");
    })
    .catch((error: any) => {
      console.error("Something failed while broadcasting!", error);
    });
};
