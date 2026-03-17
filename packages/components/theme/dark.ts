import type { ColorSystemOptions } from "@mui/joy/styles/extendTheme";
import { generateColorScheme, generateNeutralColorScheme } from "./gen";
import { lightestToDarkest } from "./common";

const shades = lightestToDarkest;

const {background, neutral, text} = generateNeutralColorScheme(shades, false);
const darkColorScheme: ColorSystemOptions = {
    shadowOpacity: "0.30",
    palette: {
        neutral,
        text,
        primary: generateColorScheme("#ff5a26", shades[950], shades[50]),
        secondary: generateColorScheme("#ff2661", shades[950], shades[50]),
        danger: generateColorScheme("#fe1c56", shades[950], shades[50]),
        warning: generateColorScheme("#fea01c", shades[950], shades[50]),
        success: generateColorScheme("#0cef43", shades[950], shades[50]),
        info: generateColorScheme("#6026ff", shades[950], shades[50]),
        // debug: generateColorScheme("#26f2ff", shades[950], shades[50]),
        // note: generateColorScheme("#ca1cfe", shades[950], shades[50]),
        background,
    }
};

export default darkColorScheme;