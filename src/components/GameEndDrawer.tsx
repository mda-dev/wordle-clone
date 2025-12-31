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
import { useTranslation } from "react-i18next";
export const GameEndDrawer = () => {
  const { gameOver, gameWon, resetGame } = useGame();

  return (
    <Drawer open={gameOver} onClose={resetGame}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg py-5">
          {gameWon ? <GameWonContent /> : <GameLostContent />}
          <DrawerFooter autoFocus>
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
  const { t } = useTranslation();
  return (
    <DrawerHeader>
      <DrawerTitle className="text-3xl">Good Job!</DrawerTitle>
      <DrawerDescription className="text-lg py-7">
        {t("game.drawer.win.subTitle", {
          word: word.toUpperCase(),
          attemptNr: curAttempt,
        })}
      </DrawerDescription>
    </DrawerHeader>
  );
};

const GameLostContent = () => {
  const { word } = useGame();
  const { t } = useTranslation();
  return (
    <DrawerHeader>
      <DrawerTitle className="text-3xl">
        {t("game.drawer.lose.title")}
      </DrawerTitle>
      <DrawerDescription className="text-lg py-7">
        {t("game.drawer.lose.subTitle", { word: word.toLocaleUpperCase() })}
      </DrawerDescription>
    </DrawerHeader>
  );
};
