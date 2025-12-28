import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGame } from "@/lib/hooks/game";
import { appConfig } from "@/config";
export const GameEndDrawer = () => {
  const { gameOver, gameWon, resetGame } = useGame();

  return (
    <Drawer open={gameOver} onClose={resetGame}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg py-5">
          {gameWon ? <GameWonContent /> : <GameLostContent />}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button size="lg" variant="default">
                New Game
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const GameWonContent = () => {
  const { word, curAttempt } = useGame();
  return (
    <DrawerHeader>
      <DrawerTitle className="text-3xl">Good Job!</DrawerTitle>
      <DrawerDescription className="text-lg py-7">
        You guessed the word &quot;
        <span className="text-chart-4 font-semibold uppercase"> {word} </span>
        &quot; in{" "}
        <span className="text-chart-3 font-semibold">{curAttempt}</span>{" "}
        attempts.
      </DrawerDescription>
    </DrawerHeader>
  );
};

const GameLostContent = () => {
  const { word } = useGame();
  return (
    <DrawerHeader>
      <DrawerTitle className="text-3xl">Game Over!</DrawerTitle>
      <DrawerDescription className="text-lg py-7">
        Sorry you couldn't guess the word &quot;
        <span className="text-chart-4 font-semibold uppercase"> {word} </span>
        &quot; in{" "}
        <span className="text-destructive font-semibold">
          {appConfig.game.maxAttempts}
        </span>{" "}
        attepts.
      </DrawerDescription>
    </DrawerHeader>
  );
};
