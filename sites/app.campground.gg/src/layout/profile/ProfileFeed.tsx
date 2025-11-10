import { Box, Stack, Typography } from "@mui/joy";
import ProfileFeedPost from "./ProfileFeedPost";
import type { User, UserPostBasic } from "types/user";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import ProfilePostCreator from "~/layout/profile/ProfilePostCreator";
import { useSession } from "~/session";
import { useState } from "react";

type Props = {
    user: User;
    isSelf: boolean;
    posts: UserPostBasic[];
};

export default function ProfileFeed({ user, posts, isSelf }: Props) {
    const session = useSession();
    const [postList, setPostList] = useState<UserPostBasic[]>(posts);

    const onPostCreated = (content: string) => {
        const newPost = {
            content,
            tags: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        return session.restClient?.createPost(newPost)
            .then((x) => setPostList([{ ...newPost, author: user, replyCount: 0, uri: x.content!.uri, indexedAt: new Date().toISOString() } satisfies UserPostBasic, ...posts]))
            .catch((e) => console.error("Got an error while making a post", e));
    }
    const onPostDeleted = (uri: string) => {
        return session.restClient?.deletePost(uri)
            .then(() => setPostList(postList.filter((x) => x.uri != uri)))
            .catch((e) => console.error("Got an error while deleting a post", e));
    };
    const onPostUpdated = (uri: string, content: string) => {
        return session.restClient?.updatePost(uri, { content })
            .then(() => {
                const postIndex = postList.findIndex((x) => x.uri === uri);
                if (postIndex < 0)
                    return;

                // Update post in post list
                const post = postList[postIndex];
                setPostList([...postList.slice(0, postIndex), { ...post, content }, ...postList.slice(postIndex + 1) ])
            })
            .catch((e) => console.error("Got an error while editing a post", e));
    };

    return (
        <Box>
            <Typography level="h3" sx={{ mb: 2 }}>Feed</Typography>
            {session.restClient && isSelf && <ProfilePostCreator user={user} onPost={onPostCreated} sx={{ mb: 2 }} />}
            <Stack gap={2}>
                {postList.map((x, i) =>
                    <ProfileFeedPost
                        isOwnPost={isSelf}
                        onPostDelete={onPostDeleted}
                        onPostUpdate={onPostUpdated}
                        appear={Boolean(posts.length && !i)}
                        key={`post-${x.uri}`}
                        showComments
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