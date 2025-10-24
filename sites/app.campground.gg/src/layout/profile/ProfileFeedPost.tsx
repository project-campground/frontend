import { Card, CardContent, CardOverflow, Chip, Stack, Typography } from "@mui/joy";
import React from "react";
import UserDisplay from "~/components/UserDisplay";
import { IconCornerUpRightDouble, IconMessage, IconMoodPlus } from "@tabler/icons-react";
import Datestamp from "~/components/Datestamp";
import type { EitherUserPost, UserPost } from "types/user";
import Link from "~/components/Link";
import MarkdownWrapper from "~/components/markdown/MarkdownWrapper";
import { LargeContentMarkdown } from "~/components/markdown/Markdown";

type Props = {
    post: UserPost;
    showCommentsLink?: boolean;
};

export default class ProfileFeedPost extends React.Component<Props> {
    render(): React.ReactNode {
        const { showCommentsLink } = this.props;
        const { uri, content, createdAt, replies, replyCount, tags, author } = this.props.post as EitherUserPost;
        const postTid = uri.split("/")[4];

        return (
            <Card variant="soft">
                <CardOverflow sx={{ alignItems: "start", pt: 2 }}>
                    <Stack gap={1} direction="row" flex={1}>
                        <UserDisplay showHandle user={author} size="md" avatarSize="lg" alignItems="start" />
                        <Typography level="body-md" textColor="neutral.500">•</Typography>
                        {/* <Typography level="body-md" textColor="neutral.200">{ms(Date.now() - createdAt, { long: true })} ago</Typography> */}
                        <Datestamp date={new Date(createdAt)} />
                    </Stack>
                </CardOverflow>
                <CardContent sx={{ ml: 7.5 }}>
                    <Stack gap={1}>
                        <MarkdownWrapper sx={(theme) => ({ mt: -4.5, color: theme.vars.palette.text.secondary })}>
                            <LargeContentMarkdown>{content}</LargeContentMarkdown>
                        </MarkdownWrapper>
                        {/* <Typography level="body-md">{content}</Typography> */}
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
                            <Stack gap={0.5}>
                                <Stack gap={1} direction="row">
                                    {tags.map((tag, i) => <Chip key={i} variant="solid">{tag}</Chip>)}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        );
    }
}