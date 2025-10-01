import { Box, Stack, Typography } from "@mui/joy";
import React from "react";
import ProfileFeedPost from "./ProfileFeedPost";
import { examplePosts } from "~/example/profile";
import type { User } from "types/user";

type Props = {
    user: User;
};

export default class ProfileFeed extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { user } = this.props;
        const posts = examplePosts.map((x) => ({ ...x, author: user, profileUser: user }))

        return (
            <Box>
                <Typography level="h3" sx={{ mb: 2 }}>Feed</Typography>
                <Stack gap={2}>
                    {posts.map((x) =>
                        <ProfileFeedPost
                            key={`post-${x.id}`}
                            linkTitle
                            post={x}
                        />
                    )}
                </Stack>
            </Box>
        )
    }
}