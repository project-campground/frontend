import { extendTheme } from "@mui/joy";
import { bodyFontFamily, displayFontFamily } from "./font";
import lightColorScheme from "./light";
import darkColorScheme from "./dark";

const theme = extendTheme({
    cssVarPrefix: ``,
    typography: {
        code: {
            padding: `2px 4px`,
            borderRadius: `var(--radius-md)`,
            backgroundColor: `var(--palette-background-body)`,
            color: `var(--palette-primary-300)`,
            fontFamily: `var(--fontFamily-code)`,
            display: "inline",
        }
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
        },
        JoyCard: {
            styleOverrides: {
                root: ({ theme }) => ({
                    boxShadow: theme.vars.shadow.sm,
                }),
            }
        }
    }
});

export default theme;