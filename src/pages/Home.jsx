import React from "react";
import Hero from "@/components/home/Hero";
import LegacyOverview from "@/components/home/LegacyOverview";
import ThreeWays from "@/components/home/ThreeWays";
import TablesideBanner from "@/components/home/TablesideBanner";
import RegionalPairings from "@/components/home/RegionalPairings";
import FooterCTA from "@/components/home/FooterCTA";
import { useHomePage } from "@/hooks/useCms";
import { CmsLoading, CmsError } from "@/components/CmsState";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function Home() {
  const { data: page, isLoading, isError } = useHomePage();
  useDocumentMeta(page?.seo);

  if (isLoading) return <CmsLoading />;
  if (isError || !page) return <CmsError label="the home page" />;

  return (
    <>
      <Hero page={page} />
      <LegacyOverview page={page} />
      <ThreeWays page={page} />
      <TablesideBanner page={page} />
      <RegionalPairings page={page} />
      <FooterCTA page={page} />
    </>
  );
}
