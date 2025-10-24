import { Box, Stack, Typography } from "@mui/joy";
import React from "react";
import type { EitherUserPost, User, UserPost } from "types/user";
import ProfileLayout from "./ProfileLayout";
import ProfileFeedPost from "./ProfileFeedPost";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import Link from "~/components/Link";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";

type Props = {
    user: User;
    post: UserPost;
};

export default class ProfilePostView extends React.Component<Props> {
    render(): React.ReactNode {
        const { user, post } = this.props;
        const { replyCount, replies } = post as EitherUserPost;

        return (
            <ProfileLayout user={user}>
                <Stack direction="row" sx={{ flex: 1, display: "grid", gridTemplateColumns: "2fr 7fr 2fr", gap: 8, px: 35, pt: 2 }}>
                    <Box>
                    </Box>
                    <Stack gap={3} sx={{ width: "100%", overflow: "hidden" }}>
                        <Link href={`/profile/${user.did}`}>
                            <Typography level="body-md" fontWeight={900} startDecorator={<IconArrowNarrowLeft />}>Go back to the profile</Typography>
                        </Link>
                        <ProfileFeedPost post={post} />
                        <Stack gap={1}>
                            <Typography id="comments" level="h4">
                                Comments ({replyCount ?? replies.length})
                            </Typography>
                            <Stack gap={1}>
                                {
                                    replies.length
                                    ? replies.map((x) => (
                                        <ProfileFeedPost
                                            key={`comment-${x.uri}`}
                                            post={x}
                                            showCommentsLink
                                        />
                                    ))
                                    : <Typography level="body-md">There are no comments.</Typography>
                                }
                            </Stack>
                            <PagePlaceholder sx={{ mt: 8 }} icon={PagePlaceholderIcon.NoMore} title="No more comments">
                                Come back later to see new comments!
                            </PagePlaceholder>
                        </Stack>
                    </Stack>
                    <Box>
                    </Box>
                </Stack>
            </ProfileLayout>
        )
    }
}