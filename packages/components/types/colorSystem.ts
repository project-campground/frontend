
import type { PaletteRange } from "@mui/joy/styles/types";

export interface Palette {
    secondary: PaletteRange;
    info: PaletteRange;
    // debug: PaletteRange;
    // note: PaletteRange;
}
export interface ColorPalettePropOverrides {
    secondary: true;
    info: true;
    // debug: true;
    // note: true;
}
// Add new text colours
export interface PaletteTextOverrides {
    code: true;
    mid: true;
    quartary: true;
    ["code-keyword"]: true;
    ["code-string"]: true;
    ["code-number"]: true;
    ["code-template"]: true;
    ["code-function"]: true;
    ["code-class"]: true;
    ["code-attribute"]: true;
}
// Add new palette ranges
export interface PaletteRangeOverrides {
    1000: true;
    950: true;
    850: true;
    750: true;
    250: true;
    150: true;
    50: true;
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

    skeleton: true;
    skeletonPulse: true;
}
