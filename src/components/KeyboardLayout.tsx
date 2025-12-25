import { CornerDownLeftIcon, DeleteIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, type ReactElement } from "react";
import { cn } from "@/lib/utils";
import { useGame } from "@/lib/hooks/game";

const buttonRows = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Backspace",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "Enter",
];

const isReturnOrBsp = (key: string) => {
  return key === "Enter" || key === "Backspace";
};

const specialIcons: { [key: string]: string | ReactElement } = {
  Enter: <CornerDownLeftIcon />,
  Backspace: <DeleteIcon />,
};

export const KeyboardLayout = () => {
  const { addLetterToGuess, removeLetterFromGuess, saveGuess } = useGame();

  useEffect(() => {
    const kbrListener = (evt: KeyboardEvent) => {
      const { key } = evt;
      const value = key.toUpperCase();

      if (key === "Enter") {
        // submit attmpt
        return saveGuess();
      }
      if (key === "Backspace") {
        return removeLetterFromGuess();
      }
      if (buttonRows.includes(value)) {
        return addLetterToGuess(value);
      }
    };
    document.addEventListener("keydown", kbrListener);

    return () => {
      document.removeEventListener("keydown", kbrListener);
    };
  }, [addLetterToGuess, removeLetterFromGuess, saveGuess]);

  return (
    <div className="flex flex-wrap mx-auto gap-2 w-[435px] justify-center">
      {buttonRows.map((key, index) => {
        const isSpecial = isReturnOrBsp(key);
        const size = isSpecial ? "default" : "icon";
        const content = specialIcons[key] || key;
        const variant = isSpecial ? "default" : "secondary";
        const className = cn({
          "flex-grow": isSpecial,
        });
        return (
          <Button
            size={size}
            key={index}
            variant={variant}
            className={className}>
            {content}
          </Button>
        );
      })}
    </div>
  );
};
