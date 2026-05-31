import { useEffect, useState } from "react";
import type {
    ProfilePostView,
    ProfilePostViewBasic,
} from "types/campground/user";
import ProfilePost from "../_global.profile.$id/ProfilePost";
import { useSession } from "~/context/session";
import {
    useAccount,
    type AccountContextAuthenticated,
} from "~/context/account";
import ProfilePostCreator from "../_global.profile.$id/ProfilePostCreator";
import { ThreadLineItem } from "../../lib/components/ThreadLine";

type RepliesProps = {
    post: ProfilePostView;
    topReplies: ProfilePostViewBasic[];
};

export default function ProfilePostViewReplies({
    post,
    topReplies,
}: RepliesProps) {
    const account = useAccount();
    // TODO: Scroll below to add more replies
    const [replies, setReplies] = useState(topReplies);
    const session = useSession();
    useEffect(() =>
        setReplies(topReplies)
    , [topReplies]);

    const onCommentDeleted = (uri: string) =>
        session.atproto.profilePostRecords
            .delete(uri)
            ?.then(() => setReplies(replies.filter((x) => x.uri != uri)));
    const onCommentUpdated = (uri: string, content: string) =>
        session.atproto.profilePostRecords
            .update(uri, { content })
            ?.then(() => {
                const postIndex = replies.findIndex((x) => x.uri === uri);
                if (postIndex < 0) return;

                // Update post in post list
                const post = replies[postIndex];
                setReplies([
                    ...replies.slice(0, postIndex),
                    { ...post, content },
                    ...replies.slice(postIndex + 1),
                ]);
            });
    const onCommentCreated = (content: string) => {
        const newPost = {
            parentUri: post.uri,
            content,
            tags: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        return session.atproto.profilePostRecords.create(newPost).then((x) =>
            x.ok
                ? setReplies([
                      {
                          ...newPost,
                          author: {
                              ...(account as AccountContextAuthenticated)
                                  .profile,
                              handle: (account as AccountContextAuthenticated)
                                  .sessionInfo.handle,
                              did: (account as AccountContextAuthenticated)
                                  .sessionInfo.did,
                          },
                          replyCount: 0,
                          uri: x.content.uri,
                          indexedAt: new Date().toISOString(),
                      },
                      ...replies,
                  ])
                : null,
        );
    };

    return [
        account.authenticated && (
            <ThreadLineItem>
                <ProfilePostCreator
                    onPost={onCommentCreated}
                    placeholder="Have something to say?"
                    sx={{ mb: 0.5, mt: 1 }}
                />
            </ThreadLineItem>
        ),
        replies.length &&
            replies.map((x) => (
                <ThreadLineItem>
                    <ProfilePost
                        mt={0.5}
                        mb={0.5}
                        onPostUpdate={onCommentUpdated}
                        onPostDelete={onCommentDeleted}
                        key={`comment-${x.uri}`}
                        post={x}
                        showComments
                    />
                </ThreadLineItem>
            )),
    ].filter((x) => x);
}
