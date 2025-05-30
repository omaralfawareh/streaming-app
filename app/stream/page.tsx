import StreamBroadcast from "@/components/StreamBroadcast";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-12 pt-10 px-7 pb-7 xl:px-20 min-h-full items-center justify-center xl:justify-start">
      <StreamBroadcast />
    </div>
  );
};

export default Dashboard;
