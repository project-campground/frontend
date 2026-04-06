import { Box, styled } from "@mui/joy"

const FadingBanner = styled(Box, {
    name: "FadingBanner",
    slot: "root",
})(() => ({
    maskImage: `linear-gradient(to bottom, white, transparent)`,
    maskRepeat: "no-repeat",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    zIndex: -3,
}));

export default FadingBanner;