import { Button } from "@/components/ui/button";
import { GameContext, initialState } from "@/lib/contexts/game/gameContext";
import type {
  GameProviderPropTypes,
  GuessResult,
  GuessValidationResult,
} from "@/types/game";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const GameProvider = ({
  //TODO: implement games save
  storageKey: _storage = "wordle-game-results",
  getRandomWord,
  wordExists,
  children,
  ...props
}: GameProviderPropTypes) => {
  const [word, setWord] = useState(getRandomWord());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [curAttempt, setCurAttempt] = useState(initialState.curAttempt);
  const [curGuess, setCurGuess] = useState<string[]>(initialState.curGuess);
  const [guessResults, setGuessResults] = useState<GuessResult[]>(
    initialState.guessResults
  );

  useEffect(() => {
    if (gameOver) {
      console.log("Game Over!", { word });
    } else {
      //debug stuff
      console.log("current word", { word });
    }
  }, [gameOver, word]);

  const resetGame = () => {
    setCurAttempt(initialState.curAttempt);
    setCurGuess(initialState.curGuess);
    setGuessResults(initialState.guessResults);
    setWord(getRandomWord());
    setGameOver(false);
  };

  const saveGuess = () => {
    if (gameOver || curGuess.includes("")) {
      return;
    }
    try {
      const guessResult = validateGuess();
      const wordWasGuessed = guessResult?.every((guess) => guess.isCorrect);

      const updatedResults = guessResults.map((result, index) => {
        return index === curAttempt ? guessResult : result;
      });

      setGuessResults(updatedResults);
      setCurGuess(initialState.curGuess);
      setCurAttempt(curAttempt + 1);

      if (!updatedResults.includes(null) || wordWasGuessed) {
        console.log("end game");
        console.log({ won: wordWasGuessed });
        setGameOver(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validateGuess = () => {
    const guess = curGuess.join("");
    if (!wordExists(guess)) {
      const msg = `"${guess.toUpperCase()}" is not a valid word!`;
      toast.error(msg);
      throw new Error(msg);
    }
    return curGuess.map((letter: string, index: number) => {
      return {
        letter,
        isCorrect: word.charAt(index) === letter,
        hasLetter: word.includes(letter),
      } as GuessValidationResult;
    });
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
    guessResults,
    curAttempt,
    saveGuess,
    resetGame,
    addLetterToGuess,
    removeLetterFromGuess,
    gameOver,
  };

  return (
    <GameContext.Provider {...props} value={value}>
      {children}
      <Button onClick={resetGame}>Reset</Button>
    </GameContext.Provider>
  );
};
