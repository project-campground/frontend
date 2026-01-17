import { Box } from "@mui/joy";

export default function GradientBanner() {
    return (
        <Box sx={(theme) => ({ height: "100%", zIndex: -2, background: `linear-gradient(to right, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.danger[500]})`, width: "100%" })}>

        </Box>
    )
}