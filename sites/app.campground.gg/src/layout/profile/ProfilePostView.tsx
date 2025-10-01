import { Box, Stack, Typography } from "@mui/joy";
import React from "react";
import type { User, UserPost, UserPostComment } from "types/user";
import ProfileLayout from "./ProfileLayout";
import ProfileFeedPost from "./ProfileFeedPost";
import ProfileFeedComment from "./ProfileFeedComment";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import Link from "~/components/Link";

type Props = {
    user: User;
    post: UserPost;
    comments: UserPostComment[];
};

export default class ProfilePostView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { user, post, comments } = this.props;

        return (
            <ProfileLayout user={user}>
                <Stack direction="row" sx={{ flex: 1, display: "grid", gridTemplateColumns: "2fr 5fr 2fr", gap: 8, px: 35, pt: 2 }}>
                    <Box>
                    </Box>
                    <Stack gap={3} sx={{ width: "100%", overflow: "hidden" }}>
                        <Link href={`/profile/${user.did}`}>
                            <Typography level="body-md" fontWeight={900} startDecorator={<IconArrowNarrowLeft />}>Go back to the profile</Typography>
                        </Link>
                        <ProfileFeedPost post={post} />
                        <Stack gap={1}>
                            <Typography id="comments" level="h4">
                                Comments ({post.comments})
                            </Typography>
                            <Stack gap={1}>
                                {
                                    comments.length
                                    ? comments.map((x) => (
                                        <ProfileFeedComment
                                            key={`comment-${x.id}`}
                                            comment={x}
                                        />
                                    ))
                                    : <Typography level="body-md">There are no comments.</Typography>
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box>
                    </Box>
                </Stack>
            </ProfileLayout>
        )
    }
}