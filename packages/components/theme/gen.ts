import type { PaletteOptions, PaletteText } from "@mui/joy/styles/types";
import { greyscaleHexColor, mixHexColors } from "./color";
import type { lightestToDarkest } from "./common";

export const generateColorScheme = (typicalColour: string, background: string, counter: string): Partial<PaletteOptions["primary" | "neutral" | "success" | "danger"]> => ({
    1000: mixHexColors(typicalColour, background, 0.95),
    950: mixHexColors(typicalColour, background, 0.88),
    900: mixHexColors(typicalColour, background, 0.8),
    850: mixHexColors(typicalColour, background, 0.7),
    800: mixHexColors(typicalColour, background, 0.6),
    750: mixHexColors(typicalColour, background, 0.5),
    700: mixHexColors(typicalColour, background, 0.4),
    600: mixHexColors(typicalColour, background, 0.2),
    500: typicalColour,
    400: mixHexColors(typicalColour, counter, 0.2),
    300: mixHexColors(typicalColour, counter, 0.4),
    250: mixHexColors(typicalColour, counter, 0.5),
    200: mixHexColors(typicalColour, counter, 0.6),
    150: mixHexColors(typicalColour, counter, 0.7),
    100: mixHexColors(typicalColour, counter, 0.8),
    50: mixHexColors(typicalColour, counter, 0.88),
    // Extra
    "t-500": `${typicalColour}cc`,
    border: `${typicalColour}0B`,
    // Solid
    solidBg: typicalColour,
    solidColor: background,
    solidHoverBg: mixHexColors(typicalColour, counter, 0.2),
    // Plain
    plainHoverBg: mixHexColors(typicalColour, background, 0.85),
    plainActiveBg: mixHexColors(typicalColour, background, 0.9),
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

type PickedPaletteOptions = "background" | "neutral" | "text";
export const generateNeutralColorScheme = (shades: typeof lightestToDarkest, lightMode: boolean): { [k in PickedPaletteOptions]: Partial<PaletteOptions[k]> } => {
    const modeTotalSubtraction = lightMode ? 50 * 2 : 0;
    const modeAddition = -50;
    const text: Pick<PaletteText, "primary" | "secondary" | "tertiary" | "quartary"> = {
        primary: shades[100],
        secondary: shades[200],
        tertiary: shades[400],
        quartary: shades[500],
    };
    
    return {
        text: {
            ...text,
            mid: shades[300],
            icon: shades[300],
            code: "#fe603f",
            "code-keyword": "#fe603f",
            "code-string": "#ff538b",
            "code-number": "#c998f9",
            "code-template": "#ea16b0",
            "code-class": "#74a6f8",
            "code-function": "#ffb95e",
            "code-attribute": "#bcec6a",
        },
        background: {
            body: shades[(950 - modeTotalSubtraction) as 950],
            surface: shades[900],
            level1: shades[900],
            level2: shades[lightMode ? 950 : 850],
            level3: shades[(950 + (modeAddition * 1)) as 900],
            level4: shades[(950 + (modeAddition * 2)) as 900],
            level5: shades[(950 + (modeAddition * 3)) as 900],

            skeleton: shades[850],
            skeletonPulse: shades[800],

            backdrop: `${shades[800]}aa`,
            backdrop950: `${shades[950]}aa`,
            transparent0: `${shades[950]}dd`,
            transparent1: `${shades[950]}99`,
            transparent2: `${shades[950]}55`,
            popup: `#${shades[950]}`,
        },
        neutral: {
            ...shades,
            // Extra
            border: `${shades[50]}${(lightMode ? 0x2b : 0x0b).toString(16).padStart(2, "0")}`,
            "t-950": `${shades[950]}cc`,
            // Plain
            plainColor: text.tertiary,
            plainHoverColor: text.secondary,
            plainActiveColor: text.tertiary,
            plainDisabledColor: text.quartary,
            
            plainHoverBg: shades[850],
            plainActiveBg: shades[950],
            // Solid
            solidBg: shades[750],
            solidHoverBg: shades[700],
            solidActiveBg: shades[800],
            solidDisabledBg: shades[800],
            
            solidColor: text.primary,
            solidHoverColor: text.primary,
            solidActiveColor: text.primary,
            solidDisabledColor: text.tertiary,
            
            // Outlined
            outlinedColor: text.tertiary,
            outlinedHoverColor: text.secondary,
            outlinedActiveColor: text.tertiary,
            outlinedDisabledColor: text.quartary,

            outlinedBorder: `${shades[400]}${(lightMode ? 0x40 : 0x20).toString(16).padStart(2, "0")}`,
            outlinedDisabledBorder: `${shades[400]}${(lightMode ? 0x30 : 0x10).toString(16).padStart(2, "0")}`,
            
            outlinedBg: shades[900],
            outlinedHoverBg: shades[850],
            outlinedActiveBg: shades[950],
            outlinedDisabledBg: shades[900],
            
            // Soft
            softColor: text.tertiary,
            softHoverColor: text.secondary,
            softActiveColor: text.tertiary,
            softDisabledColor: text.quartary,

            softBg: shades[850],
            softHoverBg: shades[800],
            softActiveBg: shades[750],
            softDisabledBg: shades[850],
        }
    };
}