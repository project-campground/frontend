import { Box, Stack, Typography } from "@mui/joy";
import React from "react";
import ProfileFeedPost from "./ProfileFeedPost";
import type { User, UserPostBasic } from "types/user";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import PostInput from "~/components/markdown/PostInput";

type Props = {
    user: User;
    isSelf: boolean;
    posts: UserPostBasic[] | undefined;
};

export default class ProfileFeed extends React.Component<Props> {
    render(): React.ReactNode {
        const { user, posts, isSelf } = this.props;

        return (
            <Box>
                <Typography level="h3" sx={{ mb: 2 }}>Feed</Typography>
                {isSelf && <PostInput user={user} sx={{ mb: 2 }} />}
                <Stack gap={2}>
                    {posts?.map((x) =>
                        <ProfileFeedPost
                            key={`post-${x.uri}`}
                            showCommentsLink
                            post={x}
                        />
                    )}
                </Stack>
                <PagePlaceholder sx={{ mt: 8 }} icon={PagePlaceholderIcon.NoMore} title="No more posts">
                    This user has no more posts to be found! Come back later!
                </PagePlaceholder>
            </Box>
        );
    }
}