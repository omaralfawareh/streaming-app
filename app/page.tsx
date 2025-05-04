/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentUser } from "@clerk/nextjs/server";

import { VideoPlayer } from "@/components/VideoPlayer";

async function Home() {
  const user = await currentUser();
  const data = await getData();
  console.log("user", user?.externalAccounts?.[0]?.firstName);

  return (
    <>
      <div className="flex flex-row justify-center">
        <h1 className="text-center text-4xl">
          {`Welcome ${user?.externalAccounts?.[0]?.firstName} ${user?.externalAccounts?.[0]?.lastName}`}
        </h1>
      </div>
      <VideoPlayer data={data} />
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

const getData = async () => {
  const omar = await new Promise((resolve) => {
    setTimeout(() => resolve(""), 2000);
  });
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();

  return data;
};
