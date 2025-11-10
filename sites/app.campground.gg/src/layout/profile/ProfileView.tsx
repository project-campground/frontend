import { Box, Stack } from "@mui/joy";
import React from "react";
import ProfileFeed from "./ProfileFeed";
import ProfileAbout from "./ProfileAbout";
import type { User, UserPostBasic } from "types/user";
import ProfileGames from "./ProfileGames";
import ProfileLayout from "./ProfileLayout";

type Props = {
    user: User;
    posts: UserPostBasic[];
    isSelf: boolean;
};

export default class ProfileView extends React.Component<Props> {
    render(): React.ReactNode {
        const { user, posts, isSelf } = this.props;

        return (
            <ProfileLayout user={user}>
                <Stack direction="row" sx={{ flex: 1, display: "grid", gridTemplateColumns: "2fr 7fr 2fr", gap: 8, px: 35 }}>
                    <Box>
                        <ProfileGames user={user} />
                    </Box>
                    <Box sx={{ width: "100%", overflow: "hidden" }}>
                        <ProfileFeed user={user} posts={posts} isSelf={isSelf} />
                    </Box>
                    <Box>
                        <ProfileAbout user={user} />
                    </Box>
                </Stack>
            </ProfileLayout>
        )
    }
}