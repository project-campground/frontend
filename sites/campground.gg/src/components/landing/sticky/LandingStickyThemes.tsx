import { keyframes } from "@emotion/react";
import { Box, Sheet, Stack, Typography } from "@mui/joy";
import { IconPaletteFilled } from "@tabler/icons-react";

const circularMotion = keyframes`
    0% {
        transform: rotate(0deg) translateY(192px) rotate(0deg);
    }
    100% {
        transform: rotate(360deg) translateY(192px) rotate(-360deg);
    }
`
const rainbowBg = keyframes`
    0% {
        background-color: #00FFFF;
    }
    16.67% {
        background-color: #0000FF;
    }
    33.33% {
        background-color: #FF00FF;
    }
    50% {
        background-color: #FF0000;
    }
    66.67% {
        background-color: #FFFF00;
    }
    83.33% {
        background-color: #00FF00;
    }
    100% {
        background-color: #00FFFF;
    }
`

export default function LandingStickyThemes() {
    return (
        <Box sx={{ px: 2, py: 2, borderRadius: `100%`, width: 400, height: 400, position: "relative", background: `conic-gradient(#FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)` }}>
            <Box sx={{ position: "absolute", borderRadius: "100%", width: 16, height: 16, left: "calc(50% - 8px)", top: "calc(50% - 8px)", animation: `${circularMotion} 10s infinite linear`, backgroundColor: `black` }}></Box>
            <Sheet sx={{ borderRadius: `100%`, width: `100%`, height: `100%`, px: 10, py: 10 }}>
                <Sheet sx={{ borderRadius: `100%`, width: "100%", height: "100%", animation: `${rainbowBg} 10s infinite linear` }}>
                    <Stack alignItems="center" direction="column" sx={{ width: "100%", height: "100%" }}>
                        <Stack alignItems="center" direction="row" sx={{ height: "100%" }}>
                            <Typography textColor="neutral.950">
                                <IconPaletteFilled width={96} height={96} />
                            </Typography>
                        </Stack>
                    </Stack>
                </Sheet>
            </Sheet>
        </Box>
    )
}