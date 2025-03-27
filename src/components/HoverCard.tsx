'use client'
import { useState, MouseEvent, useCallback, useMemo } from "react";

// Throttle function to limit the rate of function calls
function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

interface HoverCardProps {
  displayContent: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

// HoverCard component with standardized sections
export default function HoverCard({ displayContent, title, description }: HoverCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 7;
    const rotateY = (centerX - x) / 7;

    setRotate({ x: rotateX, y: rotateY });
  }, []);

  // Create throttled version using useMemo
  const throttledMouseMove = useMemo(() =>
    throttle(handleMouseMove, 100),
    [handleMouseMove]
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        className="relative rounded-3xl bg-[#FF7C26] p-8 flex flex-col h-[400px] overflow-hidden will-change-transform"
        onMouseMove={throttledMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        <div className="display-section h-full mb-10">
          {displayContent}
        </div>
        <div className="title-section mb-2">
          <h2 className="text-4xl font-semibold font-degular tracking-[-0.38px] leading-[74%] text-white">{title}</h2>
        </div>
        <div className="description-section w-[300px]">
          <p className="text-white text-xl font-degular font-medium tracking-[-0.22px] leading-[110%]">{description}</p>
        </div>
      </div>
    </>
  );
};