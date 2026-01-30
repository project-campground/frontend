import { Box, List, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from "@mui/joy";
import React from "react";
import { IconCake, IconMapPin } from "@tabler/icons-react";
import Datestamp from "~/components/Datestamp";
import type { ProfileView } from "types/user";

type Props = {
    user: ProfileView;
};

export default class ProfileAbout extends React.Component<Props> {
    render(): React.ReactNode {
        const { user } = this.props;

        return (
            <Box>
                <Typography level="h3" sx={{ mb: 2 }}>About me</Typography>
                <Box>
                    <Typography level="body-md" textColor="neutral.100">{user.description}</Typography>
                </Box>
                <Stack gap={2}>
                    <List>
                        <ListItem>
                            <ListItemDecorator>
                                <IconCake />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography>
                                    Joined{" "}
                                    <Datestamp
                                        displayDate
                                        date={user.createdAt ? new Date(user.createdAt) : new Date()}
                                        dateOptions={{ weekday: "short", year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", }}
                                    />
                                </Typography>
                            </ListItemContent>
                        </ListItem>
                        {user.location && <ListItem>
                            <ListItemDecorator>
                                <IconMapPin />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography>
                                    {user.location}
                                </Typography>
                            </ListItemContent>
                        </ListItem>}
                    </List>
                </Stack>
            </Box>
        )
    }
}