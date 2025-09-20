// import { createTheme } from "@mantine/core"

import { extendTheme, PaletteVariant } from "@mui/joy";
import { bodyFontFamily, displayFontFamily } from "./font";
import lightColorScheme from "./light";
import darkColorScheme from "./dark";
import { DefaultPaletteRange } from "@mui/joy/styles/types";

declare module "@mui/joy/styles" {
    // Add new text levels
    interface TypographySystemOverrides {
        code: true;
    }
    interface ListItemButtonPropsVariantOverrides {
        indented: true;
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
    // Add new colours
    interface PaletteOptions {
        secondary: DefaultPaletteRange & PaletteVariant;
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
}

const theme = extendTheme({
    cssVarPrefix: ``,
    variants: {
        soft: {
            info: {
                
            },
            secondary: {

            }
        },
    },
    fontFamily: {
        body: bodyFontFamily,
        display: displayFontFamily
    },
    colorSchemes: {
        light: lightColorScheme,
        dark: darkColorScheme,
    },
    components: {
        JoyButton: {
            styleOverrides: {
                root: {
                    transition: "background 0.3s",
                }
            },
        }
    }
});

export default theme;