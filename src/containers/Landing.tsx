import { Link } from "react-router";
import { Gamepad2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-20">
      <Link
        className="flex bg-primary ring-primary hover:bg-primary/90 focus-visible:ring-1 text-primary-foreground rounded-xl p-4 font-semibold gap-2"
        to="/game">
        <Gamepad2Icon size={32} />
        <span className="text-2xl leading-tight">{t("newGame")}</span>
      </Link>
    </div>
  );
};
