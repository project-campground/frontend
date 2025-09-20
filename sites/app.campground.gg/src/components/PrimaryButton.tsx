import { Button, styled } from "@mui/joy";

const PrimaryButton = styled(Button)(({ disabled, theme }) => (console.log(theme), {
    background: disabled ? `linear-gradient(30deg, ${theme.vars.palette.neutral[300]}, ${theme.vars.palette.neutral[500]})` : `linear-gradient(30deg, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.secondary[500]})`,
    boxShadow: disabled ? `0 0 5px ${theme.vars.palette.neutral[400]}` : `0 0 5px ${theme.vars.palette.primary[500]}`,
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
}));
export default PrimaryButton;