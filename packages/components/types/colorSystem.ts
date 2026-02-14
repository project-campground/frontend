
import type { PaletteRange } from "@mui/joy/styles/types";

export interface Palette {
    secondary: PaletteRange;
    info: PaletteRange;
}
export interface ColorPalettePropOverrides {
    secondary: true;
    info: true;
}
// Add new text colours
export interface PaletteTextOverrides {
    code: true;
}
// Add new palette ranges
export interface PaletteRangeOverrides {
    1000: true;
    950: true;
    850: true;
    border: true;
    ["t-950"]: true;
    ["t-500"]: true;
}
// Add new backgrounds
export interface PaletteBackgroundOverrides {
    backdrop950: true;
    transparent0: true;
    transparent1: true;
    transparent2: true;
    level4: true;
    level5: true;
}
