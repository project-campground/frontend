import { Link, Stack, Typography } from "@mui/joy";
import { DefaultTypographySystem } from "@mui/joy/styles/types";

export type Props = {
    includeText?: boolean;
    size?: "xl" | "lg" | "md" | "sm" | "xs";
};

const sizeToFz: Record<"xl" | "lg" | "md" | "sm" | "xs", keyof DefaultTypographySystem> = {
    "xl": "h1",
    "lg": "h2",
    "md": "h3",
    "sm": "h4",
    "xs": "title-sm"
};

export default function BrandLogo({ size, includeText }: Props) {
    const fz = sizeToFz[size ?? "md"];

    return (
        <Link component="a" className={`BrandLogo container ${size ?? "md"}`} href="/">
            <Stack direction="row" alignItems="center" gap={1}>
                <img className={`BrandLogo img ${size ?? "md"}`} src="/logo.svg" />
                {includeText && <Typography level={fz}>
                    Campground
                </Typography>}
            </Stack>
        </Link>
    )
}