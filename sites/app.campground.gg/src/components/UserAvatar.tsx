import { Avatar, Badge, Skeleton, styled } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";

const availableBadgeSizes = ["sm", "md", "lg"];

type Size = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
type Props = {
    did: string;
    withStatus?: boolean;
    avatar?: string | null;
    status?: string | null;
    size?: Size;
    sx?: SxProps;
    badgeSx?: SxProps;
};
const sizeToPx: Record<Size, number> = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 56,
    xxl: 80,
    xxxl: 128,
};

const StyledAvatar = styled(Avatar)(({ theme, size }) => ({
    width: sizeToPx[size ?? "md"],
    height: sizeToPx[size ?? "md"],
    borderRadius: theme.vars.radius[(size as Size) === "xxl" || (size as Size) === "xxxl" ? "xl" : size ?? "md"],
    // zIndex: 7,
}));

export default function UserAvatar({ withStatus, did, avatar, status, size, badgeSx, sx }: Props) {
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
            badgeContent={withStatus ? "" : 0}
        >
            <StyledAvatar
                color="primary"
                variant="solid"
                size={(size ?? "md") as "sm" | "md" | "lg"}
                sx={sx}
                src={avatar ?? "/DefaultAvatar0.png"}
            >
            </StyledAvatar>
        </Badge>
    );
}

export function UserAvatarSkeleton({ size, withStatus, sx }: Pick<Props, "sx" | "size" | "withStatus">) {
    const sizePx = sizeToPx[size ?? "md"];
    const badgeSize = sizePx * 0.25;

    return (
        <Badge
            slotProps={{ badge: { sx: { width: badgeSize, height: badgeSize, zIndex: 24 } } }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            badgeInset={badgeSize / 2}
            color="neutral"
            variant="solid"
            size={
                size
                ? availableBadgeSizes.includes(size)
                ? size as "sm" | "md" | "lg"
                : "lg"
                : "md"}
            badgeContent={withStatus ? "" : 0}
            sx={{ zIndex: 4, }}
        >
            <StyledAvatar size={(size ?? "md") as "sm" | "md" | "lg"} sx={sx}>
                <Skeleton loading />
            </StyledAvatar>
        </Badge>
    );
}