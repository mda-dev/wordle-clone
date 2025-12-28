import { appConfig } from "@/config";
import type { Theme } from "@/types/theme";

const STORAGE = {
  THEME: {
    get: () => {
      const theme =
        localStorage.getItem(appConfig.storage.themeKey) || appConfig.ui.theme;
      return theme as Theme;
    },
    set: (mode: Theme) =>
      localStorage.setItem(appConfig.storage.themeKey, mode),
  },
};

export default STORAGE;
