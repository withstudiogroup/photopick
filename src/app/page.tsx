"use client";

import PageTransition from "@/components/PageTransition";
import {
  HeroSection,
  EventSection,
  CategoriesSection,
  FeaturedSection,
  PickSection,
  DealSection,
  ReviewsSection,
  RegionsSection,
  CTASection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <EventSection />
      <CategoriesSection />
      <FeaturedSection />
      <PickSection />
      <DealSection />
      <ReviewsSection />
      <RegionsSection />
      <CTASection />
    </PageTransition>
  );
}
