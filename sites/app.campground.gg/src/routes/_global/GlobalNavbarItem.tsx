import { Button, styled } from "@mui/joy";

export const GlobalNavbarItem = styled(Button)(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.level1,
    border: `solid 1px ${theme.vars.palette.neutral.border}`,
    padding: 1,
    borderRadius: theme.vars.radius.lg,
    "--svg-color": theme.vars.palette.neutral[400],
    cursor: "pointer",
    color: theme.vars.palette.text.tertiary,
    boxShadow: theme.vars.shadow.sm,
    ":hover": {
        color: theme.vars.palette.text.primary,
        backgroundColor: theme.vars.palette.background.level2,
        "--svg-color": theme.vars.palette.neutral[300],
    },
    ":active": {
        color: theme.vars.palette.text.secondary,
        backgroundColor: theme.vars.palette.background.body,
        "--svg-color": theme.vars.palette.neutral[300],
    },
    "&.active": {
        color: theme.vars.palette.text.secondary,
        backgroundColor: theme.vars.palette.background.level2,
        "--svg-color": theme.vars.palette.neutral[200],
    }
}));

export const GlobalNavbarItemActive = styled(GlobalNavbarItem)(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.level3,
    "--svg-color": theme.vars.palette.neutral[200],
    ":hover": {
        backgroundColor: theme.vars.palette.background.level4,
        "--svg-color": theme.vars.palette.neutral[100],
    }
}));