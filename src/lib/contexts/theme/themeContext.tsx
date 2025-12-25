import { createContext } from "react";
import type { ThemeProviderState } from "@/types/themeProvider";

export const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
