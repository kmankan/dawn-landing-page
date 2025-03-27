"use client";

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentCard from './AgentCard';
import { agents } from '@/lib/agentData';
import Typewriter from 'typewriter-effect'
import ComposerModal from './ComposerModal';
import { useSequence } from '@/hooks/useSequence';
import { useTypingStore } from '@/store/typing-store';

// Split agents into columns for conveyor belt effect
// Using 6 columns to create a grid layout for the scrolling cards
const COLUMNS = 6;
const columns = Array.from({ length: COLUMNS }, (_, i) =>
  agents.filter((_, index) => index % COLUMNS === i)
);

export default function ImprovedInteractiveArea() {
  // Track when component enters viewport to trigger animations
  const { ref, inView } = useInView({
    triggerOnce: false, // Component will re-animate when it re-enters the viewport
    threshold: 0.5,     // Trigger when 50% of the component is visible
  });

  // Local component state
  const [animationStarted, setAnimationStarted] = useState(false); // Track if animation sequence has begun
  const [showModal, setShowModal] = useState(false);               // Control modal visibility
  const [showTypewriter, setShowTypewriter] = useState(false);     // Control typewriter animation

  // Global state from Zustand store for cross-component coordination
  const {
    setTypingCompleted,          // Signal when typewriter is done typing
    targetCardsHighlighted,      // Track if cards should be highlighted
    setTargetCardsHighlighted,   // Toggle card highlight state
    resetTypingCompleted,        // Reset typing completion state
    resetTargetCardsHighlighted  // Reset card highlight state
  } = useTypingStore();

  // Helper hook to run a sequence of timed actions
  const { runSequence } = useSequence();

  // Function to hide typewriter with a small delay (for smooth transitions)
  const resetTypewriter = () => {
    setTimeout(() => {
      setShowTypewriter(false);
    }, 500);
  };

  // Reset all animation states when component leaves viewport
  useEffect(() => {
    if (!inView && animationStarted) {
      setAnimationStarted(false);
      resetTypingCompleted();
      resetTargetCardsHighlighted();
      setShowModal(false);
      setShowTypewriter(false);
    }
  }, [inView, animationStarted, resetTypingCompleted, resetTargetCardsHighlighted]);

  // Start animation sequence when component comes into view
  useEffect(() => {
    if (inView && !animationStarted) {
      setAnimationStarted(true);
      setShowTypewriter(true); // Begin typewriter animation
    }
  }, [inView, animationStarted]);

  // Control modal visibility based on card highlight state
  useEffect(() => {
    if (targetCardsHighlighted && !showModal) {
      // Show modal when cards are highlighted
      setShowModal(true);
    } else if (!targetCardsHighlighted && showModal) {
      // Add small delay before hiding modal for smooth transition
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [targetCardsHighlighted, showModal]);

  return (
    <div id="demo-component" className="flex items-center justify-center min-h-screen">
      <div
        ref={ref} // Intersection observer reference to detect viewport visibility
        id="demo-canvas"
        className="container max-w-[98vw] text-center text-white relative"
      >
        {/* Main container for the scrolling agent cards */}
        <div
          id="agent-container"
          className="z-2 bg-stone-800 overflow-hidden h-[110vh] relative rounded-[60px]"
        >
          {/* Gradient overlay creates a fade-out effect for cards at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none z-10">
            <div className="absolute inset-x-0 bottom-0 h-1/4"
              style={{ background: 'linear-gradient(to top, rgba(28, 25, 23, 1), rgba(28, 25, 23, 0.9))' }}>
            </div>
            <div className="absolute inset-x-0 bottom-[25%] h-1/4"
              style={{ background: 'linear-gradient(to top, rgba(28, 25, 23, 0.9), rgba(28, 25, 23, 0.8))' }}>
            </div>
            <div className="absolute inset-x-0 bottom-[50%] h-1/2"
              style={{ background: 'linear-gradient(to top, rgba(28, 25, 23, 0.8), rgba(28, 25, 23, 0))' }}>
            </div>
          </div>

          <div className="z-3 relative text-2xl text-[#CACACA] font-semibold font-degular tracking-[-0.25px] top-0 left-1/2 -translate-x-1/2 bg-black/70 w-2/12 rounded-full p-1.5 mt-10">
            HOW IT WORKS
          </div>

          {/* Grid of scrolling agent card columns */}
          <div className="grid grid-cols-6 -m-48">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="relative overflow-hidden h-[130vh]">
                <motion.div
                  className="column-content-container"
                  // Set different initial positions based on column index (alternating pattern)
                  initial={{
                    y: colIndex % 2 === 0 ? "0%" : "-50%"
                  }}
                  // Animate to different positions when animation starts
                  animate={animationStarted ? {
                    y: colIndex % 2 === 0
                      ? "-15%" // Target for even columns
                      : "-35%"  // Target for odd columns
                  } : {
                    y: colIndex % 2 === 0 ? "0%" : "-50%"
                  }}
                  transition={{
                    duration: 7, // 7 second duration for slow scrolling effect
                    ease: "linear",
                    delay: 1,
                  }}
                >
                  {/* First copy of cards */}
                  <div className="column-content">
                    {column.map((agent, idx) => (
                      <div className="mb-5 flex justify-center" key={`a-${idx}`}>
                        <AgentCard {...agent} />
                      </div>
                    ))}
                  </div>

                  {/* Second copy of cards (duplicated to create seamless looping effect) */}
                  <div className="column-content">
                    {column.map((agent, idx) => (
                      <div className="mb-5 flex justify-center" key={`b-${idx}`}>
                        <AgentCard {...agent} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle orange glow effect behind the input box */}
        <div
          id="glow-projection-container"
          style={{
            borderRadius: '100%',
            boxShadow: '0 0 200px 20px rgba(249, 115, 22, 0.25)'
          }}
          className="absolute left-1/2 top-0 -translate-x-1/2 z-25 bg-black text-white w-5/12 h-[120px] p-2 mt-[82vh]">
        </div>

        {/* Simulated input container with typewriter animation */}
        <div
          id="text-container"
          style={{
            borderRadius: '18px',
            border: '1px solid #5C5C5C'
          }}
          className="absolute left-1/2 top-0 -translate-x-1/2 z-30 bg-black text-white w-7/12 h-[120px] rounded-2xl p-2 mt-[82vh]">
          <div className="w-full h-full flex items-start justify-start text-left font-sans text-2xl font-normal tracking-[0.6px] text-[#F9F9F9]">
            {/* Typewriter component simulates typing an example prompt */}
            {showTypewriter && (
              <Typewriter
                onInit={(typewriter) => {
                  // Animation sequence for the typewriter
                  typewriter
                    .pauseFor(1500)                // Wait before starting typing
                    .changeDelay(15)               // Set typing speed (15ms per character)
                    .typeString('Send me a market summary of a token on telegram whenever a top user on kaito drops a token / token address on x. Latency is important.')
                    .callFunction(() => {
                      // Run a sequence of timed actions after typing completes
                      runSequence([
                        [() => setTypingCompleted(true), 800],        // Signal typing is complete
                        [() => setTargetCardsHighlighted(true), 3000], // Highlight relevant cards after 3s
                        [() => setTypingCompleted(false), 500]         // Reset typing state
                      ]);
                    })
                    .start();
                }}
                options={{
                  cursor: '' // Hide the cursor
                }}
              />
            )}
          </div>
        </div>

        {/* Modal that appears to show composition result based on animation sequence */}
        <AnimatePresence mode="wait">
          {showModal && (
            <ComposerModal
              resetTypewriter={resetTypewriter} // Callback to reset typewriter when needed
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}