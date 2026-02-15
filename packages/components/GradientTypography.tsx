import { Typography, styled } from "@mui/joy";
import { keyframes } from "@emotion/react";

export const animatedGradient = keyframes`
    0% {
        background-position-x: 0%;
    }
    100% {
        background-position-x: 100%;
    }
`;

const GradientTypography = styled(Typography, {
    name: "GradientTypography",
    slot: "root",
})<{ gradientAnimated?: boolean; colors?: string[] | undefined | null; }>(({ gradientAnimated, colors, theme }) => {
    const percentageOfColor = 50 / ((colors?.length ?? 1));

    return [
        colors?.length && {
            WebkitTextFillColor: "transparent",
            background: `linear-gradient(to right, ${colors.join(", ")}) text`,
            backgroundClip: "text",
            width: "max-content",
        },
        colors?.length && gradientAnimated && {
            background: `linear-gradient(to right, ${colors.concat(colors).concat(colors[0]).map((x, i) => `${x} ${percentageOfColor * i}%`).join(", ")}) text`,
            backgroundClip: "text",
            backgroundSize: `200%`,
            animation: `${animatedGradient} linear ${2.5 * colors.length}s infinite`,
        },
    ];
});
export default GradientTypography;