import { extendTheme, type ColorPaletteProp } from "@mui/joy";
import { bodyFontFamily, displayFontFamily } from "./font";
import lightColorScheme from "./light";
import darkColorScheme from "./dark";
import type { AvatarPropsSizeOverrides } from "../types/components";

const newAvatarSizes: (keyof AvatarPropsSizeOverrides)[] = ["xl", "xxl", "xxxl"];
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
        JoySwitch: {
            styleOverrides: {
                track: {
                    transition: "background 0.3s",
                },
                thumb: {
                    transitionProperty: "left, background",
                    transitionDuration: "0.3s",
                },
            },
        },
        JoyAvatar: {
            styleOverrides: {
                root: ({ theme, ownerState: { size } }) => {
                    const sizeXAmount = (size?.split("x").length ?? 1) - 1;
                    return {
                        ...(size?.includes("x") ? {
                            fontSize: `${sizeXAmount / 2 + 1}rem`,
                            width: theme.spacing(7 + (sizeXAmount * 2)),
                            height: theme.spacing(7 + (sizeXAmount * 2)),
                        } : {})
                    }
                }
            }
        },
        JoyModalDialog: {
            styleOverrides: {
                root: ({ theme, ownerState: {  }}) => ({
                    [theme.breakpoints.up("md")]: {
                        "&.MuiModalDialog-layoutFullscreen": {
                            borderRadius: theme.vars.radius.xl,
                            border: `solid 1px ${theme.vars.palette.neutral[950]}`,
                        }
                    },
                    [theme.breakpoints.only("md")]: {
                        "&.MuiModalDialog-layoutFullscreen": {
                            margin: `32px 64px`,
                        }
                    },
                    [theme.breakpoints.up("lg")]: {
                        "&.MuiModalDialog-layoutFullscreen": {
                            margin: `48px 96px`,
                            borderRadius: theme.vars.radius.xl,
                            border: `solid 1px ${theme.vars.palette.neutral[950]}`,
                        }
                    }
                }),
            }
        },
        JoyButton: {
            styleOverrides: {
                root: ({ theme, ownerState: { variant, disabled, color, } }) => ({
                    transition: "background 0.3s",
                    ...(variant === "glow" ? {
                        background: disabled ? `linear-gradient(30deg, ${theme.vars.palette.neutral[300]}, ${theme.vars.palette.neutral[500]})` : `linear-gradient(30deg, ${theme.vars.palette[(color ?? "primary") as ColorPaletteProp][500]}, ${theme.vars.palette[!color || color === "primary" ? "secondary" : color as ColorPaletteProp][500]})`,
                        boxShadow: disabled ? `0 0 5px ${theme.vars.palette.neutral[400]}` : `0 0 5px ${theme.vars.palette[(color ?? "primary") as ColorPaletteProp][500]}`,
                        color: theme.vars.palette.common.black,
                        "::after": {
                            content: '""',
                            zIndex: 1,
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "transparent",
                            position: "absolute",
                            transition: "background 0.3s",
                            borderRadius: "var(--Button-radius, var(--joy-radius-sm))",
                        },
                        ":hover::after": {
                            backgroundColor: "#FFF3"
                        }
                    } : {})
                })
            },
        },
        JoyCard: {
            styleOverrides: {
                root: ({ theme }) => ({
                    boxShadow: theme.vars.shadow.sm,
                }),
            }
        },
        JoyTabList: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.vars.palette.background.body,
                    borderRadius: theme.vars.radius.md,
                    borderBottom: "none",
                })
            }
        },
        JoyTab: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.vars.radius.md,
                    borderBottom: "none",
                    flex: 1,
                    "::after": {
                        display: "none",
                    }
                })
            }
        },
    }
});

export default theme;