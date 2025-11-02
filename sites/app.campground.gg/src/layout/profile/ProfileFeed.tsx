import { Box, Stack, Typography } from "@mui/joy";
import ProfileFeedPost from "./ProfileFeedPost";
import type { User, UserPostBasic } from "types/user";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import PostInput from "~/components/editor/PostInput";
import { useSession } from "~/session";
import { useState } from "react";

type Props = {
    user: User;
    isSelf: boolean;
    posts: UserPostBasic[] | undefined;
};

export default function ProfileFeed({ user, posts, isSelf }: Props) {
    const session = useSession();
    const [newPosts, setNewPosts] = useState<UserPostBasic[]>([]);

    const onPostCreated = (content: string) => {
        const newPost = {
            content,
            tags: ["Test tag", "tag"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        return session.restClient?.createPost(newPost)
            .then((x) => setNewPosts([{ ...newPost, author: user, replyCount: 0, uri: x.content!.uri, indexedAt: new Date().toISOString() } satisfies UserPostBasic, ...newPosts]))
            .catch((e) => console.error("Got an error while making a post", e));
    }

    return (
        <Box>
            <Typography level="h3" sx={{ mb: 2 }}>Feed</Typography>
            {session.restClient && isSelf && <PostInput user={user} onPost={onPostCreated} sx={{ mb: 2 }} />}
            <Stack gap={2}>
                {newPosts.concat(posts ?? []).map((x) =>
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