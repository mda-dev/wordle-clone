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
  const { t } = useTranslation();
  return (
    <Drawer open={gameOver} onClose={resetGame}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg py-2">
          {gameWon ? <GameWonContent /> : <GameLostContent />}
          <DrawerFooter autoFocus>
            <DrawerClose asChild>
              <Button size="lg" variant="default">
                {t("newRound")}
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
      <DrawerTitle className="text-3xl">
        {t("game.drawer.win.title")}
      </DrawerTitle>
      <DrawerDescription className="text-lg py-2">
        {t("game.drawer.win.subTitle", {
          word: word,
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
      <DrawerDescription className="text-lg py-2">
        {t("game.drawer.lose.subTitle", { word: word })}
      </DrawerDescription>
    </DrawerHeader>
  );
};
