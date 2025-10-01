import { Box, Stack, Typography } from "@mui/joy";
import React from "react";
import ProfileFeed from "./ProfileFeed";
import ProfileAbout from "./ProfileAbout";
import type { User } from "types/user";
import ProfileLayout from "./ProfileLayout";

type Props = {
    user: User;
};

export default class ProfileView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { user } = this.props;

        return (
            <ProfileLayout user={user}>
                <Stack direction="row" sx={{ flex: 1, display: "grid", gridTemplateColumns: "2fr 5fr 2fr", gap: 8, px: 35 }}>
                    <Box>
                        <Typography level="h3">Games</Typography>
                    </Box>
                    <Box sx={{ width: "100%", overflow: "hidden" }}>
                        <ProfileFeed user={user} />
                    </Box>
                    <Box>
                        <ProfileAbout user={user} />
                    </Box>
                </Stack>
            </ProfileLayout>
        )
    }
}