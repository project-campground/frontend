import { Box, styled } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";

const GradientBanner = styled(Box)(({ theme }) => ({
    height: "100%",
    zIndex: -2,
    background: `linear-gradient(to right, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.danger[500]})`,
    width: "100%",
}));
export default GradientBanner;