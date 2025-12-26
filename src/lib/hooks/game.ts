import { useContext } from "react";
import { GameContext } from "@/lib/contexts/game/gameContext";
import { useQuery } from "@tanstack/react-query";

export const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame hook must be used within a GameProvider");
  }

  return context;
};

export const useWordlist = (wordListFileName?: string) => {
  const fileName = wordListFileName || "ro-word-list-1.json";
  return useQuery({
    queryKey: ["word-list"],
    queryFn: async (): Promise<string[]> => {
      const response = await fetch(`/${fileName}`);
      return await response.json();
    },
  });
};
