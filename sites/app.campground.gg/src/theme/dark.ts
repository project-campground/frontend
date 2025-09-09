import { ColorSystemOptions } from "@mui/joy/styles/extendTheme";
import { generateColorScheme } from "./gen";

const darkest = "#040409", lightest = "#f5f3ff";

const darkColorScheme: ColorSystemOptions = {
    palette: {
        neutral: {
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
        },
        text: {
            primary: lightest,
            secondary: "#dcd8ec",
            tertiary: "#9695b2",
            icon: "#78799a",
        },
        primary: generateColorScheme("#ff5a26", darkest, lightest),
        secondary: generateColorScheme("#ff2661", darkest, lightest),
        danger: generateColorScheme("#fe1c56", darkest, lightest),
        warning: generateColorScheme("#ff851f", darkest, lightest),
        success: generateColorScheme("#2bfa5e", darkest, lightest),
        info: generateColorScheme("#6026ff", darkest, lightest),
        background: {
            popup: "#000000",
            body: "#040409",
            //backdrop: "#040409",
            surface: "#0e0b16",
            level1: "#0e0b16",
            level2: "#151121",
            level3: "#181426",
            level4: "#1f1b32",
            level5: "#231e37",
        }
    }
};

export default darkColorScheme;