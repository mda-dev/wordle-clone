import { wordList } from "@/lib/words/wordList";

export type WordItem = (typeof wordList)[number];

export type GuessValidationResult = {
  letter: string;
  isCorrect: boolean;
  hasLetter: boolean;
};
