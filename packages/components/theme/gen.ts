// From Yoki's code
// Copied by PrettyGoodName, but it was also written by PrettyGoodName
// Not exactly a proprietary code
// Could rewrite in-case it's not in Campground's interest

import type { PaletteOptions } from "@mui/joy/styles/types";
import { greyscaleHexColor, mixHexColors } from "./color";

export const generateColorScheme = (typicalColour: string, background: string, counter: string): Partial<PaletteOptions["primary" | "neutral" | "success" | "danger"]> => ({
    1000: mixHexColors(typicalColour, background, 0.95),
    950: mixHexColors(typicalColour, background, 0.88),
    900: mixHexColors(typicalColour, background, 0.8),
    850: mixHexColors(typicalColour, background, 0.7),
    800: mixHexColors(typicalColour, background, 0.6),
    700: mixHexColors(typicalColour, background, 0.4),
    600: mixHexColors(typicalColour, background, 0.2),
    "t-500": `${typicalColour}cc`,
    border: `${typicalColour}0B`,
    500: typicalColour,
    400: mixHexColors(typicalColour, counter, 0.2),
    300: mixHexColors(typicalColour, counter, 0.4),
    200: mixHexColors(typicalColour, counter, 0.6),
    100: mixHexColors(typicalColour, counter, 0.8),
    // Solid
    solidBg: typicalColour,
    solidColor: background,
    solidHoverBg: mixHexColors(typicalColour, counter, 0.2),
    // Plain
    plainHoverBg: mixHexColors(typicalColour, background, 0.9),
    plainActiveBg: mixHexColors(typicalColour, background, 0.85),
    // Outlined
    outlinedColor: mixHexColors(typicalColour, counter, 0.5),
    outlinedBorder: mixHexColors(typicalColour, background, 0.55),

    outlinedHoverBg: mixHexColors(typicalColour, background, 0.9),
    outlinedHoverColor: mixHexColors(typicalColour, counter, 0.6),
    outlinedHoverBorder: mixHexColors(typicalColour, background, 0.45),

    outlinedActiveBg: mixHexColors(typicalColour, background, 0.8),
    outlinedActiveColor: mixHexColors(typicalColour, counter, 0.7),
    outlinedActiveBorder: mixHexColors(typicalColour, background, 0.35),

    outlinedDisabledColor: mixHexColors(greyscaleHexColor(typicalColour, 0.7), background, 0.5),
    outlinedDisabledBorder: mixHexColors(typicalColour, background, 0.85),
    // Soft
    softBg: mixHexColors(typicalColour, background, 0.8),
    softColor: mixHexColors(typicalColour, counter, 0.5),

    softHoverBg: mixHexColors(typicalColour, background, 0.7),
    softHoverColor: mixHexColors(typicalColour, counter, 0.7),

    softActiveBg: mixHexColors(typicalColour, background, 0.6),
    softActiveColor: mixHexColors(typicalColour, counter, 0.8),
});

interface Shades {
    950: string;
    900: string;
    800: string;
    700: string;
    600: string;
    500: string;
    400: string;
    300: string;
    200: string;
    100: string;
    50: string;
}

export const generateNeutralColorScheme = (shades: Shades, lightMode: boolean): Partial<PaletteOptions["neutral"]> => ({
    ...shades,
    plainActiveBg: shades[900],
    border: `${shades[200]}0B`,
    "t-950": `${shades[950]}cc`,
})