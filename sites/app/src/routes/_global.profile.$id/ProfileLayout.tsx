import { Skeleton, Box, Stack, Typography, styled } from "@mui/joy";
import React, { type ReactNode } from "react";
import UserAvatar, { UserAvatarSkeleton } from "~/components/UserAvatar";
import VerifiedIcon from "~/components/VerifiedIcon";
import type { ProfileViewDetailed } from "types/campground/user";
import { Group, loremIpsum } from "@campground/ui";
import { UserHeaderBanner } from "~/components/users/UserHeader";

type Props = {
    user: ProfileViewDetailed;
    children: ReactNode[] | ReactNode;
};

const ProfileLayoutRoot = styled(Box, {
    name: "ProfileLayout",
    slot: "root",
})(({ theme }) => ({
    overflowY: "auto",
    flex: 1,
    gridColumn: "3 / 4",
    scrollSnapAlign: "start",
    [theme.breakpoints.up("lg")]: {
        gridColumn: "1 / 4",
    }
}));
const ProfileLayoutContainer = styled(Stack, {
    name: "ProfileLayout",
    slot: "container",
})(({ theme }) => ({
    minHeight: "100%",
    paddingBottom: theme.spacing(16),
    backgroundColor: theme.vars.palette.background.level1,
}));
const ProfileLayoutHeader = styled(Stack, {
    name: "ProfileLayout",
    slot: "header",
})(({ theme }) => ({
    alignItems: "center",
    marginTop: theme.spacing(-8),
    marginBottom: theme.spacing(2),
    gap: theme.spacing(1),
}));

export default class ProfileLayout extends React.Component<Props> {
    render(): React.ReactNode {
        const { user, children } = this.props;

        return (
            <ProfileLayoutRoot>
                <ProfileLayoutContainer>
                    <Box sx={{ px: 2, py: 2, overflow: "hidden" }}>
                        <UserHeaderBanner did={user.did} aspectRatio={8} src={user.banner} borderRadius="md" />
                    </Box>
                    <ProfileLayoutHeader>
                        <UserAvatar withStatus did={user.did} size="xxxl" badgeSx={{ "--Badge-ringSize": "4px" }} sx={(theme) => ({ border: `solid 4px ${theme.vars.palette.background.level1}` })} />
                        <Stack gap={0} alignItems="center">
                            <Group gap={1} alignItems="center">
                                <Typography level="h2">{user.displayName}</Typography>
                                <VerifiedIcon size="md" />
                            </Group>
                            <Typography level="body-md" textColor="neutral.200">@{user.handle.replace("at://", "")}</Typography>
                            <Typography level="body-lg" textColor="neutral.100">{user.tagline}</Typography>
                        </Stack>
                    </ProfileLayoutHeader>
                    <Box className="ProfileLayout body">
                        { children }
                    </Box>
                </ProfileLayoutContainer>
            </ProfileLayoutRoot>
        )
    }
}

export function ProfileLayoutSkeleton({ children }: React.PropsWithChildren) {
    return (
        <ProfileLayoutRoot>
            <ProfileLayoutContainer>
                <Box sx={{ px: 2, py: 2, overflow: "hidden" }}>
                    <UserHeaderBanner isLoading aspectRatio={8} did="did:null" borderRadius="md" />
                </Box>
                <ProfileLayoutHeader>
                    <UserAvatarSkeleton withStatus size="xxxl" badgeSx={{ "--Badge-ringSize": "4px" }} sx={(theme) => ({ border: `solid 4px ${theme.vars.palette.background.level1}` })} />
                    <Stack gap={0} alignItems="center">
                        <Group gap={1} alignItems="center">
                            <Typography level="h2">
                                <Skeleton loading>
                                    {loremIpsum.sm}
                                </Skeleton>
                            </Typography>
                            <VerifiedIcon size="md" />
                        </Group>
                        <Typography level="body-md" textColor="neutral.200">
                            <Skeleton loading>
                                @handle.invalid
                            </Skeleton>
                        </Typography>
                        <Typography level="body-lg" textColor="neutral.100">
                            <Skeleton loading>
                                {loremIpsum.sm}
                            </Skeleton>
                        </Typography>
                    </Stack>
                </ProfileLayoutHeader>
                <Box className="ProfileLayout body">
                    { children }
                </Box>
            </ProfileLayoutContainer>
        </ProfileLayoutRoot>
        
    );
}