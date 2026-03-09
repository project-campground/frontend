import { AspectRatio, Box, ListItemContent, ListItemDecorator, MenuItem, MenuList, Skeleton, Stack, styled, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import type { ProfileView } from "types/user";
import UserAvatar, { UserAvatarSkeleton } from "../components/UserAvatar";
import { IconLogout2, IconSettingsFilled, IconShield, IconUserFilled, IconUserPlus } from "@tabler/icons-react";
import { useSession } from "~/context/session";
import { useNavigate } from "react-router";
import type { CampsiteMemberView, CampsiteRoleView } from "types/campsites";
import ContentCategory from "../components/content/ContentCategory";
import RoleDisplay from "../components/campsite/RoleDisplay";
import { Group } from "components";
import GradientBanner from "../components/pages/GradientBanner";

type Props<T extends ProfileView> = {
    user?: ProfileView;
    member?: CampsiteMemberView<T> | null;
    campsiteRoles?: CampsiteRoleView[];
    did: string;
};

const UserProfileCardWrapper = styled(Box)(() => ({
    width: 320,
    padding: `0 8px`,
}));

export default function UserProfileCard<T extends ProfileView>({ did, user, member, campsiteRoles }: Props<T>) {
    const session = useSession();
    const [fetchedUser, setFetchedUser] = useState(user);
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const fetched = await session.http.fetchProfile(did);
            setFetchedUser(fetched?.content!);
        }
        if (!user && !isFetching) {
            setIsFetching(true);
            fetchUser();
        }
    });

    const isLoading = !fetchedUser;

    const roles = member && campsiteRoles ? campsiteRoles?.filter((x) => member?.roles.includes(x.id)) : null;

    return (
        <UserProfileCardWrapper>
            <Box>
                <AspectRatio ratio={3} sx={{ borderRadius: "sm" }}>
                    {isLoading
                    ? <Skeleton loading sx={{ zIndex: 0 }}>
                    </Skeleton>
                    : <GradientBanner color="primary" sx={{ zIndex: "inherit", width: "100%", height: "100%", }}>

                    </GradientBanner>}
                </AspectRatio>
            </Box>
            <Box sx={{ mt: -6, px: 1.5, zIndex: 2 }}>
                {isLoading
                ? <UserAvatarSkeleton withStatus size="xxl" sx={(theme) => ({ border: `solid 4px ${theme.vars.palette.background.level2}` })} />
                : <UserAvatar withStatus did={fetchedUser!.did} size="xxl" sx={(theme) => ({ border: `solid 4px ${theme.vars.palette.background.level2}` })} />}
            </Box>
            <Box sx={{ px: 1.5, py: 1 }}>
                <Stack>
                    <Typography level="title-lg" fontWeight={900}>
                        <Skeleton loading={isLoading}>
                            {fetchedUser?.displayName ?? "Loading User"}
                        </Skeleton>
                    </Typography>
                    <Typography level="body-md" textColor="text.tertiary">
                        <Skeleton loading={isLoading}>
                            @{fetchedUser?.handle.replace("at://", "") ?? "loading_user"}
                        </Skeleton>
                    </Typography>
                </Stack>
                <Stack mt={1}>
                    <Typography level="body-sm" textColor="text.tertiary">
                        <Skeleton loading={isLoading}>
                            0 mutual friends {"\u2022"} 0 mutual camps
                        </Skeleton>
                    </Typography>
                </Stack>
                <Stack mt={1}>
                    <Typography level="body-lg" textColor="text.secondary">
                        <Skeleton loading={isLoading}>
                            {isLoading ? "Loading tagline" : fetchedUser?.tagline}
                        </Skeleton>
                    </Typography>
                </Stack>
            </Box>
            {roles && <Stack sx={{ mb: 1 }} gap={2}>
                <ContentCategory header={"Roles"}>
                    <Group wrap gap={1}>
                        {roles.map((role) =>
                            <RoleDisplay key={role.id} role={role}/>
                        )}
                    </Group>
                </ContentCategory>
            </Stack>}
            <MenuList variant="plain">
                <MenuItem variant="plain" onClick={() => navigate(`/profile/${did}`)}>
                    <ListItemDecorator>
                        <IconUserFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        <Typography textColor="inherit">
                            <Skeleton loading={isLoading}>
                                View profile
                            </Skeleton>
                        </Typography>
                    </ListItemContent>
                </MenuItem>
                {session.auth.authenticated && session.auth.user.did === did
                    ? <>
                        <MenuItem variant="plain">
                            <ListItemDecorator>
                                <IconSettingsFilled />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography textColor="inherit">
                                    <Skeleton loading={isLoading}>
                                        Settings
                                    </Skeleton>
                                </Typography>
                            </ListItemContent>
                        </MenuItem>
                        <MenuItem variant="plain" color="danger" onClick={() => session.logout()}>
                            <ListItemDecorator>
                                <IconLogout2 />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography textColor="inherit">
                                    <Skeleton loading={isLoading}>
                                        Logout
                                    </Skeleton>
                                </Typography>
                            </ListItemContent>
                        </MenuItem>
                    </>
                    : <>
                        <MenuItem variant="plain">
                            <ListItemDecorator>
                                <IconUserPlus />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography textColor="inherit">
                                    <Skeleton loading={isLoading}>
                                        Add friend
                                    </Skeleton>
                                </Typography>
                            </ListItemContent>
                        </MenuItem>
                        <MenuItem variant="plain" color="danger">
                            <ListItemDecorator>
                                <IconShield />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography textColor="inherit">
                                    <Skeleton loading={isLoading}>
                                        Block
                                    </Skeleton>
                                </Typography>
                            </ListItemContent>
                        </MenuItem>
                    </>}
            </MenuList>
        </UserProfileCardWrapper>
    );
}