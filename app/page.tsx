/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { VideoPlayer } from "@/components/VideoPlayer";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function Home() {
  const data = await getData();
  return <VideoPlayer data={data} />;
}

export default function HomeSuspense() {
  return <Home />;
}

const getData = async () => {
  const cookieStore = cookies();
  const omar = await new Promise((resolve) => {
    setTimeout(() => resolve(""), 2000);
  });
  // const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  // const data = await response.json();

  return [];
};
