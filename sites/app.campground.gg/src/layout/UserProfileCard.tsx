import { Box, ListItemContent, ListItemDecorator, MenuItem, MenuList, Skeleton, Stack, styled, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import type { ProfileViewDetailed, ProfileViewEmpty } from "types/campground/user";
import { IconLogout2, IconSettingsFilled, IconShieldFilled, IconUserFilled, IconUserPlus } from "@tabler/icons-react";
import { useSession } from "~/context/session";
import { useAccount } from "~/context/account";
import { useNavigate } from "react-router";
import type { MemberView } from "types/campground/membership";
import type { RoleView } from "types/campground/roles";
import ContentCategory from "../components/content/ContentCategory";
import RoleDisplay from "../components/campsite/RoleDisplay";
import { Group } from "components";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import UserHeader from "~/components/users/UserHeader";
import { useCampsiteContext } from "~/routes/_global._campsite/context";

type Props<T extends ProfileViewEmpty> = {
    user?: Partial<ProfileViewDetailed> & T;
    member?: MemberView<T> | null;
    campsiteRoles?: RoleView[];
    did: string;
};

const UserProfileCardWrapper = styled(Box)(() => ({
    // - side padding - side border
    width: 320 - 12 - 2,
}));

export default function UserProfileCard<T extends ProfileViewEmpty>({ did, user, member, campsiteRoles }: Props<T>) {
    const session = useSession();
    const account = useAccount();
    const campsite = useCampsiteContext();
    const [fetchedUser, setFetchedUser] = useState<(Partial<ProfileViewDetailed> & T) | undefined>(user);
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const fetched = await campsite?.api.profiles.get(did);
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
            <UserHeader did={did} isLoading={isLoading} avatar={fetchedUser?.avatar} banner={fetchedUser?.banner} status={fetchedUser?.status} />
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
                            0 mutual friends {"\u2022"} 0 mutual campsites
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
                <ContentCategory header={<FormattedMessageGlobal id="app.roles" />}>
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
                                <FormattedMessage
                                    id="app.actors.viewProfile"
                                    defaultMessage="View profile"
                                    description="Menu button for viewing user's profile"
                                />
                            </Skeleton>
                        </Typography>
                    </ListItemContent>
                </MenuItem>
                {session.auth.authenticated && session.auth.user.did === did && account?.authenticated
                    ? <>
                        <MenuItem variant="plain" onClick={account.openUserSettings}>
                            <ListItemDecorator>
                                <IconSettingsFilled />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography textColor="inherit">
                                    <Skeleton loading={isLoading}>
                                        <FormattedMessage
                                            id="app.settings"
                                            defaultMessage="Settings"
                                            description="Menu button for settings, as well as settings title"
                                        />
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
                                        <FormattedMessageGlobal id="form.logout" />
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
                                        <FormattedMessage
                                            id="app.actors.addFriend"
                                            defaultMessage="Add friend"
                                            description="Menu button for adding user as a friend"
                                        />
                                    </Skeleton>
                                </Typography>
                            </ListItemContent>
                        </MenuItem>
                        <MenuItem variant="plain" color="danger">
                            <ListItemDecorator>
                                <IconShieldFilled />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography textColor="inherit">
                                    <Skeleton loading={isLoading}>
                                        <FormattedMessage
                                            id="app.actors.block"
                                            defaultMessage="Block"
                                            description="Menu button for blocking the user"
                                        />
                                    </Skeleton>
                                </Typography>
                            </ListItemContent>
                        </MenuItem>
                    </>}
            </MenuList>
        </UserProfileCardWrapper>
    );
}