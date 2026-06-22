"use client";

import { InteractiveHero } from "@/components/ui/interactive-hero-backgrounds";

export default function Home() {
  return (
    <InteractiveHero
      brandName="Portfolio"
      heroTitle="Interactive Hero Backgrounds"
      heroDescription="Engage users with dynamic, physics-based animations that respond to their every move. Built with React, Three.js, and shadcn/ui."
      emailPlaceholder="Enter your email"
      ballpitConfig={{
        count: 150,
        gravity: 0.5,
        friction: 0.99,
        minSize: 0.4,
        maxSize: 0.9,
        lightIntensity: 4,
      }}
    />
  );
}
