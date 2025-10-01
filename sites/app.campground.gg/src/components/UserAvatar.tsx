import { Avatar, Badge, styled } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";

const availableBadgeSizes = ["sm", "md", "lg"];

type Size = "sm" | "md" | "lg" | "xl" | "xxl";
type Props = {
    did: string;
    avatar?: string | null;
    status?: string | null;
    size?: Size;
    sx?: SxProps;
    badgeSx?: SxProps;
};
const sizeToPx: Record<Size, number> = {
    sm: 20,
    md: 24,
    lg: 48,
    xl: 96,
    xxl: 128,
};

const StyledAvatar = styled(Avatar)(({ theme, size }) => ({
    width: sizeToPx[size ?? "md"],
    height: sizeToPx[size ?? "md"],
    borderRadius: theme.vars.radius[(size as Size) === "xxl" ? "xl" : size ?? "md"]
}));

export default function UserAvatar({ did, avatar, status, size, badgeSx, sx }: Props) {
    const sizePx = sizeToPx[size ?? "md"];
    const badgeSize = sizePx * 0.25;

    return (
        <Badge
            slotProps={{ badge: { sx: { width: badgeSize, height: badgeSize, } } }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            badgeInset={badgeSize / 2}
            color="success"
            size={
                size
                ? availableBadgeSizes.includes(size)
                ? size as "sm" | "md" | "lg"
                : "lg"
                : "md"}
            sx={badgeSx}
        >
            <StyledAvatar
                color="primary"
                variant="solid"
                size={(size ?? "md") as "sm" | "md" | "lg"}
                sx={sx}
                src={avatar ?? undefined}
            >
            </StyledAvatar>
        </Badge>
    );
}