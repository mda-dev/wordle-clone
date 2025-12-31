import { GameContext, initialState } from "@/lib/contexts/game/gameContext";
import type {
  GameProviderPropTypes,
  GuessResult,
  GuessValidationResult,
} from "@/types/game";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ReactConfetti from "react-confetti";
import { appConfig } from "@/config";
import { useTranslation } from "react-i18next";

export const GameProvider = ({
  //TODO: implement games save
  storageKey: _storage = appConfig.storage.gameKey,
  getRandomWord,
  wordExists,
  children,
  ...props
}: GameProviderPropTypes) => {
  const [word, setWord] = useState(getRandomWord());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [curAttempt, setCurAttempt] = useState(initialState.curAttempt);
  const [curGuess, setCurGuess] = useState<string[]>(initialState.curGuess);
  const [gameWon, setGameWon] = useState<boolean>(false);
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

  const resetGame = useCallback(() => {
    setCurAttempt(initialState.curAttempt);
    setCurGuess(initialState.curGuess);
    setGuessResults(initialState.guessResults);
    setWord(getRandomWord());
    setGameOver(false);
  }, [getRandomWord]);

  const { t } = useTranslation();

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
        setGameWon(wordWasGuessed);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validateGuess = useCallback(() => {
    const guess = curGuess.join("");
    if (!wordExists(guess)) {
      toast.info(t("game.errors.wordNotFound.title"), {
        description: t("game.errors.wordNotFound.description", {
          word: guess.toUpperCase(),
        }),
      });
      throw new Error("Word not found in list");
    }
    return curGuess.map((letter: string, index: number) => {
      return {
        letter,
        isCorrect: word.charAt(index) === letter,
        hasLetter: word.includes(letter),
      } as GuessValidationResult;
    });
  }, [curGuess, word, wordExists, t]);

  const addLetterToGuess = useCallback(
    (letter: string) => {
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
    },
    [curGuess, gameOver]
  );

  const removeLetterFromGuess = useCallback(() => {
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
  }, [curGuess, gameOver]);

  const value = {
    curGuess,
    guessResults,
    curAttempt,
    saveGuess,
    resetGame,
    addLetterToGuess,
    removeLetterFromGuess,
    gameOver,
    gameWon,
    word,
  };

  return (
    <GameContext.Provider {...props} value={value}>
      {children}
      {gameOver && (
        <ReactConfetti
          gravity={0.1}
          initialVelocityX={2}
          initialVelocityY={2}
          numberOfPieces={200}
          opacity={1}
          recycle
          run={gameWon}
          // width={1228}
          wind={0}
        />
      )}
    </GameContext.Provider>
  );
};
