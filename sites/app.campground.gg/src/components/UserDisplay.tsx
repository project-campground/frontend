import { Dropdown, Menu, MenuButton, Skeleton, Typography } from "@mui/joy";
import UserAvatar, { UserAvatarSkeleton } from "./UserAvatar";
import type { ProfileView } from "types/user";
import UserProfileCard from "./UserProfileCard";
import { Group } from "components";

type Size = "sm" | "md" | "lg";

type Props = {
    user: ProfileView;
    noAvatar?: boolean;
    color?: string;
    size?: Size;
    avatarSize?: Size | "xl";
    showHandle?: boolean;
    alignItems?: "center" | "start" | "end";
    withStatus?: boolean;
};

const sizeToGap: Record<Size, number> = {
    sm: 1,
    md: 1.5,
    lg: 2,
};

export function UserDisplayNoModal({ withStatus, noAvatar, color, user, size, avatarSize, alignItems, showHandle }: Props) {
    const actualSize = size ?? "md";

    return (
        <Group gap={sizeToGap[actualSize]} alignItems={alignItems ?? "center"}>
            {!noAvatar && <UserAvatar withStatus={withStatus} did={user.did} size={avatarSize ?? actualSize} />}
            <Typography level={`title-${actualSize}`} fontWeight={700} sx={(theme) => ({ color: color ?? theme.vars.palette.neutral[100], })}>
                {user.displayName}
            </Typography>
            {
                showHandle && <>
                    <Typography level={`title-${actualSize}`} fontWeight={500} textColor="text.tertiary">@{user.handle.split("/")[2]}</Typography>
                </>
            }
        </Group>
    );
}

export default function UserDisplay(props: Props) {
    return (
        <>
            <Dropdown>
                <MenuButton variant="plain" sx={{ px: 0, py: 0, minHeight: "min-content" }}>
                    <UserDisplayNoModal {...props} />
                </MenuButton>
                <Menu variant="soft">
                    <UserProfileCard
                        did={props.user.did}
                        user={props.user}
                    />
                </Menu>
            </Dropdown>
        </>
    );
}

export function UserDisplaySkeleton({ showHandle, withStatus, noAvatar, size, alignItems, avatarSize }: Pick<Props, "showHandle" | "withStatus" | "noAvatar" | "size" | "alignItems" | "avatarSize">) {    
    const actualSize = size ?? "md";

    return (
        <Group gap={sizeToGap[actualSize]} alignItems={alignItems ?? "center"}>
            {!noAvatar && <UserAvatarSkeleton withStatus={withStatus} size={avatarSize ?? actualSize} />}
            <Typography level={`title-${actualSize}`} fontWeight={700}>
                <Skeleton loading>
                    Example user
                </Skeleton>
            </Typography>
            {
                showHandle && <>
                    <Typography level={`title-${actualSize}`} fontWeight={500} textColor="text.tertiary">
                        <Skeleton loading>
                            @example
                        </Skeleton>
                    </Typography>
                </>
            }
        </Group>
    );
}