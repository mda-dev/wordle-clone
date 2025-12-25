import type { WordItem, GuessValidationResult } from "@/types/wordList";
import { wordList, wordListIndexRange } from "@/lib/words/wordList";

export const getWordAtIndex = (wordIndex: number) => {
  return wordList[wordIndex];
};

export const pickRandomWord = () => {
  // TODO:: check to see if word was already solved
  const index = Math.floor(Math.random() * wordListIndexRange.max);
  return getWordAtIndex(index);
};

export const wordExists = (word: WordItem) => {
  return wordList.indexOf(word) !== -1;
};

export const validateGuess = (guessArr: string[], wordIndex: number): GuessValidationResult[] => {
  const word = wordList[wordIndex];
  return guessArr.map((letter: string, index: number) => {
    return {
      letter,
      isCorrect: word.charAt(index) === letter,
      hasLetter: word.includes(letter),
    } as GuessValidationResult;
  });
};
