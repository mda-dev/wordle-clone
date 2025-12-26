import { createContext } from "react";
import type { GameProviderState } from "@/types/game";

const { VITE_GUESS_ATTEMPTS, VITE_WORD_SIZE } = import.meta.env;

export const initialState: GameProviderState = {
  curAttempt: 0,
  curGuess: Array(Number(VITE_WORD_SIZE)).fill(""),
  guessResults: Array(Number(VITE_GUESS_ATTEMPTS)).fill(null),
  addLetterToGuess: () => {},
  removeLetterFromGuess: () => {},
  saveGuess: () => {},
};

export const GameContext = createContext<GameProviderState>(initialState);
