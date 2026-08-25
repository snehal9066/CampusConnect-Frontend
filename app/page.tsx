import { SpatialCanvas } from "@/components/campus/SpatialCanvas";
import { EventTimeline } from "@/components/campus/EventTimeline";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#030712] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <SpatialCanvas />
      <EventTimeline />
    </main>
  );
}