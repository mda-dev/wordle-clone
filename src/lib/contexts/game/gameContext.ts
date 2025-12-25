import { createContext } from "react";
import type { GameProviderState } from "@/types/game";
import { pickRandomIndex } from "@/lib/words/utils";

export const initialState: GameProviderState = {
  wordIndex: pickRandomIndex(),
  curAttempt: 0,
  curGuess: Array(5).fill(""),
  guessResults: Array(6).fill(null),
  addLetterToGuess: () => {},
  removeLetterFromGuess: () => {},
  saveGuess: () => {},
};

export const GameContext = createContext<GameProviderState>(initialState);
