import { useGame } from "@/lib/hooks/game";
import { GuessRow } from "./GuessRow";

export const GuessGrid = () => {
  const { guessResults, curGuess, curAttempt } = useGame();
  return (
    <div className="flex flex-col gap-4 w-auto mx-auto">
      {guessResults.map((result, index) => {
        if (index === curAttempt) {
          return <GuessRow key={index} guessData={curGuess} />;
        }
        return <GuessRow key={index} guessData={result || undefined} />;
      })}
    </div>
  );
};
