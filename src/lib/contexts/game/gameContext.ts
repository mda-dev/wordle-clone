import { createContext } from "react";
import type { GameProviderState } from "@/types/game";
import { appConfig } from "@/config";

export const initialState: GameProviderState = {
  curAttempt: 0,
  gameOver: false,
  curGuess: Array(appConfig.game.wordSize).fill(""),
  guessResults: Array(Number(appConfig.game.maxAttempts)).fill(null),
  addLetterToGuess: () => {},
  removeLetterFromGuess: () => {},
  saveGuess: () => {},
};

export const GameContext = createContext<GameProviderState>(initialState);
