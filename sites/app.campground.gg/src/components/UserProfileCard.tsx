import { AspectRatio, Box, CircularProgress, ListItemContent, ListItemDecorator, MenuItem, MenuList, Sheet, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import type { User } from "types/user";
import UserAvatar from "./UserAvatar";
import { IconSettings2, IconShield, IconUser, IconUserPlus } from "@tabler/icons-react";
import UnstyledLink from "./UnstyledLink";
import { useSession } from "~/session";

type Props = {
    user?: User;
    did: string;
    self?: boolean;
};

export default function UserProfileCard({ did, user, self }: Props) {
    const session = useSession();
    const [fetchedUser, setFetchedUser] = useState(user);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const fetched = await session.restClient?.fetchProfile(did);
            setFetchedUser(fetched?.content!);
        }
        if (!user && !isFetching) {
            setIsFetching(true);
            fetchUser();
        }
    });
    
    if (!fetchedUser)
        return (
            <Stack direction="column" alignItems="center" sx={{ width: 300, px: 1, py: 4 }}>
                <CircularProgress />
            </Stack>
        );

    return (
        <Box sx={{ width: 300, px: 1 }}>
            <Box>
                <AspectRatio ratio={3} sx={(theme) => ({ borderRadius: theme.vars.radius.lg })}>
                    <Sheet color="primary" variant="solid" sx={{ width: "100%", height: "100%", }}>

                    </Sheet>
                </AspectRatio>
            </Box>
            <Box sx={{ mt: -6, px: 1.5 }}>
                <UserAvatar did={fetchedUser.did} size="xl" sx={(theme) => ({ border: `solid 4px ${theme.vars.palette.background.tooltip}` })} />
            </Box>
            <Box sx={{ px: 1.5, py: 1 }}>
                <Stack>
                    <Typography level="title-lg" fontWeight={900}>
                        {fetchedUser.displayName}
                    </Typography>
                    <Typography level="body-md" textColor="text.tertiary">
                        @{fetchedUser.handle.replace("at://", "")}
                    </Typography>
                </Stack>
                <Stack mt={1}>
                    <Typography level="body-sm" textColor="text.tertiary">
                        0 mutual friends {"\u2022"} 0 mutual camps
                    </Typography>
                </Stack>
                <Stack mt={1}>
                    <Typography level="body-lg" textColor="text.secondary">
                        {fetchedUser.tagline}
                    </Typography>
                </Stack>
            </Box>
            <MenuList variant="plain">
                <UnstyledLink to={`/profile/${fetchedUser.did}`}>
                    <MenuItem sx={{ textDecoration: "none" }} variant="plain" href={`/profile/${fetchedUser.did}`}>
                        <ListItemDecorator>
                            <IconUser />
                        </ListItemDecorator>
                        <ListItemContent>
                            View profile
                        </ListItemContent>
                    </MenuItem>
                </UnstyledLink>
                {self
                    ? <>
                        <MenuItem variant="plain">
                            <ListItemDecorator>
                                <IconSettings2 />
                            </ListItemDecorator>
                            <ListItemContent>
                                Settings
                            </ListItemContent>
                        </MenuItem>
                    </>
                    : <>
                        <MenuItem variant="plain">
                            <ListItemDecorator>
                                <IconUserPlus />
                            </ListItemDecorator>
                            <ListItemContent>
                                Add friend
                            </ListItemContent>
                        </MenuItem>
                        <MenuItem variant="plain" color="danger">
                            <ListItemDecorator>
                                <IconShield />
                            </ListItemDecorator>
                            <ListItemContent>
                                Block
                            </ListItemContent>
                        </MenuItem>
                    </>}
            </MenuList>
        </Box>
    );
}