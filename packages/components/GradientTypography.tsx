import { Typography, styled } from "@mui/joy";
import { keyframes } from "@emotion/react";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import type { TypographyProps } from "@mui/joy";

export const animatedLinearGradient = keyframes`
    0% {
        background-position-x: 0%;
    }
    100% {
        background-position-x: 100%;
    }
`;

export const animatedWaveGradient = keyframes`
    0% {
        background-position-x: 0%;
    }
    100% {
        background-position-x: 100%;
    }
`;

export const animatedRadialGradient = keyframes`
    0% {
        background-position-y: 0%;
        background-position-x: 0%;
    }
    12.5% {
        background-position-y: 50%;
    }
    37.5% {
        background-position-y: 110%;
    }
    37.55% {
        background-position-y: 0%;
    }
    50% {
        background-position-y: 50%;
        background-position-x: 100%;
    }
    62.5% {
        background-position-y: 110%;
    }
    62.55% {
        background-position-y: 0%;
    }
    75% {
        background-position-y: 50%;
    }
    100% {
        background-position-y: 110%;
        background-position-x: 0%;
    }
`;

export type GradientAnimation = "none" | "wave" | "linear" | "radial";
export interface GradientTypographyProps extends TypographyProps {
    motion?: GradientAnimation;
    colors?: string[] | undefined | null;
};

const GradientTypographyRoot = styled(Typography, {
    name: "GradientTypography",
    slot: "root",
})<{ ownerState: GradientTypographyProps; }>(({ ownerState: { colors } }) => ({
    "&.GradientTypography-withColors": {
        WebkitTextFillColor: "transparent",
        color: "transparent",
        backgroundClip: "text",
        width: "max-content",
        background: `linear-gradient(to right in oklch, var(--GradientTypography-gradient)) text`,
        animationDuration: `var(--GradientTypography-time)`,
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
    },
    "&.GradientTypography-withColors.GradientTypography-motionNone": {
        // oklch just has the best colour interpolation for most colours and might be expected by users
    },
    "&.GradientTypography-withColors.GradientTypography-motionLinear": {
        backgroundClip: "text",
        backgroundSize: `8000%`,
    },
    "&.GradientTypography-withColors.GradientTypography-motionWave": {
        backgroundClip: "text",
        backgroundSize: `200%`,
    },
    "&.GradientTypography-withColors.GradientTypography-motionRadial": {
        backgroundClip: "text",
        background: `radial-gradient(var(--GradientTypography-gradient)) text`,
        backgroundSize: "200% 1000%",
    },
}));

const GradientTypography = forwardRef<HTMLParagraphElement, GradientTypographyProps>(function GradientTypography(props, ref) {
    const { motion, colors, sx, ...other } = props;
    const ownerState = other;
    const percentageOfColor = 50 / (colors?.length ?? 1);
    const defaultedMotion = motion ?? "none";
    
    return (
        jsx(GradientTypographyRoot, {
            ref,
            ownerState,
            className: [
                `motion${defaultedMotion[0].toUpperCase() + defaultedMotion.slice(1)}`,
                colors?.length && `withColors`
            ].filter((x) => x).map((x) => `GradientTypography-${x}`).join(" "),
            sx: Object.assign({}, ...[
                // !colors?.length && {
                //     background: "transparent",
                // },
                colors?.length && (!motion || motion === "none") && {
                    "--GradientTypography-gradient": colors.join(", "),
                },
                colors?.length && motion === "linear" && {
                    "--GradientTypography-gradient": colors.concat(colors[0]).join(", "),
                    "--GradientTypography-time": `${2.5 * colors.length}s`,
                    animationName: `${animatedLinearGradient}`,
                },
                colors?.length && motion === "wave" && {
                    "--GradientTypography-gradient": colors.concat(colors).concat(colors[0]).map((x, i) => `${x} ${percentageOfColor * i}%`).join(", "),
                    "--GradientTypography-time": `${2.5 * colors.length}s`,
                    animationName: `${animatedWaveGradient}`,
                },
                colors?.length && motion === "radial" && {
                    "--GradientTypography-gradient": colors.concat(colors).join(", "),
                    "--GradientTypography-time": `${10 * colors.length}s`,
                    animationName: `${animatedRadialGradient}`,
                },
                sx,
            ].filter((x) => x)),
            ...other
        })
    )
});

export default GradientTypography;