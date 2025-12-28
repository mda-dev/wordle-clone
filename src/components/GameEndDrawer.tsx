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
        <div className="mx-auto w-full max-w-lg">
          {gameWon ? <GameWonContent /> : <GameLostContent />}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="default">New Game</Button>
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
    <>
      <DrawerHeader>
        <DrawerTitle className="text-3xl">Good Job!</DrawerTitle>
        <DrawerDescription className="text-lg">
          You guessed the word &quot;
          <span className="text-chart-4 font-semibold"> {word} </span>&quot; in{" "}
          <span className="text-chart-3 font-semibold">{curAttempt}</span>{" "}
          attempts.
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex-1 text-center">
            <p>You can click the button below to start a new game</p>
          </div>
        </div>
      </div>
    </>
  );
};

const GameLostContent = () => {
  const { word } = useGame();
  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="text-3xl">Game Over!</DrawerTitle>
        <DrawerDescription className="text-lg">
          Sorry you couldn't guess the word &quot;
          <span className="text-chart-4 font-semibold"> {word} </span>&quot; in{" "}
          <span className="text-destructive font-semibold">
            {appConfig.game.maxAttempts}
          </span>{" "}
          attepts.
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex-1 text-center">
            <p>You can click the button below to start a new game</p>
          </div>
        </div>
      </div>
    </>
  );
};
