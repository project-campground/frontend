import type { ColorSystemOptions } from "@mui/joy/styles/extendTheme";
import { generateColorScheme } from "./gen";

const darkest = "#040409", lightest = "#f5f3ff";

const shades = {
    950: lightest,
    900: "#dcd8ec",
    800: "#9695b2",
    700: "#78799a",
    600: "#3f405b",
    500: "#231e37",
    400: "#1f1b32",
    300: "#181426",
    200: "#151121",
    100: "#0e0b16",
    50: darkest,
};

const lightColorScheme: ColorSystemOptions = {
    palette: {
        neutral: {
            ...shades,
            "t-950": `${lightest}cc`,
        },
        text: {
            primary: shades[50],
            secondary: shades[100],
            tertiary: shades[200],
            quartary: shades[400],
            icon: shades[300],
            "code-keyword": "#fe603f",
            "code-string": "#ff538b",
            "code-number": "#c998f9",
            "code-template": "#ea16b0",
            "code-class": "#74a6f8",
            "code-function": "#ffb95e",
            "code-attribute": "#bcec6a",
        },
        primary: generateColorScheme("#ff5a26", lightest, darkest),
        secondary: generateColorScheme("#ff2661", lightest, darkest),
        danger: generateColorScheme("#fe1c56", lightest, darkest),
        warning: generateColorScheme("#ff851f", lightest, darkest),
        success: generateColorScheme("#2bfa5e", lightest, darkest),
        info: generateColorScheme("#6026ff", lightest, darkest),
        debug: generateColorScheme("#26f2ff", lightest, darkest),
        note: generateColorScheme("#ca1cfe", lightest, darkest),
        background: {
            transparent: `${shades[950]}dd`,
            popup: "#000000",
            body: shades[950],
            //backdrop: shades[950],
            surface: shades[900],
            level1: shades[900],
            level2: shades[800],
            level3: shades[700],
            level4: shades[600],
            level5: shades[500],
        }
    }
};

export default lightColorScheme;