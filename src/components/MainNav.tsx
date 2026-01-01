import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export const MainNav = () => {
  const { t } = useTranslation();

  return (
    <div className="border-b mb-2">
      <nav className="flex mx-auto max-w-7xl p-2 justify-between">
        <Button
          asChild
          size="lg"
          variant="link"
          className="text-3xl items-center p-3 h-10 hover:no-underline">
          <Link to="/" className="text-primary flex items-center">
            Wordle
            <small className="text-sm text-chart-4  translate-y-1.5">
              {t("logoSubtext")}
            </small>
          </Link>
        </Button>
        <ThemeSwitcher />
      </nav>
    </div>
  );
};
