import { createContext } from "react";
import type {} from "@/types/theme";

interface SettingsProviderState {
  locale: "ro" | "en";
  wordlist: "ro" | "ro-diacritics" | "us";
  virtualKeyboard: boolean;
  reduceMotion: boolean;
}

export const initialState: SettingsProviderState = {
  locale: "ro",
  wordlist: "ro",
  virtualKeyboard: true,
  reduceMotion: false,
};

export const SettingsProviderContext =
  createContext<SettingsProviderState>(initialState);
