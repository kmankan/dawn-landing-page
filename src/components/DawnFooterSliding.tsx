'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DawnFooter() {
  const containerRef = useRef(null);

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Start tracking when section enters viewport, end when it leaves
  });

  // Transform scroll progress to Y position for the text
  const textY = useTransform(scrollYProgress, [0, 0.5], ['-90%', '0%']);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Container for controlling the reveal effect */}
      <div className="relative w-full flex items-center justify-center">
        {/* Dawn text with gradient and animation */}
        <motion.h1
          style={{
            fontFamily: 'Degular, sans-serif',
            fontSize: '700px',
            fontWeight: 800,
            lineHeight: '602.091px',
            letterSpacing: '-15.141px',
            background: 'linear-gradient(180deg, #D33702 35.82%, #000000 99.81%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            y: textY,
            scale: textScale,
            textAlign: 'center',
          }}
        >
          Dawn
        </motion.h1>
      </div>
    </div>
  );
}