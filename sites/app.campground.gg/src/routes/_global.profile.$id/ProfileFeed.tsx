import { Box, Stack, Tabs } from "@mui/joy";
import type { ProfileViewEmpty, ProfilePostViewParented } from "types/campground/user";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/pages/PagePlaceholder";
import ProfilePostCreator from "~/routes/_global.profile.$id/ProfilePostCreator";
import { useSession } from "~/context/session";
import { useEffect, useState } from "react";
import ProfileFeedPost, { ProfileFeedPostReplySkeleton } from "./ProfileFeedPost";
import { IconArticleFilled, IconFlameFilled } from "@tabler/icons-react";
import HTTPError from "~/util/HTTPError";
import { ProfilePostSkeleton } from "./ProfilePost";
import { SmoothTabList } from "components";
import { useAccount } from "~/context/account";
import { FormattedMessage } from "react-intl";

type Props = {
    user: ProfileViewEmpty;
};

export default function ProfileFeed({ user }: Props) {
    const session = useSession();
    const account = useAccount<true>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fetchReplies, setFetchReplies] = useState<boolean>(false);
    const [postList, setPostList] = useState<ProfilePostViewParented[]>([]);
    const [error, setError] = useState<HTTPError | null>(null);
    const isSelf = session.auth.authenticated && session.auth.user.did === user.did;

    useEffect(() => {
        setIsLoading(true);
        session.atproto.profilePostRecords.getMany(user.did, fetchReplies)
            .then((posts) => {
                if (!posts.ok)
                    return setError(new HTTPError(posts.errorDescription, posts.status, posts.errorHeader));
                
                setPostList(posts.content.posts);
                setIsLoading(false);
            });
    }, [fetchReplies]);

    const onPostCreated = (content: string) => {
        const newPost = {
            content,
            tags: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        return session.atproto.profilePostRecords.create(newPost)
            .then((x) => setPostList([{ ...newPost, author: user, replyCount: 0, uri: x.content!.uri, indexedAt: new Date().toISOString(), parent: null } satisfies ProfilePostViewParented, ...postList]))
            .catch((e) => console.error("Got an error while making a post", e));
    }
    const onPostDeleted = (uri: string) => {
        return session.atproto.profilePostRecords.delete(uri)
            .then(() => setPostList(postList.filter((x) => x.uri != uri)))
            .catch((e) => console.error("Got an error while deleting a post", e));
    };
    const onPostUpdated = (uri: string, content: string) => {
        return session.atproto.profilePostRecords.update(uri, { content })
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

    if (error?.status === 404)
        return (
            <PagePlaceholder icon={PagePlaceholderIcon.NotFound} title={
                <FormattedMessage
                    id="app.profiles.deactivated.header"
                    defaultMessage="Profile does not exist"
                    description="Deactivated account profile error header"
                />
            }>
                <FormattedMessage
                    id="app.profiles.deactivated.description"
                    defaultMessage="The user has deactivated their account or profile does not exist."
                    description="Deactivated account profile error description"
                />
            </PagePlaceholder>
        );

    return (
        <Box sx={{ px: 2 }}>
            {/* <Typography level="h3" sx={{ mb: 2 }}>Feed</Typography> */}
            <Tabs onChange={(_, v) => setFetchReplies(Boolean(v))} size="lg" sx={{ mb: 2 }}>
                <SmoothTabList tabs={[
                    {
                        id: 0,
                        name: "Feed",
                        startDecorator: <IconFlameFilled />,
                    },
                    {
                        id: 1,
                        name: "Posts & Replies",
                        startDecorator: <IconArticleFilled />,
                    },
                ]} />
            </Tabs>
            {
                isLoading
                ? <>
                    <Stack gap={2}>
                        <ProfileFeedPostReplySkeleton />
                        <ProfilePostSkeleton />
                        <ProfilePostSkeleton />
                        <ProfilePostSkeleton />
                        <ProfileFeedPostReplySkeleton />
                        <ProfilePostSkeleton />
                        <ProfilePostSkeleton />
                    </Stack>
                </>
                : <>
                    {!fetchReplies && isSelf && (account.account.active || typeof account.account.active === "undefined") && <ProfilePostCreator user={user} onPost={onPostCreated} sx={{ mb: 2 }} />}
                    <Stack gap={2}>
                        {postList.map((x, i) =>
                            <ProfileFeedPost
                                isOwnPost={isSelf}
                                onPostDelete={onPostDeleted}
                                onPostUpdate={onPostUpdated}
                                appear={Boolean(!i)}
                                key={`post-${x.uri}`}
                                post={x}
                            />
                        )}
                    </Stack>
                    <PagePlaceholder sx={{ mt: 8 }} icon={PagePlaceholderIcon.NoMore} title="No more posts">
                        This user has no more posts to be found! Come back later!
                    </PagePlaceholder>
                </>
            }
        </Box>
    );
}