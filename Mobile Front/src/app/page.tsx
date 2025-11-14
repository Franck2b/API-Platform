"use client";

import { HeroSection, PopularPackage, TravelRecommendations } from "@/components";

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <HeroSection />
      <PopularPackage />
      <TravelRecommendations />
    </div>
  );
}
