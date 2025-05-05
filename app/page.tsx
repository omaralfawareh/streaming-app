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

// const getData = async () => {
//   const omar = await new Promise((resolve) => {
//     setTimeout(() => resolve(""), 2000);
//   });
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos");
//   const data = await response.json();

//   return data;
// };
