import { Dropdown, Menu, MenuButton, Skeleton, Typography } from "@mui/joy";
import UserAvatar, { UserAvatarSkeleton } from "./UserAvatar";
import type { ProfileView } from "types/user";
import UserProfileCard from "./UserProfileCard";
import { GradientTypography, Group } from "components";
import type { CampsiteMemberView } from "types/campsites";
import type { MouseEvent } from "react";

type Size = "sm" | "md" | "lg";

type Props<T extends ProfileView> = {
    user: T;
    member?: CampsiteMemberView<T>;
    noAvatar?: boolean;
    colors?: string[];
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

export function UserDisplayNoModal<T extends ProfileView>({ onClick, withStatus, noAvatar, colors, user, size, avatarSize, alignItems, showHandle, member, }: Props<T> & { onClick?: (ev: MouseEvent<HTMLDivElement>) => unknown; }) {
    const actualSize = size ?? "md";
    return (
        <Group gap={sizeToGap[actualSize]} alignItems={alignItems ?? "center"} onClick={onClick}>
            {!noAvatar && <UserAvatar withStatus={withStatus} did={user.did} size={avatarSize ?? actualSize} />}
            <GradientTypography animated colors={colors} level={`title-${actualSize}`} fontWeight={700} sx={(theme) => ({ background: colors ? undefined : `${theme.vars.palette.text.secondary} text` })}>
                {member?.nickname ?? user.displayName}
            </GradientTypography>
            {
                showHandle && <>
                    <Typography level={`title-${actualSize}`} fontWeight={500} textColor="text.tertiary">@{user.handle.split("/")[2]}</Typography>
                </>
            }
        </Group>
    );
}

export default function UserDisplay<T extends ProfileView>(props: Props<T>) {
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

export function UserDisplaySkeleton({ showHandle, withStatus, noAvatar, size, alignItems, avatarSize }: Pick<Props<ProfileView>, "showHandle" | "withStatus" | "noAvatar" | "size" | "alignItems" | "avatarSize">) {    
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