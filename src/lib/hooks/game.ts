import { useContext } from "react";
import { GameContext } from "@/lib/contexts/game/gameContext";

export const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame hook must be used within a GameProvider");
  }

  return context;
};
