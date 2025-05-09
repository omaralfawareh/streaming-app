export function VideoPlayer() {
  return (
    <div className="pt-[100px] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-25 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Video Streaming</h1>
      <main className="flex flex-col gap-[32px] justify-center items-center align-center">
        <video
          controls
          muted
          src="https://ddvt6ym7hiskl.cloudfront.net/production/input/videoplayback.mp4"
        />
      </main>
    </div>
  );
}
