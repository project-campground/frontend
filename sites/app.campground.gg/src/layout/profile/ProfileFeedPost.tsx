import { Card, CardContent, CardOverflow, ListItemContent, ListItemDecorator, MenuItem, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import UserDisplay from "~/components/UserDisplay";
import { IconCornerUpRightDouble, IconMessage, IconMoodPlus, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import Datestamp from "~/components/Datestamp";
import type { EitherUserPost, UserPost } from "types/user";
import Link from "~/components/Link";
import MarkdownWrapper from "~/components/markdown/MarkdownWrapper";
import { LargeContentMarkdown } from "~/components/markdown/Markdown";
import { keyframes } from "@emotion/react";
import ContentOverflow from "~/components/content/ContentOverflow";
import BasicPostEditor from "~/components/editor/BasicPostEditor";

type Props = {
    appear?: boolean;
    post: UserPost;
    showCommentsLink?: boolean;
    isOwnPost?: boolean;
    onPostDelete: (uri: string) => void | Promise<void>;
    onPostUpdate: (uri: string, content: string) => void | Promise<void>;
};

const appearAnimation = keyframes`
    0% {
        opacity: 0%;
        transform: translateY(-20px);
    }
    100% {
        opacity: 100%;
        transform: translateY(0px);
    }
`;

function ProfileFeedPostHeader({ author, createdAt }: { author: UserPost["author"], createdAt: Date }) {
    return (
        <Stack gap={1} direction="row" flex={1}>
            <UserDisplay showHandle user={author} size="md" avatarSize="lg" alignItems="start" />
            <Typography level="body-md" textColor="neutral.500">•</Typography>
            <Datestamp date={createdAt} />
        </Stack>
    );
}

export default function ProfileFeedPost(props: Props) {
    const { showCommentsLink, appear, isOwnPost, onPostDelete, onPostUpdate } = props;
    const { uri, content, createdAt, replies, replyCount, author } = props.post as EitherUserPost;
    const postTid = uri.split("/")[4];
    const [editing, setEditing] = useState(false);

    return (
        <Card variant="soft" sx={{ animation: `${appearAnimation} ${appear ? 0.75 : 0}s`, }}>
            <CardOverflow sx={{ alignItems: "start", pt: 2 }}>
                <ProfileFeedPostHeader author={author} createdAt={new Date(createdAt)} />
            </CardOverflow>
            {isOwnPost && <ContentOverflow>
                <MenuItem onClick={() => setEditing(!editing)}>
                    <ListItemDecorator>
                        <IconPencil />
                    </ListItemDecorator>
                    <ListItemContent>
                        Edit post
                    </ListItemContent>
                </MenuItem>
                <MenuItem color="danger" onClick={() => onPostDelete(uri)}>
                    <ListItemDecorator>
                        <IconTrashFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        Delete post
                    </ListItemContent>
                </MenuItem>
            </ContentOverflow>}
            <CardContent sx={{ ml: 7.5 }}>
                <Stack gap={1}>
                    {editing
                    ? <BasicPostEditor
                        sx={{ mt: -4.5 }}
                        placeholder="New post text"
                        content={content}
                        onConfirm={(newContent) => (onPostUpdate(uri, newContent), setEditing(false))}
                        onCancel={() => setEditing(false)}
                        confirmButton="Edit"
                    />
                    : <MarkdownWrapper sx={(theme) => ({ mt: -4.5, color: theme.vars.palette.text.secondary })}>
                        <LargeContentMarkdown>{content}</LargeContentMarkdown>
                    </MarkdownWrapper>}
                    <Stack direction="row" gap={1} alignItems="center">
                        <Stack direction="row" gap={1.5} flex={1}>
                            {showCommentsLink && <Link href={`/profile/${author.did}/posts/${postTid}`} color="neutral" startDecorator={<IconMessage />}>
                                {replyCount ?? replies.length}{" "}
                            </Link>}
                            {showCommentsLink && <Link href={`/profile/${author.did}/posts/${postTid}`} color="neutral" startDecorator={<IconCornerUpRightDouble />}>
                                {replyCount ?? replies.length}{" "}
                            </Link>}
                            {showCommentsLink && <Link href={`/profile/${author.did}/posts/${postTid}`} color="neutral" startDecorator={<IconMoodPlus />}>
                                {" "}
                            </Link>}
                        </Stack>
                        {/* <Stack gap={0.5}>
                            <Stack gap={1} direction="row">
                                {tags.map((tag, i) => <Chip key={i} variant="solid">{tag}</Chip>)}
                            </Stack>
                        </Stack> */}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}