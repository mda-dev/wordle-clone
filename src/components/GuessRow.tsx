import type { Guess, GuessResult } from "@/types/game";
import { GuessBox } from "./GuessBox";

const emptyData = Array(5).fill("");

interface GuessRowPropTypes {
  guessData?: Guess | GuessResult;
}

export const GuessRow = ({ guessData }: GuessRowPropTypes) => {
  const guessArray = guessData || emptyData;
  return (
    <div className="flex gap-2">
      {guessArray.map((data, index) => {
        if (typeof data === "string") {
          return <GuessBox key={index} letter={data} />;
        }
        const { letter, hasLetter, isCorrect } = data;
        let variant: "missing" | "partial" | "correct" = "missing";
        if (hasLetter) {
          variant = "partial";
        }
        if (isCorrect) {
          variant = "correct";
        }

        return <GuessBox key={index} letter={letter} variant={variant} />;
      })}
    </div>
  );
};
