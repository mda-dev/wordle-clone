interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
  readonly VITE_WORD_SIZE: number;
  readonly VITE_GUESS_ATTEMPTS: number;
  readonly VITE_THEME_STORAGE_KEY: string;
  readonly VITE_GAME_STORAGE_KEY: string;
  readonly VITE_LOCALE_STORAGE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
