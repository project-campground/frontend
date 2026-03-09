import type { ColorSystemOptions } from "@mui/joy/styles/extendTheme";
import { generateColorScheme, generateNeutralColorScheme } from "./gen";
import "../types";

const darkest = "#040409", lightest = "#f5f3ff";

const shades = {
    950: darkest,
    900: "#0e0b16",
    800: "#151121",
    700: "#1a162a",
    600: "#1f1b32",
    500: "#231e37",
    400: "#3f405b",
    300: "#78799a",
    200: "#9695b2",
    100: "#dcd8ec",
    50: lightest,
};

const darkColorScheme: ColorSystemOptions = {
    shadowOpacity: "0.25",
    palette: {
        neutral: generateNeutralColorScheme(shades, false),
        text: {
            primary: shades[50],
            secondary: shades[100],
            tertiary: shades[200],
            quartary: shades[400],
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
        primary: generateColorScheme("#ff5a26", darkest, lightest),
        secondary: generateColorScheme("#ff2661", darkest, lightest),
        danger: generateColorScheme("#fe1c56", darkest, lightest),
        warning: generateColorScheme("#fea01c", darkest, lightest),
        success: generateColorScheme("#0cef43", darkest, lightest),
        info: generateColorScheme("#6026ff", darkest, lightest),
        debug: generateColorScheme("#26f2ff", darkest, lightest),
        note: generateColorScheme("#ca1cfe", darkest, lightest),
        background: {
            backdrop: `${shades[800]}aa`,
            backdrop950: `${shades[950]}aa`,
            transparent0: `${shades[950]}dd`,
            transparent1: `${shades[950]}99`,
            transparent2: `${shades[950]}55`,
            popup: "#000000",
            body: shades[950],
            surface: shades[900],
            level1: shades[900],
            level2: shades[800],
            level3: shades[700],
            level4: shades[600],
            level5: shades[500],
        }
    }
};

export default darkColorScheme;