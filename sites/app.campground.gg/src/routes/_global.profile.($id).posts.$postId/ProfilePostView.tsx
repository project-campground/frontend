import { Alert, Box, Stack, } from "@mui/joy";
import { useState } from "react";
import type { EitherProfilePostView, ProfilePostView, ProfilePostViewBasic } from "types/user";
import ProfilePost from "../_global.profile.$id/ProfilePost";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import { useMeContext, useSession } from "~/context/session";
import ProfilePostCreator from "../_global.profile.$id/ProfilePostCreator";
import { ThreadLineItem, ThreadLineWrapper } from "../../components/ThreadLine";
import type { Session } from "~/context/session/types";

type Props = {
    parentPost?: ProfilePostView | undefined | null;
    parentPostDeleted: boolean;
    post: ProfilePostView;
};

type RepliesProps = {
    post: ProfilePostView;
    replies: ProfilePostViewBasic[];
    onReply: (content: string) => Promise<number | null> | undefined;
    onCommentUpdated: (uri: string, content: string) => Promise<void> | undefined;
    onCommentDeleted: (uri: string) => Promise<void> | undefined;
    session: Session;
};

function ProfilePostViewReplies({ session, onReply, onCommentUpdated, onCommentDeleted, replies }: RepliesProps) {
    const me = useMeContext();

    return [
        me &&
            <ThreadLineItem>
                <ProfilePostCreator user={me.profile} onPost={onReply} placeholder="Have something to say?" sx={{ mb: 0.5, mt: 1 }} />
            </ThreadLineItem>,
        replies.length && replies.map((x) => (
            <ThreadLineItem>
                <ProfilePost
                    mt={0.5}
                    mb={0.5}
                    isOwnPost={session.auth.authenticated && session.auth.user.did === x.author.did}
                    onPostUpdate={onCommentUpdated}
                    onPostDelete={onCommentDeleted}
                    key={`comment-${x.uri}`}
                    post={x}
                    showComments
                />
            </ThreadLineItem>
        ))
    ].filter((x) => x);
}

export default function ProfilePostView({ post, parentPost, parentPostDeleted }: Props) {
    const [replies, setReplies] = useState((post as EitherProfilePostView).replies);
    const [currentPost, setCurrentPost] = useState(post);
    const session = useSession();
    const { replyCount } = post as EitherProfilePostView;
    const me = useMeContext();

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
                        {...newPost, author: me?.profile!, replyCount: 0, uri: x.content.uri, indexedAt: new Date().toISOString() },
                        ...replies
                    ]),
                    replyCount ? (post as EitherProfilePostView).replyCount++ : null
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
        <Box sx={{ px: 4 }}>
            <ProfilePost
                showComments
                opacity={0.75}
                isOwnPost={session.auth.authenticated && session.auth.user.did === parentPost.author.did}
                post={parentPost}
                onPostDelete={(uri: string) => onPostDeleted(uri)}
                onPostUpdate={(uri: string, content: string) => onPostUpdated(uri, content)}
            />
        </Box>
    );
    const anyParentPost = deletedParentCard || parentPostIfExists;

    const mainPost = (
        <ProfilePost
            bigger
            isOwnPost={session.auth.authenticated && session.auth.user.did === post.author.did}
            post={currentPost}
            onPostDelete={(uri: string) => onPostDeleted(uri)?.then((ok) => ok && (window.location.href = `profile/${post.author.did}`))}
            onPostUpdate={(uri: string, content: string) => onPostUpdated(uri, content)?.then((ok) => ok && setCurrentPost({ ...post, content }))}
        />
    );

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
                        {anyParentPost}
                        <ThreadLineWrapper>
                            {mainPost}
                            <ProfilePostViewReplies
                                post={post}
                                replies={replies}
                                session={session}
                                onReply={onReply}
                                onCommentUpdated={onCommentUpdated}
                                onCommentDeleted={onCommentDeleted}
                            />
                        </ThreadLineWrapper>
                        <PagePlaceholder sx={{ mt: 8 }} icon={PagePlaceholderIcon.NoMore} title="No more comments">
                            Come back later to see new comments!
                        </PagePlaceholder>
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