import { ColorSystemOptions } from "@mui/joy/styles/extendTheme";
import { generateColorScheme } from "./gen";

const darkest = "#040409", lightest = "#f5f3ff";

const shades = {
    950: darkest,
    900: "#0e0b16",
    800: "#151121",
    700: "#181426",
    600: "#1f1b32",
    500: "#231e37",
    400: "#3f405b",
    300: "#78799a",
    200: "#9695b2",
    100: "#dcd8ec",
    50: lightest,
};

const darkColorScheme: ColorSystemOptions = {
    palette: {
        neutral: {
            ...shades,
            "t-950": `${shades[950]}cc`,
        },
        text: {
            primary: shades[50],
            secondary: shades[100],
            tertiary: shades[200],
            icon: shades[300],
        },
        primary: generateColorScheme("#ff5a26", darkest, lightest),
        secondary: generateColorScheme("#ff2661", darkest, lightest),
        danger: generateColorScheme("#fe1c56", darkest, lightest),
        warning: generateColorScheme("#ff851f", darkest, lightest),
        success: generateColorScheme("#2bfa5e", darkest, lightest),
        info: generateColorScheme("#6026ff", darkest, lightest),
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

export default darkColorScheme;