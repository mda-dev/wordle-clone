import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/lib/hooks/game";
import { roDiacritics } from "@/lib/keyboard-layouts";
import type { KeyboardLayout } from "@/lib/keyboard-layouts";
import { KeyboardButton } from "@/components/KeyboardButton";

export const VirtualKeyboard = () => {
  const [layout, _setLayout] = useState<KeyboardLayout>(roDiacritics);

  const keys = useMemo(() => {
    return layout.flat(2);
  }, [layout]);

  const { addLetterToGuess, removeLetterFromGuess, saveGuess, gameOver } =
    useGame();

  useEffect(() => {
    const kbrListener = (evt: KeyboardEvent) => {
      const { key } = evt;
      const value = key.toUpperCase();

      if (key === "Enter") {
        // submit attmpt
        return !gameOver && saveGuess();
      }
      if (key === "Backspace") {
        return removeLetterFromGuess();
      }
      if (keys.includes(value)) {
        return addLetterToGuess(key);
      }
    };
    document.addEventListener("keydown", kbrListener);

    return () => {
      document.removeEventListener("keydown", kbrListener);
    };
  }, [keys, addLetterToGuess, removeLetterFromGuess, saveGuess, gameOver]);

  return (
    <div className="max-w-2xl w-full mx-auto">
      {layout.map((row, index) => {
        return (
          <div
            key={index}
            className="flex w-full max-w-2xl items-center justify-center">
            {row.map((item, i) => {
              let action = addLetterToGuess;
              if (item === "RETURN") {
                action = saveGuess;
              }
              if (item === "BSP") {
                action = removeLetterFromGuess;
              }
              return <KeyboardButton key={i} value={item} action={action} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
