import type { PaletteRange } from "@mui/joy";

declare module "@mui/joy/styles/types/typography" {
    // Add new text levels
    interface TypographySystemOverrides {
        code: true;
    }
}

// Add new colours
declare module "@mui/joy/styles/types/colorSystem" {
    interface Palette {
        secondary: PaletteRange;
        info: PaletteRange;
    }
    interface ColorPalettePropOverrides {
        secondary: true;
        info: true;
    }
    // Add new text colours
    interface PaletteTextOverrides {
        quartary: true;
        code: true;
        ["code-keyword"]: true;
        ["code-string"]: true;
        ["code-number"]: true;
        ["code-template"]: true;
        ["code-function"]: true;
        ["code-class"]: true;
        ["code-attribute"]: true;
    }
    // Add new palette ranges
    interface PaletteRangeOverrides {
        1000: true;
        950: true;
        850: true;
        ["t-950"]: true;
        ["t-500"]: true;
    }
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