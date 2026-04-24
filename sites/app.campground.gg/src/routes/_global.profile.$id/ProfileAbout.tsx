import { Box, List, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from "@mui/joy";
import React from "react";
import { IconCake, IconMapPin } from "@tabler/icons-react";
import Datestamp from "~/components/Datestamp";
import type { ProfileViewBasic } from "types/campground/user";
import MarkdownWrapper from "~/components/markdown/MarkdownWrapper";

type Props = {
    user: ProfileViewBasic;
};

export default class ProfileAbout extends React.Component<Props> {
    render(): React.ReactNode {
        const { user } = this.props;

        return (
            <Box>
                <Typography level="h3" sx={{ mb: 2 }}>About me</Typography>
                <Box>
                    <MarkdownWrapper>
                        {user.description}
                    </MarkdownWrapper>
                </Box>
                <Stack gap={2}>
                    <List>
                        {user.createdAt && <ListItem>
                            <ListItemDecorator>
                                <IconCake />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography>
                                    Joined{" "}
                                    <Datestamp
                                        displayDate
                                        date={new Date(user.createdAt)}
                                        dateOptions={{ weekday: "short", year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", }}
                                    />
                                </Typography>
                            </ListItemContent>
                        </ListItem>}
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