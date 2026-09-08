import { Avatar, Badge, Skeleton, styled } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import type { ProfileStatus } from "types/campground/user";

const availableBadgeSizes = ["sm", "md", "lg"];

type Size = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
type Props = {
    did: string;
    withStatus?: boolean;
    avatar?: string | null;
    status?: ProfileStatus | null;
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

const statusToBadgeColor: Record<ProfileStatus, "success" | "danger" | "warning" | "neutral"> = {
    online: "success",
    donotdisturb: "danger",
    idle: "warning",
    offline: "neutral",
};

const StyledAvatar = styled(Avatar)<{ size?: Size }>(({ theme, size }) => ({
    width: sizeToPx[size ?? "md"],
    height: sizeToPx[size ?? "md"],
    borderRadius: theme.vars.radius[(size as Size) === "xxl" || (size as Size) === "xxxl" ? "xl" : size as "md" ?? "md"],
    // zIndex: 7,
}));

export default function UserAvatar({ withStatus, avatar, status, size, badgeSx, sx }: Props) {
    const sizePx = sizeToPx[size ?? "md"];
    const badgeSize = sizePx * 0.25;

    return (
        <Badge
            slotProps={{ badge: { sx: { width: badgeSize, height: badgeSize, } } }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            badgeInset={badgeSize / 2}
            color={status ? statusToBadgeColor[status] : "success"}
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

export function UserAvatarSkeleton({ size, withStatus, badgeSx, sx }: Pick<Props, "sx" | "badgeSx" | "size" | "withStatus">) {
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
            sx={[{ zIndex: 4, }, ...(Array.isArray(badgeSx) ? badgeSx : [badgeSx])]}
        >
            <StyledAvatar size={(size ?? "md") as "sm" | "md" | "lg"} sx={sx}>
                <Skeleton loading />
            </StyledAvatar>
        </Badge>
    );
}