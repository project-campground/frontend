import { extendTheme, type ColorPaletteProp, type ButtonOwnerState, type IconButtonOwnerState, type MenuButtonOwnerState, type ListItemButtonOwnerState, type Theme, type Palette } from "@mui/joy";
import { bodyFontFamily, displayFontFamily } from "./font";
import lightColorScheme from "./light";
import darkColorScheme from "./dark";
import "../types";

const complementaryPalettes: Record<keyof Omit<Palette, "common" | "background" | "text" | "divider" | "focusVisible" | "mode">, keyof Palette> = {
    primary: "secondary",
    secondary: "primary",
    success: "success",
    warning: "danger",
    danger: "danger",
    info: "info",
    // note: "debug",
    // debug: "info",
    neutral: "neutral",
};

const buttonAnimations = {
    transitionDuration: "0.2s",
    transitionProperty: "background, background-color, color, box-shadow, transform",
    ":active": {
        transform: "scale(0.925) translateY(2px)",
    },
    ":hover": {
        transform: "scale(1.0125)",
    },
    // To not be ignored in modified buttons
    "&:active:hover": {
        transform: "scale(0.925) translateY(2px)",
    }
};
const ButtonStyling: (props: { ownerState: ButtonOwnerState | IconButtonOwnerState | MenuButtonOwnerState | ListItemButtonOwnerState, theme: Theme }) => any = ({ theme, ownerState: { variant, disabled, color, } }) => ({
    ...buttonAnimations,
    ...(variant === "glow" ? {
        background: disabled ? `linear-gradient(30deg, ${theme.vars.palette.neutral[500]}, ${theme.vars.palette.neutral[600]})` : `linear-gradient(30deg, ${theme.vars.palette[(color ?? "primary") as ColorPaletteProp][500]} ${!color || color === "primary" ? 0 : 20}%, ${theme.vars.palette[complementaryPalettes[color ?? "primary" as keyof typeof complementaryPalettes] as ColorPaletteProp][500]} ${!color || color === "primary" ? 100 : 130}%)`,
        boxShadow: disabled ? theme.vars.shadow.md : `0px 0px 8px ${theme.vars.palette[(color ?? "primary") as ColorPaletteProp][500]}`,
        color: theme.vars.palette.common.black,
        ":not([disabled]):hover": {
            boxShadow: `0 0 15px ${theme.vars.palette[(color ?? "primary") as ColorPaletteProp][400]}`,
        },
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
            borderRadius: "var(--Button-radius, var(--radius-sm))",
        },
        ":not([disabled]):hover::after": {
            backgroundColor: "#FFF3"
        }
    } : {})
});

const theme = extendTheme({
    zIndex: {
        badge: 1100,
        table: 1200,
        modal: 1300,
        tooltip: 1400,
        popup: 1500,
        snackbar: 1600,
    },
    cssVarPrefix: ``,
    typography: {
        h1: {
            letterSpacing: "0.05em",
        },
        h2: {
            letterSpacing: "0.025em",
        },
        h3: {
            letterSpacing: "0.025em",
        },
        "title-lg": {
            letterSpacing: "0.025em",
        },
        "title-md": {
            letterSpacing: "0.0125em",
        },
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
    shadow: {
        insetSm: "inset 0 0 2px rgba(var(--shadowChannel) / var(--shadowOpacity))",
        insetMd: "inset 0 0 4px rgba(var(--shadowChannel) / var(--shadowOpacity))",
        insetLg: "inset 0 0 8px rgba(var(--shadowChannel) / var(--shadowOpacity))",
        menu: "0 0 12px rgba(var(--shadowChannel) / calc(var(--shadowOpacity) * 2))",
    },
    components: {
        JoySkeleton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    "--unstable_pulse-bg": theme.vars.palette.background.skeletonPulse,
                    "::after": {
                        backgroundColor: theme.vars.palette.background.skeleton,
                    },
                    "::before": {
                        backgroundColor: theme.vars.palette.background.skeleton,
                    },
                }),
            },
        },
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
        JoyRadio: {
            styleOverrides: {
                action: {
                    transition: "background 0.2s",
                },
            },
        },
        JoyAvatar: {
            styleOverrides: {
                root: ({ theme, ownerState: { size } }) => {
                    const sizeXAmount = (size?.split("x").length ?? 1) - 1;
                    return {
                        fontFamily: "var(--fontFamily-display)",
                        fontWeight: 700,
                        ...(size?.includes("x") ? {
                            fontSize: `${sizeXAmount / 2 + 1}rem`,
                            width: theme.spacing(7 + (sizeXAmount * 2)),
                            height: theme.spacing(7 + (sizeXAmount * 2)),
                        } : {})
                    }
                }
            }
        },
        JoyModal: {
            defaultProps: {
                container: () => document.getElementById("root"),
            },
            styleOverrides: {
                root: {
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "1fr",
                    alignItems: "center",
                    justifyItems: "center",
                },
                backdrop: () => ({
                    backdropFilter: "none",
                }),
            }
        },
        JoyModalDialog: {
            styleOverrides: {
                root: ({ theme }) => ({
                    animation: "appear-animation ease-out 0.125s",
                    transform: "none",
                    top: 0,
                    left: 0,
                    gridColumn: "1 / 2",
                    gridRow: "1 / 2",
                    position: "relative",
                    overflow: "hidden",
                    [theme.breakpoints.up("md")]: {
                        "&.MuiModalDialog-layoutFullscreen": {
                            borderRadius: theme.vars.radius.xl,
                        }
                    },
                    [theme.breakpoints.only("md")]: {
                        "&.MuiModalDialog-layoutFullscreen": {
                            width: `calc(100% - 64px)`,
                            height: `calc(100% - 32px)`,
                        }
                    },
                    [theme.breakpoints.up("lg")]: {
                        "&.MuiModalDialog-layoutFullscreen": {
                            width: `calc(100% - 96px)`,
                            height: `calc(100% - 48px)`,
                        }
                    }
                }),
            }
        },
        JoyMenu: {
            defaultProps: {
                container: () => document.getElementById("root"),
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    "--List-padding": "var(--ListDivider-gap)",
                    border: `solid 1px var(--palette-neutral-border)`,
                    animation: "appear-animation-opacity ease-out 0.125s",
                    boxShadow: "var(--shadow-menu)",
                })
            }
        },
        JoyMenuItem: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...buttonAnimations,
                    borderRadius: theme.vars.radius.md,
                }),
            },
        },
        JoyMenuButton: {
            styleOverrides: {
                root: ButtonStyling,
            },
        },
        JoyListItem: {
            styleOverrides: {
                root: {
                    "&.MuiListItem-variantSoft": {
                        ...buttonAnimations,
                    },
                },
            },
        },
        JoyListItemButton: {
            styleOverrides: {
                root: ButtonStyling,
            },
        },
        JoyButton: {
            styleOverrides: {
                root: ButtonStyling,
            },
        },
        JoyIconButton: {
            styleOverrides: {
                root: ButtonStyling,
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
        JoyTabPanel: {
            styleOverrides: {
                root: () => ({
                    flex: 1,
                })
            }
        },
    }
});

export default theme;