"use client";

import { useState } from "react";
import DawnFeatureCards from "@/components/DawnFeatureCards";
import Hero from "@/components/Hero";
import InteractiveArea from "@/components/InteractiveArea";
import DawnFooter from "@/components/DawnFooterSliding";
import IntroAnimation from "@/components/IntroAnimation";
import CompaniesBanner from "@/components/CompaniesBanner";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const handleAnimationComplete = () => {
    setShowIntro(false);
    // Add a small delay before setting animation as completed
    // This ensures all GSAP animations have fully cleared
    setTimeout(() => {
      setAnimationCompleted(true);
    }, 100);
  };

  return (
    <main className="relative">
      <div className="w-full">
        {showIntro && <IntroAnimation onComplete={handleAnimationComplete} />}
        <Hero />
        {/* Only render InteractiveArea when intro animation is finished */}
        {animationCompleted &&
          <>
            <CompaniesBanner />
            <InteractiveArea />
          </>
        }
        {/* Only render remaining components when intro animation is finished */}
        {animationCompleted && (
          <>
            <DawnFeatureCards />
            <DawnFooter />
          </>
        )}
      </div>
    </main>
  );
}