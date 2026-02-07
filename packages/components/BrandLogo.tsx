import { Stack, Box, Typography, styled } from "@mui/joy";
import type { DefaultTypographySystem } from "@mui/joy/styles/types";
import SvgLogo from "./svg/SvgLogo";
import SvgUse from "./svg/SvgUse";

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
})(({ theme }) => ({
    "& > img": {
        width: sizeToPx.md,
        height: sizeToPx.md,
        userSelect: "none",
    },
    "&.BrandIconContainer-sizeMd > img": {
        width: sizeToPx.md,
        height: sizeToPx.md,
    },
    "&.BrandIconContainer-sizeSm > img": {
        width: sizeToPx.sm,
        height: sizeToPx.sm,
    },
    "&.BrandIconContainer-sizeXs > img": {
        width: sizeToPx.xs,
        height: sizeToPx.xs,
    },
    "&.BrandIconContainer-sizeLg > img": {
        width: sizeToPx.lg,
        height: sizeToPx.lg,
    },
    "&.BrandIconContainer-sizeXl > img": {
        width: sizeToPx.xl,
        height: sizeToPx.xl,
    },
}));

const Svg = styled("svg", {
    name: "BrandLogoSvg",
    slot: "svg",
})(({ theme }) => ({
    stroke: theme.vars.palette.primary[500],
    strokeWidth: 3,
    strokeLinecap: "butt",
    strokeLinejoin: "round",
}));

const normalizeName = (size: Size) => size[0].toUpperCase() + size.slice(1);


export default function BrandLogo({ size, includeText }: Props) {
    const sizeName = size ? normalizeName(size) : "Md";
    const fz = sizeToFz[size ?? "md"];
    const px = sizeToPx[size ?? "md"];

    return (
        <Stack direction="row" alignItems="center" gap={1} className={`BrandLogo container BrandIconContainer-size${sizeName}`}>
            <BrandIconContainer sx={{ height: px, }} className={`BrandIconContainer-size${sizeName}`}>
                <Svg width={px} height={px}>
                    <SvgLogo />
                    <SvgUse id="cg-logo" />
                </Svg>
            </BrandIconContainer>
            {includeText && <Typography level={fz} textColor="primary.500">
                Campground
            </Typography>}
        </Stack>
    )
}