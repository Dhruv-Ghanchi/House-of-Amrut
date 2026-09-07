import React from "react";
import Hero from "@/components/home/Hero";
import LegacyOverview from "@/components/home/LegacyOverview";
import ThreeWays from "@/components/home/ThreeWays";
import TablesideBanner from "@/components/home/TablesideBanner";
import CuratedJourneys from "@/components/home/CuratedJourneys";
import RegionalPairings from "@/components/home/RegionalPairings";
import FooterCTA from "@/components/home/FooterCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LegacyOverview />
      <ThreeWays />
      <TablesideBanner />
      <CuratedJourneys />
      <RegionalPairings />
      <FooterCTA />
    </>
  );
}