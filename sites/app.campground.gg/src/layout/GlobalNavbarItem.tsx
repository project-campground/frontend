import { Button, styled } from "@mui/joy";

export const GlobalNavbarItem = styled(Button)(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.level1,
    padding: 1,
    borderRadius: theme.vars.radius.lg,
    transition: "background-color 0.4s",
    "--svg-color": theme.vars.palette.neutral[400],
    cursor: "pointer",
    ":hover": {
        backgroundColor: theme.vars.palette.background.level2,
        "--svg-color": theme.vars.palette.neutral[300],
    },
    ":active": {
        backgroundColor: theme.vars.palette.background.body,
        "--svg-color": theme.vars.palette.neutral[300],
    },
    "&.active": {
        border: `solid 1px ${theme.vars.palette.neutral[500]}`,
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