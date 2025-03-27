// components/IntroAnimation.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Typed from "typed.js";

interface IntroAnimationProps {
  onComplete?: () => void;
  onTransitionStart?: () => void;
}

export default function IntroAnimation({ onComplete, onTransitionStart }: IntroAnimationProps) {
  const introRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const typedRef = useRef<Typed | null>(null);

  useEffect(() => {
    // Disable scrolling during animation
    document.body.style.overflow = "hidden";

    // Capture the current value of the ref
    const textElement = textRef.current;
    const gradientElement = gradientRef.current;
    const introElement = introRef.current;

    // Initialize typed.js
    if (textElement) {
      typedRef.current = new Typed(textElement, {
        strings: ["Welcome to Dawn"],
        typeSpeed: 70,
        startDelay: 300,
        showCursor: false,
        cursorChar: "|",
        onComplete: () => {
          // Start gradient transition after typing completes
          startGradientAnimation();
        }
      });
    }

    return () => {
      // First, ensure typed.js is properly destroyed
      if (typedRef.current) {
        typedRef.current.destroy();
      }

      // Next, ensure the text content is cleared
      if (textElement) {
        textElement.innerHTML = '';
      }

      // Re-enable scrolling
      document.body.style.overflow = "auto";

      // Kill any active GSAP animations to ensure clean up
      gsap.killTweensOf(textElement);
      gsap.killTweensOf(gradientElement);
      gsap.killTweensOf(introElement);

      // Make sure the element is removed from DOM flow
      if (introElement) {
        introElement.style.display = 'none';
      }
    };
  }, []);

  const startGradientAnimation = () => {
    const timeline = gsap.timeline({
      onComplete: () => {
        // Clear the text content before animation completes
        if (textRef.current) {
          textRef.current.innerHTML = '';
        }

        // Force removal of any inline styles that might interfere with other animations
        if (introRef.current) {
          gsap.set(introRef.current, { clearProps: "all" });
        }
        if (gradientRef.current) {
          gsap.set(gradientRef.current, { clearProps: "all" });
        }
        if (textRef.current) {
          gsap.set(textRef.current, { clearProps: "all" });
        }

        // Call the onComplete prop when animation finishes
        if (onComplete) {
          onComplete();
        }
      }
    });

    // Fade out the welcome text
    timeline.to(textRef.current, {
      opacity: 0,
      duration: 1.5,
      delay: 0.8,
      onComplete: () => {
        // Immediately clear text content after fade out
        if (textRef.current) {
          textRef.current.innerHTML = '';
        }
      }
    });

    // Animate through the gradient colors
    // Starting with dark blue/black
    timeline.to(gradientRef.current, {
      background: "linear-gradient(to bottom, #0f0f22, #12122a)",
      duration: 0.5
    }, "-=0.5");

    // To purple
    timeline.to(gradientRef.current, {
      background: "linear-gradient(to bottom, #1a1a3a, #392d5b)",
      duration: 0.5
    });

    // To purple-pink
    timeline.to(gradientRef.current, {
      background: "linear-gradient(to bottom, #392d5b, #a64d79)",
      duration: 0.5
    });

    // To pink-orange
    timeline.to(gradientRef.current, {
      background: "linear-gradient(to bottom, #4e2d5b, #d15e54)",
      duration: 0.5
    });

    // To final orange-red
    timeline.to(gradientRef.current, {
      background: "linear-gradient(to bottom, #331f4d, #ff5252)",
      duration: 0.5
    });

    // Signal to start transitioning in the Hero component
    // before we start fading out the intro
    timeline.call(() => {
      if (onTransitionStart) {
        onTransitionStart();
      }
    }, [], "-=1.5");

    // Instead of fully fading out, reduce opacity to make room for Hero
    timeline.to(introRef.current, {
      opacity: 0,
      duration: 2.5, // Slower fade out for smoother transition
      pointerEvents: "none", // Prevent interaction during fade
      onComplete: () => {
        // Ensure we're setting overflow back to auto once the animation is done
        document.body.style.overflow = "auto";
      }
    });
  };

  return (
    <div
      ref={introRef}
      className="fixed inset-0 w-full h-screen flex items-center justify-center z-50"
    >
      <div
        ref={gradientRef}
        className="absolute inset-0 w-full h-full bg-black transition-all duration-300"
        style={{
          background: "linear-gradient(to bottom, #080810, #0c0c20)"
        }}
      />
      <div className="relative z-10">
        <h1
          className="text-white text-4xl font-light"
          style={{ opacity: 1 }}
        >
          <span ref={textRef}></span>
        </h1>
      </div>
    </div>
  );
}