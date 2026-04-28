import { mixHexColors } from "./color.ts";

const _lightestToDarkest = {
    50: "#f5f3ff",
    100: "#e7e4f4",
    150: "#dcd8ec",
    200: "#c6c3d9",
    250: "#b7b4cd",
    300: "#9695b2",
    400: "#78799a",

    500: mixHexColors("#78799a", "#373754", 0.5),

    600: "#373754",
    700: "#2a2640",
    750: "#1f1b32",
    800: "#1a162a",
    850: "#151121",
    900: "#0e0b16",
    950: "#040409",
} as const;
export type ShadePaletteKeys = keyof typeof _lightestToDarkest;
export type ShadePalette = Record<ShadePaletteKeys, string>;
export const lightestToDarkest = _lightestToDarkest as ShadePalette;
export const darkestToLightest = Object.fromEntries(Object.entries(_lightestToDarkest).map(([key, value]) => [1000 - parseInt(key), value])) as ShadePalette;