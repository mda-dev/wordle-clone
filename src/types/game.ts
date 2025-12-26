import type { ReactNode } from "react";

export type Guess = string[];

export type GuessValidationResult = {
  letter: string;
  isCorrect: boolean;
  hasLetter: boolean;
};
export type GuessResult = GuessValidationResult[] | null;

export type GameProviderState = {
  curAttempt: number;
  curGuess: string[];
  guessResults: GuessResult[];
  gameOver: boolean;
  addLetterToGuess: (letter: string) => void;
  removeLetterFromGuess: () => void;
  saveGuess: () => void;
};

export interface GameProviderPropTypes {
  children: ReactNode;
  storageKey?: string;
  getRandomWord: () => string;
  wordExists: (word: string) => boolean;
}
