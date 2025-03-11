'use client'
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DawnFooter = () => {
  // Use Framer Motion's scroll utilities
  const { scrollY } = useScroll();

  // Set default viewport height and update it after component mounts
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    // Set the initial viewport height
    setViewportHeight(window.innerHeight);

    // Update viewport height on window resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform scroll position to animation values
  // Animation completes over 50% of viewport height
  const scrollProgress = useTransform(scrollY, [0, viewportHeight * 0.5], [0, 1]);

  // Derive animation values from scroll progress
  const modalY = useTransform(scrollProgress, [0, 1], ['0%', '-100%']);

  // More dramatic text animation values
  // Text starts completely hidden underneath (100px down) with 0 opacity and smaller size
  // Then slides up while fading in and growing to full size
  const textY = useTransform(scrollProgress, [0, 1], ['100px', '0px']);
  const textOpacity = useTransform(scrollProgress, [0, 1], [0, 1]);
  const textScale = useTransform(scrollProgress, [0, 1], [0.6, 1]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Red modal that moves up based on scroll */}
      <motion.div
        className="absolute inset-0 bg-red-600"
        style={{ y: modalY }}
        initial={{ y: '0%' }}
      />

      {/* Content container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Dawn text with gradient and animation */}
        <motion.h1
          style={{
            fontFamily: 'Degular, sans-serif',
            fontSize: '205px',
            fontWeight: 800,
            lineHeight: '602.091px',
            letterSpacing: '-15.141px',
            background: 'linear-gradient(180deg, #D33702 35.82%, #000000 99.81%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            y: textY,
            opacity: textOpacity,
            scale: textScale,
            transformOrigin: 'center bottom', // Set transform origin to grow from bottom
          }}
          initial={{ y: '100px', opacity: 0, scale: 0.6 }}
        >
          Dawn
        </motion.h1>
      </div>

      {/* Add extra height to enable scrolling */}
      <div className="h-screen"></div>
    </div>
  );
};

export default DawnFooter;