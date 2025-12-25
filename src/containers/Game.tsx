import { GuessGrid } from "@/components/GuessGrid";
import { KeyboardLayout } from "@/components/KeyboardLayout";
import { GameProvider } from "@/lib/contexts/game/gameProvider";

export const GameContainer = () => {
  return (
    <GameProvider>
      <GuessGrid />
      <KeyboardLayout />
    </GameProvider>
  );
};
