import { AspectRatio, Box, ListItemContent, ListItemDecorator, MenuItem, MenuList, Sheet, Stack, Typography } from "@mui/joy";
import React from "react";
import type { User } from "types/user";
import UserAvatar from "./UserAvatar";
import { IconSettings2, IconShield, IconUser, IconUserPlus } from "@tabler/icons-react";
import UnstyledLink from "./UnstyledLink";

type Props = {
    user: User;
    self?: boolean;
};

export default class UserProfileCard extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { user, self } = this.props;

        return (
            <Box sx={{ width: 300, px: 1 }}>
                <Box>
                    <AspectRatio ratio={3} sx={(theme) => ({ borderRadius: theme.vars.radius.lg })}>
                        <Sheet color="primary" variant="solid" sx={{ width: "100%", height: "100%", }}>

                        </Sheet>
                    </AspectRatio>
                </Box>
                <Box sx={{ mt: -6, px: 1.5 }}>
                    <UserAvatar did={user.did} size="xl" sx={(theme) => ({ border: `solid 4px ${theme.vars.palette.background.tooltip}` })} />
                </Box>
                <Box sx={{ px: 1.5, py: 1 }}>
                    <Stack>
                        <Typography level="title-lg" fontWeight={900}>
                            {user.displayName}
                        </Typography>
                        <Typography level="body-md" textColor="text.tertiary">
                            @{user.handle}
                        </Typography>
                    </Stack>
                    <Stack mt={1}>
                        <Typography level="body-sm" textColor="text.tertiary">
                            0 mutual friends {"\u2022"} 0 mutual camps
                        </Typography>
                    </Stack>
                    <Stack mt={1}>
                        <Typography level="body-lg" textColor="text.secondary">
                            {user.tagline}
                        </Typography>
                    </Stack>
                </Box>
                <MenuList variant="plain">
                    <UnstyledLink to={`/profile/${user.did}`}>
                        <MenuItem sx={{ textDecoration: "none" }} variant="plain" href={`/profile/${user.did}`}>
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
}