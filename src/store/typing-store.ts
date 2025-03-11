import { create } from 'zustand';

interface TypingState {
  typingCompleted: boolean;
  setTypingCompleted: (completed: boolean) => void;
  resetTypingCompleted: () => void;
  targetCardsHighlighted: boolean;
  setTargetCardsHighlighted: (highlighted: boolean) => void;
  resetTargetCardsHighlighted: () => void;
}

export const useTypingStore = create<TypingState>((set) => ({
  typingCompleted: false,
  setTypingCompleted: (completed) => set({ typingCompleted: completed }),
  resetTypingCompleted: () => set({ typingCompleted: false }),
  targetCardsHighlighted: false,
  setTargetCardsHighlighted: (highlighted) => set({ targetCardsHighlighted: highlighted }),
  resetTargetCardsHighlighted: () => set({ targetCardsHighlighted: false }),
})); 