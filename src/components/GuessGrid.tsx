import { useGame } from "@/lib/hooks/game";
import { GuessRow } from "./GuessRow";

export const GuessGrid = () => {
  const { guessResults, curGuess, curAttempt } = useGame();
  return (
    <div className="flex flex-col gap-2 w-auto mx-auto">
      {guessResults.map((result, index) => {
        if (index === curAttempt) {
          return <GuessRow guessData={curGuess} />;
        }
        return <GuessRow guessData={result || undefined} />;
      })}
    </div>
  );
};
