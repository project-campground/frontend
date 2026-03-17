import type { ColorSystemOptions } from "@mui/joy/styles/extendTheme";
import { generateColorScheme, generateNeutralColorScheme } from "./gen";
import { darkestToLightest } from "./common";

const shades = darkestToLightest;

const {background, neutral, text} = generateNeutralColorScheme(shades, true);
const lightColorScheme: ColorSystemOptions = {
    shadowOpacity: "0.10",
    palette: {
        neutral,
        text,
        primary: generateColorScheme("#ff5a26", shades[950], shades[50]),
        secondary: generateColorScheme("#ff2661", shades[950], shades[50]),
        danger: generateColorScheme("#fe1c56", shades[950], shades[50]),
        warning: generateColorScheme("#ff851f", shades[950], shades[50]),
        success: generateColorScheme("#2bfa5e", shades[950], shades[50]),
        info: generateColorScheme("#6026ff", shades[950], shades[50]),
        // debug: generateColorScheme("#26f2ff", shades[950], shades[50]),
        // note: generateColorScheme("#ca1cfe", shades[950], shades[50]),
        background,
    }
};

export default lightColorScheme;