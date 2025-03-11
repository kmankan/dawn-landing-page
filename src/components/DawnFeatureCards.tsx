'use client'
import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import HoverCard from "./HoverCard";
import JoinWaitlist from "./JoinWaitlist";

// Main component containing all the cards
export default function DawnFeatureCards() {
  // Display content for Write card
  const writeDisplay = (
    <div className="flex justify-center items-center h-full">
      <DotLottieReact
        src="https://lottie.host/f98b743d-6571-4b92-b8b2-8ab04af0de7f/MEDRaVvORV.lottie"
        loop
        speed={0.5}
        autoplay
      />
    </div>
  );

  // Display content for Deploy card
  const deployDisplay = (
    // <div className="flex justify-center items-center h-full">
    //   <div className="text-8xl font-bold text-[#FFE176] tracking-widest" style={{
    //     WebkitTextStroke: '2px #FFE176',
    //     WebkitTextFillColor: 'transparent'
    //   }}>
    //     DAWN
    //   </div>
    // </div>
    <div className="flex justify-center items-center h-full">
      <DotLottieReact
        src="https://lottie.host/8052a3f2-3914-4dc2-8530-966052c609ff/Tzb0jFeFMr.lottie"
        loop
        autoplay
      />
    </div>
  );

  // Display content for Earn card
  const earnDisplay = (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute text-4xl text-[#FFE176]"
          style={{ top: '10%', left: '20%' }}
          animate={{
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 3,
          }}
        >
          ✧
        </motion.div>
        <motion.div
          className="absolute text-5xl text-[#FFE176]"
          style={{ top: '40%', left: '50%' }}
          animate={{
            rotate: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 4,
            delay: 0.5,
          }}
        >
          ✧
        </motion.div>
        <motion.div
          className="absolute text-4xl text-[#FFE176]"
          style={{ top: '70%', left: '30%' }}
          animate={{
            rotate: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 3.5,
            delay: 1,
          }}
        >
          ✧
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen">
      <div className="text-center mb-10 mt-80">
        <h1 className="text-3xl text-center font-semibold font-degular tracking-[-0.28px] text-white">BUILT FOR DEVS</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mx-10">
        {/* Write Card */}
        <HoverCard
          delay={0.1}
          displayContent={writeDisplay}
          title="Write"
          description="10 lines of code to deploy to the Dawn Network. That's it."
        />

        {/* Deploy Card */}
        <HoverCard
          delay={0.2}
          displayContent={deployDisplay}
          title="Deploy"
          description="Blazing fast deployment with zero infrastructure management."
        />

        {/* Earn Card */}
        <HoverCard
          delay={0.3}
          displayContent={earnDisplay}
          title="Earn"
          description="Emissions from agent usage go directly back to you."
        />
      </div>

      {/* Telegram section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="absolute top-3/4 left-1/2 -translate-x-1/2 w-full max-w-3xl"
      >
        <JoinWaitlist />
      </motion.div>
    </div>
  );
};