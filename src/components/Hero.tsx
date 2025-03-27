// components/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import JoinWaitlist from "./JoinWaitlist";

export default function Hero() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate opacity based on scroll position
      // Fade out completely when scrolled to 50% of viewport height
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.5));
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mb-60">
      {/* Background Image that fades out on scroll */}
      <div
        className="fixed inset-0 w-full h-screen bg-cover bg-center -z-5 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("/dawn-background.png")',
          opacity: opacity
        }}
      />

      {/* Hero Content */}
      <div className="relative h-screen w-full flex flex-col items-start justify-left pl-20">
        <div className="flex">
          <h1 className="text-[265px] text-white font-degular font-extrabold flex leading-none">
            Dawn
          </h1>
          <div className="flex">
            <Image
              src="/period.svg"
              alt="Period"
              width={42}
              height={40}
              className="mt-[110px]"
            />
          </div>
        </div>
        <div className="text-white font-degular font-medium tracking-[-0.76px] text-4xl -mt-5">
          THE NETWORK FOR COMPOSABLE AGENTS
        </div>
        <div id="waitlist" className="absolute top-3/4 w-full max-w-3xl">
          <JoinWaitlist />
        </div>
      </div>
    </div>
  );
}