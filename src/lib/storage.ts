import type { Theme } from "@/types/theme";

const env = import.meta.env;

const STORAGE = {
  THEME: {
    get: () => {
      const theme =
        localStorage.getItem(env.VITE_THEME_STORAGE_KEY) || "system";
      return theme as Theme;
    },
    set: (mode: Theme) =>
      localStorage.setItem(env.VITE_THEME_STORAGE_KEY, mode),
  },
};

export default STORAGE;
