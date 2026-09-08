import { Dropdown, Stack, Menu, MenuButton, Skeleton, Typography, styled } from "@mui/joy";
import UserAvatar, { UserAvatarSkeleton } from "./UserAvatar";
import type { ProfileViewBasic, ProfileViewDetailed, ProfileViewEmpty } from "types/campground/user";
import UserProfileCard from "../layout/UserProfileCard";
import { GradientTypography, Group, TextBlock } from "components";
import type { MemberView } from "types/campground/membership";
import type { RoleMotion } from "types/campground/roles";
import type { RoleView } from "types/campground/roles";
import type { MouseEvent } from "react";

type Size = "sm" | "md" | "lg";

type Props<T extends ProfileViewEmpty> = {
    user: T | Partial<ProfileViewDetailed> & T;
    member?: MemberView<T> | null;
    noAvatar?: boolean;
    motion?: RoleMotion;
    colors?: string[];
    size?: Size;
    avatarSize?: Size | "xl";
    noUsernameDisplay?: boolean;
    showHandle?: boolean;
    align?: "top" | "center" | "bottom";
    noHoverBackground?: boolean;
    withStatus?: boolean;
    campsiteRoles?: RoleView[];
};

const sizeToGap: Record<Size, number> = {
    sm: 1,
    md: 1.5,
    lg: 2,
};

const UserDisplayRoot = styled(Typography)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
}));
const UserDisplayUsername = styled(Stack)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: `0 8px`,
    // flexWrap: "wrap",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

export function UserDisplayNoModal<T extends ProfileViewEmpty>({ onClick,  noUsernameDisplay,withStatus, noAvatar, colors, motion, user, size, avatarSize, align, showHandle, member, }: Props<T> & { onClick?: (ev: MouseEvent<HTMLDivElement>) => unknown; }) {
    const actualSize = size ?? "md";
    return (
        <UserDisplayRoot level="body-md" onClick={onClick}>
            {!noAvatar &&
            <>
                <UserAvatar withStatus={withStatus} did={user.did} status={(user as ProfileViewBasic)?.status} size={avatarSize ?? actualSize} />
            </>
            }
            {!noUsernameDisplay && <UserDisplayUsername alignItems={align}>
                <TextBlock align={align}>
                    <GradientTypography motion={motion ?? "none"} colors={colors} level={`title-${actualSize}`} fontWeight={700}>
                        {member?.nickname ?? (user as ProfileViewBasic)?.displayName ?? user.did}
                    </GradientTypography>
                </TextBlock>
                <wbr />
                {
                    showHandle && <>
                        <TextBlock align={align}>
                            <Typography level={`title-${actualSize}`} fontWeight={500} textColor="text.tertiary">@{user.handle.split("/")[2]}</Typography>
                        </TextBlock>
                    </>
                }
            </UserDisplayUsername>}
        </UserDisplayRoot>
    );
}

export default function UserDisplay<T extends ProfileViewEmpty>(props: Props<T>) {
    return (
        <>
            <Dropdown>
                <MenuButton variant="plain" sx={{ px: 0, py: 0, minHeight: "min-content", ":hover": { backgroundColor: props.noHoverBackground ? "transparent" : undefined } }}>
                    <UserDisplayNoModal {...props} />
                </MenuButton>
                <Menu variant="soft">
                    <UserProfileCard
                        did={props.user.did}
                        user={props.user}
                        member={props.member}
                        campsiteRoles={props.campsiteRoles}
                    />
                </Menu>
            </Dropdown>
        </>
    );
}

export function UserDisplaySkeleton({ showHandle, withStatus, noAvatar, size, alignItems, avatarSize }: Pick<Props<ProfileViewEmpty>, "showHandle" | "withStatus" | "noAvatar" | "size" | "alignItems" | "avatarSize">) {    
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