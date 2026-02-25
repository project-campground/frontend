import { Typography, styled } from "@mui/joy";
import { keyframes } from "@emotion/react";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import type { TypographyProps } from "@mui/joy";

export const animatedGradient = keyframes`
    0% {
        background-position-x: 0%;
    }
    100% {
        background-position-x: 100%;
    }
`;

export interface GradientTypographyProps extends React.PropsWithChildren, TypographyProps {
    gradientAnimated?: boolean;
    colors?: string[] | undefined | null;
};

const GradientTypographyRoot = styled(Typography, {
    name: "GradientTypography",
    slot: "root",
})<{ ownerState: GradientTypographyProps; }>(() => []);

const GradientTypography = forwardRef<HTMLParagraphElement, GradientTypographyProps>(function GradientTypography(props, ref) {
    const { gradientAnimated, colors, ...other } = props;
    const ownerState = other;
    const percentageOfColor = 50 / ((colors?.length ?? 1));

    return (
        jsx(GradientTypographyRoot, {
            ref,
            ownerState,
            sx: [
                colors?.length && {
                    background: "transparent",
                },
                colors?.length && {
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
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
            ],
            ...other
        })
    )
});

export default GradientTypography;