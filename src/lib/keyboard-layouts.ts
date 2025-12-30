export type Diacritics = string[];

export type KeyboardItem = string | Diacritics;
export type KeyboardRow = KeyboardItem[];
export type KeyboardLayout = KeyboardRow[];

export const roDiacritics: KeyboardLayout = [
  ["Q", "W", "E", "R", ["T", "Ț"], "Y", "U", ["I", "Î"], "O", "P"],
  [["A", "Ă", "Â"], ["S", "Ș"], "D", "F", "G", "H", "J", "K", "L"],
  ["BSP", "Z", "X", "C", "V", "B", "N", "M", "RETURN"],
] as const;

export const roBasic: KeyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["BSP", "Z", "X", "C", "V", "B", "N", "M", "RETURN"],
] as const;
