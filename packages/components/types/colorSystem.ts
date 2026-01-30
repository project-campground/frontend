
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
    ["t-950"]: true;
    ["t-500"]: true;
}
// // Add new colours
// interface PaletteOptions {
//     secondary: DefaultPaletteRange & PaletteVariant;
// }
// Add new backgrounds
export interface PaletteBackgroundOverrides {
    transparent: true;
    // level0: true;
    level4: true;
    level5: true;
    // skeleton0: true;
    // skeleton1: true;
}

// Add new colours
declare module "@mui/joy/styles/types/colorSystem" {
    interface Palette {
        secondary: PaletteRange;
        info: PaletteRange;
        debug: PaletteRange;
        note: PaletteRange;
    }
    interface ColorPalettePropOverrides {
        secondary: true;
        info: true;
    }
    // Add new text colours
    interface PaletteTextOverrides {
        code: true;
    }
    // Add new palette ranges
    interface PaletteRangeOverrides {
        1000: true;
        950: true;
        850: true;
        ["t-950"]: true;
        ["t-500"]: true;
    }
    // // Add new colours
    // interface PaletteOptions {
    //     secondary: DefaultPaletteRange & PaletteVariant;
    // }
    // Add new backgrounds
    interface PaletteBackgroundOverrides {
        transparent: true;
        // level0: true;
        level4: true;
        level5: true;
        // skeleton0: true;
        // skeleton1: true;
    }
}