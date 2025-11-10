import { Card, CardContent, CardOverflow, Divider, ListItemContent, ListItemDecorator, MenuItem, Stack, Typography } from "@mui/joy";
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
import { Group } from "components";

type Props = {
    appear?: boolean;
    post: UserPost;
    showComments?: boolean;
    bigger?: boolean;
    isOwnPost?: boolean;
    onPostDelete: (uri: string) => void | Promise<any>;
    onPostUpdate: (uri: string, content: string) => void | Promise<any>;
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

function ProfileFeedPostHeader({ bigger, author, createdAt }: { bigger: boolean; author: UserPost["author"], createdAt: Date }) {
    return (
        <Stack gap={1} direction="row" flex={1}>
            <UserDisplay showHandle user={author} size={bigger ? "lg" : "md"} avatarSize={bigger ? "xl" : "lg"} alignItems="start" />
            {!bigger && <Typography level="body-md" textColor="neutral.500">•</Typography>}
            {!bigger && <Datestamp date={createdAt} />}
        </Stack>
    );
}

export default function ProfileFeedPost(props: Props) {
    const { showComments: showCommentsLink, bigger, appear, isOwnPost, onPostDelete, onPostUpdate } = props;
    const { uri, content, createdAt, replies, replyCount, author } = props.post as EitherUserPost;
    const postTid = uri.split("/")[4];
    const [editing, setEditing] = useState(false);
    const createdAtDate = new Date(createdAt);

    return (
        <Card size={bigger ? "lg" : "md"} variant="soft" sx={(theme) => ({ boxShadow: bigger ? theme.vars.shadow.md : theme.vars.shadow.sm, animation: `${appearAnimation} ${appear ? 0.75 : 0}s`, zIndex: 2, })}>
            <CardOverflow sx={{ alignItems: "start", pt: 2 }}>
                <ProfileFeedPostHeader bigger={bigger ?? false} author={author} createdAt={createdAtDate} />
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
            <CardContent sx={{ ml: bigger ? 9 : 7.5 }}>
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
                    : <MarkdownWrapper sx={(theme) => ({ mt: bigger ? -5.5 : -5, color: theme.vars.palette.text.secondary })}>
                        <LargeContentMarkdown>{content}</LargeContentMarkdown>
                    </MarkdownWrapper>}
                    {bigger &&
                        <Stack gap={1} sx={{ mt: 1 }}>
                            <Divider />
                            <Group>
                                <Datestamp date={createdAtDate} />
                            </Group>
                            <Divider />
                        </Stack>
                    }
                    <Group gap={1} alignItems="center">
                        <Stack direction="row" gap={1.5} flex={1}>
                            {showCommentsLink && <Link href={`/profile/${author.did}/posts/${postTid}`} color="neutral" startDecorator={<IconMessage />}>
                                {replyCount ?? replies.length}{" "}
                            </Link>}
                            <Link href={`/profile/${author.did}/posts/${postTid}`} color="neutral" startDecorator={<IconCornerUpRightDouble />}>
                                {replyCount ?? replies.length}{" "}
                            </Link>
                            <Link href={`/profile/${author.did}/posts/${postTid}`} color="neutral" startDecorator={<IconMoodPlus />}>
                                {" "}
                            </Link>
                        </Stack>
                        {/* <Stack gap={0.5}>
                            <Stack gap={1} direction="row">
                                {tags.map((tag, i) => <Chip key={i} variant="solid">{tag}</Chip>)}
                            </Stack>
                        </Stack> */}
                    </Group>
                </Stack>
            </CardContent>
        </Card>
    );
}