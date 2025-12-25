import { GameContext, initialState } from "@/lib/contexts/game/gameContext";
import {
  getWordAtIndex,
  pickRandomIndex,
  validateGuess,
} from "@/lib/words/utils";
import type { GameProviderPropTypes, GuessResult } from "@/types/game";
import { useEffect, useState } from "react";

export const GameProvider = ({
  storageKey: _storage = "wordle-game-results",
  children,
  ...props
}: GameProviderPropTypes) => {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [curAttempt, setCurAttempt] = useState(initialState.curAttempt);
  const [wordIndex, setWordIndex] = useState(initialState.wordIndex);
  const [curGuess, setCurGuess] = useState<string[]>(initialState.curGuess);
  const [guessResults, setGuessResults] = useState<GuessResult[]>(
    initialState.guessResults
  );

  useEffect(() => {
    const word = getWordAtIndex(wordIndex);
    if (gameOver) {
      console.log("Game Over!", { word });
    } else {
      //debug stuff
      console.log("current word", { word });
    }
  }, [gameOver, wordIndex]);

  const saveGuess = () => {
    if (gameOver) {
      return;
    }
    try {
      const guessResult = validateGuess(curGuess, wordIndex);
      const wordWasGuessed = guessResult?.every((guess) => guess.isCorrect);

      const updatedResults = guessResults.map((result, index) => {
        return index === curAttempt ? guessResult : result;
      });

      setGuessResults(updatedResults);
      setCurGuess(initialState.curGuess);
      setCurAttempt(curAttempt + 1);

      if (!updatedResults.includes(null) || wordWasGuessed) {
        console.log("end game");
        setGameOver(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetGame = () => {
    setCurAttempt(initialState.curAttempt);
    setWordIndex(pickRandomIndex());
    setCurGuess(initialState.curGuess);
    setGuessResults(initialState.guessResults);
  };

  const addLetterToGuess = (letter: string) => {
    if (gameOver) {
      return;
    }
    const emptyIndex = curGuess.indexOf("");
    if (emptyIndex === -1) {
      return console.log("No more room ");
    }

    const updated = [...curGuess];
    updated[emptyIndex] = letter;
    setCurGuess(updated);
  };

  const removeLetterFromGuess = () => {
    if (gameOver) {
      return;
    }
    const emptyIndex = curGuess.indexOf("");

    if (emptyIndex === 0) {
      return console.log("nothing to delete");
    }
    const updated = [...curGuess];
    const prevIndex = emptyIndex === -1 ? updated.length - 1 : emptyIndex - 1;
    updated[prevIndex] = "";

    setCurGuess(updated);
  };

  const value = {
    curGuess,
    wordIndex,
    guessResults,
    curAttempt,
    saveGuess,
    resetGame,
    addLetterToGuess,
    removeLetterFromGuess,
  };
  return (
    <GameContext.Provider {...props} value={value}>
      {children}
    </GameContext.Provider>
  );
};
