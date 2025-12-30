import { GameEndDrawer } from "@/components/GameEndDrawer";
import { GuessGrid } from "@/components/GuessGrid";
import { VirtualKeyboard } from "@/components/VirtualKeyboard";
import Loader from "@/components/Loader";
import { GameProvider } from "@/lib/contexts/game/gameProvider";
import { useWordlist } from "@/lib/hooks/game";
import { useCallback, useMemo } from "react";

export const GameContainer = () => {
  const { isFetching, data: wordList = [], isSuccess } = useWordlist();

  const wordCount = useMemo(() => {
    return wordList ? wordList.length - 1 : 0;
  }, [wordList]);

  const getRandomWord = useCallback(() => {
    const index = Math.floor(Math.random() * wordCount - 1);
    return wordList[index];
  }, [wordCount, wordList]);

  const wordExists = useCallback(
    (word: string) => {
      return wordList.includes(word);
    },
    [wordList]
  );

  if (isFetching) {
    return <Loader />;
  }

  if (!isSuccess) {
    return <span>Error occured</span>;
  }

  return (
    <GameProvider getRandomWord={getRandomWord} wordExists={wordExists}>
      <GuessGrid />
      <VirtualKeyboard />
      <GameEndDrawer />
    </GameProvider>
  );
};
