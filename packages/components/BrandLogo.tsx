import { Stack, Typography, styled } from "@mui/joy";
import type { DefaultTypographySystem } from "@mui/joy/styles/types";
import SvgLogo from "./svg/SvgLogo";
import SvgUse from "./svg/SvgUse";
import { jsx } from "react/jsx-runtime";

type Size = "xl" | "lg" | "md" | "sm" | "xs";

type Props = {
    includeText?: boolean;
    size?: Size;
};

const sizeToFz: Record<Size, keyof DefaultTypographySystem> = {
    "xl": "h1",
    "lg": "h2",
    "md": "h3",
    "sm": "h4",
    "xs": "title-sm"
};

const sizeToPx: Record<Size, number> = {
    xs: 36,
    sm: 48,
    md: 56,
    lg: 64,
    xl: 96,
};

const BrandIconContainer = styled("span", {
    name: "BrandIconContainer",
})(() => ({
    "& > svg": {
        width: sizeToPx.md,
        height: sizeToPx.md,
        userSelect: "none",
    },
    "&.BrandIconContainer-sizeMd > svg": {
        width: sizeToPx.md,
        height: sizeToPx.md,
    },
    "&.BrandIconContainer-sizeSm > svg": {
        width: sizeToPx.sm,
        height: sizeToPx.sm,
    },
    "&.BrandIconContainer-sizeXs > svg": {
        width: sizeToPx.xs,
        height: sizeToPx.xs,
    },
    "&.BrandIconContainer-sizeLg > svg": {
        width: sizeToPx.lg,
        height: sizeToPx.lg,
    },
    "&.BrandIconContainer-sizeXl > svg": {
        width: sizeToPx.xl,
        height: sizeToPx.xl,
    },
}));

const Svg = styled("svg", {
    name: "BrandLogoSvg",
    slot: "svg",
})(({ theme }) => ({
    color: theme.vars.palette.primary[500],
}));

const normalizeName = (size: Size) => size[0].toUpperCase() + size.slice(1);


export default function BrandLogo({ size, includeText }: Props) {
    const sizeName = size ? normalizeName(size) : "Md";
    const fz = sizeToFz[size ?? "md"];
    const px = sizeToPx[size ?? "md"];

    return (
        jsx(Stack, {
            direction: "row",
            alignItems: "center",
            gap: 1,
            className: `BrandLogo container BrandIconContainer-size${sizeName}`,
            children: [
                jsx(BrandIconContainer, { sx: { height: px, }, className: `BrandIconContainer-size${sizeName}`, children:
                    jsx(Svg, { width: px, height: px, children: [
                        jsx(SvgLogo, {}, "logo"),
                        jsx(SvgUse, { id: "cg-logo" }, "use"),
                    ]}),
                }, "icon"),
                includeText && jsx(Typography, { level: fz, textColor: "primary.500", children: "Campground" }, "logo"),
            ]
        })
    )
}