const {
  VITE_THEME_STORAGE_KEY,
  VITE_APP_TITLE,
  VITE_WORD_SIZE,
  VITE_GUESS_ATTEMPTS,
  VITE_LOCALE_STORAGE_KEY,
  VITE_GAME_LOCALE,
  VITE_GAME_STORAGE_KEY,
} = import.meta.env;

export const appConfig = {
  app: {
    title: VITE_APP_TITLE || "wordle",
  },
  ui: {
    theme: "system",
  },
  game: {
    locale: VITE_GAME_LOCALE || "ro",
    wordSize: Number(VITE_WORD_SIZE) || 5,
    maxAttempts: Number(VITE_GUESS_ATTEMPTS) || 6,
  },
  storage: {
    themeKey: VITE_THEME_STORAGE_KEY || "ui-theme",
    localeKey: VITE_LOCALE_STORAGE_KEY || "locale",
    gameKey: VITE_GAME_STORAGE_KEY || "game",
  },
} as const;
