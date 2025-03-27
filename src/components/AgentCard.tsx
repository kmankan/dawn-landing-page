import React from 'react';
import { Agent } from '@/types';
import { useTypingStore } from '@/store/typing-store';

interface AgentCardProps extends Agent {
  typingCompleted?: boolean;
  opacity?: number;
}

const AgentCard: React.FC<AgentCardProps> = ({
  name,
  price,
  availability,
  latency,
  trust,
  highlight,
  typingCompleted: propTypingCompleted,
  opacity = 1,
}) => {
  // Use the store or fall back to props if provided
  const { typingCompleted: storeTypingCompleted } = useTypingStore();
  const typingCompleted = propTypingCompleted !== undefined ? propTypingCompleted : storeTypingCompleted;

  // Format latency with commas and 'ms' suffix
  const formatLatency = (latency: number): string => {
    return `${latency.toLocaleString()}ms`;
  };

  return (
    <div className={`relative flex flex-col overflow-hidden w-[294px]`}
      style={{
        borderRadius: '40px',
        border: (highlight && typingCompleted) ? '3px solid #FF6F00' : '1px solid #747474',
        boxShadow: (highlight && typingCompleted) ? '0px 4px 24px 0px rgba(255, 111, 0, 0.35)' : 'none',
        background: 'linear-gradient(180deg, #3C3C3C 0%, #444444 100%)',
        backdropFilter: 'blur(8.5px)',
        transition: 'border 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
        opacity: opacity
      }}>
      {/* Agent Name */}
      <h2 className="text-white text-left text-[24px] pl-8 pt-5 pb-1 font-degular"
        style={{
          fontWeight: 500,
          lineHeight: 'normal',
        }}>
        {name}
      </h2>

      {/* Agent Stats */}
      <div className="flex flex-col font-degular-display text-[12px] pl-8 pb-6">
        <div className="flex items-center">
          <span className="text-gray-400">price: </span>
          <span className="text-white ml-2">{price}</span>
        </div>

        <div className="flex items-center">
          <span className="text-gray-400">availability: </span>
          <span className="text-white ml-2">{availability}</span>
        </div>

        <div className="flex items-center">
          <span className="text-gray-400">latency: </span>
          <span className="text-white ml-2">{formatLatency(latency)}</span>
        </div>

        <div className="flex items-center">
          <span className="text-gray-400">trust: </span>
          <span className="text-orange-500 ml-2">{trust}</span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
