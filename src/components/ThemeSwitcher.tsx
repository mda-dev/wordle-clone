import { useTheme } from "@/lib/hooks/theme";
import { MonitorCogIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Theme } from "@/types/theme";
import type { MouseEvent } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLButtonElement;
    setTheme(el.name as Theme);
  };

  const getActiveVariant = (mode: Theme) => {
    return theme === mode ? "default" : "ghost";
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        name="system"
        onClick={handleSwitchTheme}
        variant={getActiveVariant("system")}>
        <MonitorCogIcon />
      </Button>
      <Button
        name="light"
        onClick={handleSwitchTheme}
        variant={getActiveVariant("light")}>
        <SunIcon />
      </Button>
      <Button
        name="dark"
        onClick={handleSwitchTheme}
        variant={getActiveVariant("dark")}>
        <MoonIcon />
      </Button>
    </div>
  );
};
