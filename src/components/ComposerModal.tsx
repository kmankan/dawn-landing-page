import { AnimatePresence, motion } from 'framer-motion';
import { agents } from '@/lib/agentData';
import { useState, useEffect } from 'react';
import AgentCard from './AgentCard';
import Image from 'next/image';
import NotificationMessage from './NotificationMessage';
import { createPortal } from 'react-dom';
import { useTypingStore } from '@/store/typing-store';

// SVG Component for vertical lines with progress
const VerticalLinesSvg = ({ progress = 0 }) => {
  const lines = [1, 11, 21, 31, 41, 51, 61, 71, 80, 90, 99];
  const totalLines = lines.length;

  // Calculate how much progress is allocated to each line
  const progressPerLine = 1 / totalLines;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="55" viewBox="0 0 100 55" fill="none">
      {/* Gray background lines (always visible) */}
      {lines.map((x, i) => (
        <path
          key={`bg-${i}`}
          d={`M ${x} 1V54`}
          stroke="#515151"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      {/* Orange foreground lines (filled sequentially) */}
      {lines.map((x, i) => {
        // Calculate line-specific progress
        const lineStartProgress = i * progressPerLine;
        const lineEndProgress = (i + 1) * progressPerLine;

        // How much of this specific line should be filled
        let lineProgress = 0;

        if (progress >= lineEndProgress) {
          // This line is completely filled
          lineProgress = 1;
        } else if (progress > lineStartProgress) {
          // This line is partially filled
          lineProgress = (progress - lineStartProgress) / progressPerLine;
        }

        return (
          <path
            key={`fg-${i}`}
            d={`M ${x} 1V54`}
            stroke="#F97316" // Orange color
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="53"
            strokeDashoffset={53 - (53 * lineProgress)}
          />
        );
      })}
    </svg>
  );
};

export default function ComposerModal({
  resetTypewriter
}: {
  resetTypewriter: () => void
}) {
  const { setTargetCardsHighlighted } = useTypingStore();
  const [showFloatingCards, setShowFloatingCards] = useState(true);
  const [cardCompleted, setCardCompleted] = useState([false, false, false]);
  const [lineProgress, setLineProgress] = useState([0, 0]); // Progress for each separator
  const [showNotification, setShowNotification] = useState(false);
  const [notificationState, setNotificationState] = useState('idle'); // 'idle', 'showing', 'hiding', 'complete'

  // Filter highlighted agents for our animation
  const highlightedAgents = agents
    .filter(agent => agent.highlight)
    .sort((a, b) => {
      // Order array based on agent names
      const orderList = ["X Fast Indexer", "Kaito", "telegram chat"];
      return orderList.indexOf(a.name) - orderList.indexOf(b.name);
    });

  // Approximate starting positions for our floating cards
  const startPositions = [
    { top: '30%', left: '10%' }, // X Fast Indexer
    { top: '60%', left: '50%' }, // Kaito
    { top: '20%', left: '85%' }  // telegram chat
  ];
  const cardPositions = ['14%', '50%', '86%'];
  const separatorPositions = ['32%', '68%']; // Positions for the separators

  // Turn off the floating animation after it completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingCards(false);
    }, 2400); // Animation duration + small buffer

    return () => clearTimeout(timer);
  }, []);

  // Trigger the first card completion after lines are in position
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardCompleted([true, false, false]);
    }, 3500); // Vertical lines appear around 1.2s, so wait until ~2.5s

    return () => clearTimeout(timer);
  }, []);

  // Animate line progress when cards are completed
  useEffect(() => {
    if (cardCompleted[0]) {
      // Animate first separator's lines
      const interval = setInterval(() => {
        setLineProgress(prev => {
          const newProgress = [Math.min(prev[0] + 0.05, 1), prev[1]];
          if (newProgress[0] >= 1) clearInterval(interval);
          return newProgress;
        });
      }, 50);

      // Start second card completion after first separator lines are filled
      setTimeout(() => {
        setCardCompleted([true, true, false]);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [cardCompleted]);

  // Similar effect for second card completion
  useEffect(() => {
    if (cardCompleted[1]) {
      // Animate second separator's lines
      const interval = setInterval(() => {
        setLineProgress(prev => {
          const newProgress = [prev[0], Math.min(prev[1] + 0.05, 1)];
          if (newProgress[1] >= 1) clearInterval(interval);
          return newProgress;
        });
      }, 50);

      // Start third card completion after second separator lines are filled
      setTimeout(() => {
        setCardCompleted([true, true, true]);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [cardCompleted]);

  useEffect(() => {
    if (cardCompleted.every(Boolean) && notificationState === 'idle') {
      console.log("Starting notification sequence");
      setTimeout(() => {
        setNotificationState('showing');
        setShowNotification(true);
      }, 1000); // Add 500ms delay before showing notification
    }
  }, [cardCompleted, notificationState]);

  // Separate effect to handle the notification lifecycle
  useEffect(() => {
    if (notificationState === 'showing') {
      console.log("Notification is now showing");
      const hideTimer = setTimeout(() => {
        console.log("Starting to hide notification");
        setNotificationState('hiding');
        setShowNotification(false);
      }, 4000);

      return () => {
        console.log("Cleaning up show timer");
        clearTimeout(hideTimer);
      };
    }

    if (notificationState === 'hiding') {
      console.log("Notification is now hidden");
      const completeTimer = setTimeout(() => {
        console.log("Completing notification sequence");
        setNotificationState('complete');
      }, 1000); // Give time for exit animation

      return () => {
        console.log("Cleaning up hide timer");
        clearTimeout(completeTimer);
      };
    }

    if (notificationState === 'complete') {
      console.log("Closing modal");
      const closeTimer = setTimeout(() => {
        setTargetCardsHighlighted(false);
        resetTypewriter(); // Reset the typewriter when closing the modal
      }, 500);

      return () => clearTimeout(closeTimer);
    }
  }, [notificationState, setTargetCardsHighlighted, resetTypewriter]);

  return (
    <motion.div
      className="absolute z-40 top-2/12 left-1/2 -translate-x-1/2 w-10/12 h-5/12 bg-black p-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    // style={{
    //   boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)',
    // }}
    >
      <div className="text-lg text-left text-white mb-4">COMPOSER</div>

      {/* iOS/macOS Style Notification Bubble - now fixed to viewport */}
      {createPortal(
        <AnimatePresence mode="wait">
          {showNotification && (
            <motion.div
              key="notification"
              className="fixed top-6 right-6 text-white px-4 py-3 rounded-xl z-[9999]"
              style={{
                maxWidth: '500px',
              }}
              initial={{ y: 0, opacity: 0, x: 100 }}
              animate={{ y: 0, opacity: 1, x: 0 }}
              exit={{ y: 0, opacity: 0, x: 100 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                duration: 0.5 // Adding a duration helps control animation timing
              }}
            >
              <NotificationMessage />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <div id="card-container" className="relative h-[300px]">
        {/* Static agent cards using motion.div */}
        {!showFloatingCards && highlightedAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            className="absolute"
            initial={{
              top: '50%',
              left: cardPositions[index],
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              top: '50%',
              left: cardPositions[index],
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              <AgentCard {...agent} typingCompleted={true} opacity={cardCompleted[index] ? 0.2 : 1} />

              {/* Completed SVG indicator */}
              {cardCompleted[index] && (
                <div className="absolute -top-0.5 -right-0.5 z-45" style={{ opacity: 1 }}>
                  <Image
                    src="/completed.svg"
                    alt="Completed"
                    width={32}
                    height={32}
                    style={{ opacity: 1 }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Static separators */}
        {!showFloatingCards && separatorPositions.map((position, index) => (
          <motion.div
            key={`separator-${index}`}
            className="absolute"
            initial={{
              opacity: 0,
              top: '50%',
              left: position,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              opacity: 1,
              top: '50%',
              left: position,
              transform: 'translate(-50%, -50%)'
            }}
            transition={{
              opacity: {
                duration: 0.6,
                ease: "easeInOut",
              }
            }}
          >
            <VerticalLinesSvg progress={lineProgress[index]} />
          </motion.div>
        ))}

        {/* Floating animation cards */}
        {showFloatingCards && highlightedAgents.map((agent, index) => (
          <motion.div
            key={`floating-${agent.id}`}
            className="absolute z-50"
            initial={{
              opacity: 0,
              ...startPositions[index],
            }}
            animate={{
              opacity: [0, 1, 1],
              top: '50%',
              left: cardPositions[index],
              transform: 'translate(-50%, -50%)'
            }}
            transition={{
              duration: 1.5,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          >
            <AgentCard {...agent} typingCompleted={true} />
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};