import type { WordItem } from "@/types/wordList";
import { wordList, wordListIndexRange } from "@/lib/words/wordList";
import type { GuessResult, GuessValidationResult } from "@/types/game";

export const getWordAtIndex = (wordIndex: number) => {
  return wordList[wordIndex];
};

export const pickRandomIndex = () => {
  // TODO:: check to see if word was already solved
  const index = Math.floor(Math.random() * wordListIndexRange.max);
  return index;
};

export const wordExists = (word: WordItem) => {
  return wordList.indexOf(word) !== -1;
};

export const validateGuess = (
  guessArr: string[],
  wordIndex: number
): GuessResult => {
  const word = wordList[wordIndex];
  const guess = guessArr.join("") as WordItem;

  if (guessArr.length !== 5) {
    throw new Error("Word is not 5 chars long");
  }

  if (!wordExists(guess)) {
    throw new Error(`${guess} is not in list`);
  }

  return guessArr.map((letter: string, index: number) => {
    return {
      letter,
      isCorrect: word.charAt(index) === letter,
      hasLetter: word.includes(letter),
    } as GuessValidationResult;
  });
};
