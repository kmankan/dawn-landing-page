import { useCallback } from 'react';

export function useSequence() {
  const runSequence = useCallback(async (steps: Array<[() => void, number]>) => {
    for (const [action, delay] of steps) {
      // wait for the delay
      await new Promise(resolve => setTimeout(resolve, delay));
      // execute the action
      action();
    }
  }, []);

  return { runSequence };
} 