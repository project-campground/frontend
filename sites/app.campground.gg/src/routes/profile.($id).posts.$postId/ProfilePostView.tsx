import { Alert, Box, Stack, } from "@mui/joy";
import { useState } from "react";
import type { EitherUserPost, User, UserPost } from "types/user";
import ProfileFeedPost from "../../layout/profile/ProfileFeedPost";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import { useSession } from "~/session";
import ProfilePostCreator from "../../layout/profile/ProfilePostCreator";
import PostParentLine from "./PostParentLine";

type Props = {
    currentUser: User | null;
    parentPost?: UserPost | undefined | null;
    parentPostDeleted: boolean;
    post: UserPost;
};

export default function ProfilePostView({ currentUser: user, post, parentPost, parentPostDeleted }: Props) {
    const [replies, setReplies] = useState((post as EitherUserPost).replies);
    const [currentPost, setCurrentPost] = useState(post);
    const session = useSession();
    const { replyCount } = post as EitherUserPost;

    const onReply = (content: string) => {
        const newPost = {
            parentUri: post.uri,
            content,
            tags: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        return session.restClient?.createPost(newPost)
            .then((x) =>
                x.ok
                ? (
                    setReplies([
                        {...newPost, author: user!, replyCount: 0, uri: x.content.uri, indexedAt: new Date().toISOString() },
                        ...replies
                    ]),
                    replyCount ? (post as EitherUserPost).replyCount++ : null
                )
                : null
            );
    }

    const onPostDeleted = (uri: string) =>
        session.restClient?.deletePost(uri)
            .then((x) => x.ok)
            .catch((e) => (console.error("Got an error while deleting a post", e), false));
    const onPostUpdated = (uri: string, content: string) =>
        session.restClient?.updatePost(uri, { content })
            .then((x) => x.ok)
            .catch((e) => (console.error("Got an error while editing a post", e), false));

    const onCommentDeleted = (uri: string) =>
        onPostDeleted(uri)
            ?.then(() => setReplies(replies.filter((x) => x.uri != uri)));
    const onCommentUpdated = (uri: string, content: string) =>
        onPostUpdated(uri, content)
            ?.then(() => {
                const postIndex = replies.findIndex((x) => x.uri === uri);
                if (postIndex < 0)
                    return;

                // Update post in post list
                const post = replies[postIndex];
                setReplies([...replies.slice(0, postIndex), { ...post, content }, ...replies.slice(postIndex + 1) ])
            });

    const deletedParentCard = parentPostDeleted && (
        <Alert startDecorator={<IconExclamationCircleFilled />}>
            This post has been deleted by the author.
        </Alert>
    );
    const parentPostIfExists = parentPost && (
        <ProfileFeedPost
            showComments
            isOwnPost={session.auth.authenticated && session.auth.user.did === parentPost.author.did}
            post={parentPost}
            onPostDelete={(uri: string) => onPostDeleted(uri)}
            onPostUpdate={(uri: string, content: string) => onPostUpdated(uri, content)}
        />
    );
    const mainPost = (
        <ProfileFeedPost
            bigger
            isOwnPost={session.auth.authenticated && session.auth.user.did === post.author.did}
            post={currentPost}
            onPostDelete={(uri: string) => onPostDeleted(uri)?.then((ok) => ok && (window.location.href = `profile/${post.author.did}`))}
            onPostUpdate={(uri: string, content: string) => onPostUpdated(uri, content)?.then((ok) => ok && setCurrentPost({ ...post, content }))}
        />
    );

    const replyPadding = parentPostDeleted || parentPostIfExists ? 5 : 0;

    return (
        <Box sx={{ overflowY: "scroll", flex: 1, width: "100%" }}>
            <Stack className="ProfileLayout container" sx={(theme) => ({ pt: 4, minHeight: "100%", pb: 16, backgroundColor: theme.vars.palette.background.level1 })}>
                <Stack direction="row" sx={{ flex: 1, display: "grid", gridTemplateColumns: "2fr 7fr 2fr", gap: 8, px: 35, pt: 2 }}>
                    <Box>
                    </Box>
                    <Stack gap={2} sx={{ width: "100%", overflow: "hidden" }}>
                        {/* <Link href={`/profile/${post.author.did}`}>
                            <Typography level="body-md" fontWeight={900} startDecorator={<IconArrowNarrowLeft />}>View user profile</Typography>
                        </Link> */}
                        {deletedParentCard || parentPostIfExists}
                        {deletedParentCard || parentPostIfExists ? <PostParentLine>{mainPost}</PostParentLine> : mainPost}
                        <Stack gap={1}>
                            {/* <Typography id="comments" level="h4">
                                Comments ({replyCount ?? replies.length})
                            </Typography> */}
                            {user &&
                                <PostParentLine leftPadding={replyPadding}>
                                    <ProfilePostCreator user={user} onPost={onReply} placeholder="Have to something to say?" />
                                </PostParentLine>
                            }
                            <Stack gap={1}>
                                {
                                    replies.length
                                    ? replies.map((x) => (
                                        <PostParentLine leftPadding={replyPadding}>
                                            <ProfileFeedPost
                                                isOwnPost={session.auth.authenticated && session.auth.user.did === x.author.did}
                                                onPostUpdate={onCommentUpdated}
                                                onPostDelete={onCommentDeleted}
                                                key={`comment-${x.uri}`}
                                                post={x}
                                                showComments
                                            />
                                        </PostParentLine>
                                    ))
                                    : <></>
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
            </Stack>
        </Box>
        // <ProfileLayout user={post.author}>
        // </ProfileLayout>
    );
}