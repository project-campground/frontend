import { Card, CardContent, Chip, Stack, Typography } from "@mui/joy";
import React from "react";
import UserDisplay from "~/components/UserDisplay";
import { IconMessage, IconShare } from "@tabler/icons-react";
import Datestamp from "~/components/Datestamp";
import type { UserPost } from "types/user";
import Link from "~/components/Link";
import MarkdownWrapper from "~/components/MarkdownWrapper";
import { LargeContentMarkdown } from "~/components/Markdown";

type Props = {
    post: UserPost;
    linkTitle?: boolean;
};

export default class ProfileFeedPost extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { linkTitle } = this.props;
        const { id, title, content, createdAt, comments, tags, author, profileUser } = this.props.post;
        const titleNode = (
            <Typography level="h3">{title}</Typography>
        );

        return (
            <Card variant="soft">
                <CardContent>
                    <Stack gap={1.5}>
                        <Stack gap={0.5}>
                            {linkTitle
                                ? <Link href={`/profile/${profileUser.did}/posts/${id}`}>{titleNode}</Link>
                                : titleNode
                            }
                            <Stack gap={1} direction="row">
                                {tags.map((tag) => <Chip variant="solid">{tag}</Chip>)}
                            </Stack>
                        </Stack>
                        <MarkdownWrapper>
                            <LargeContentMarkdown>{content}</LargeContentMarkdown>
                        </MarkdownWrapper>
                        {/* <Typography level="body-md">{content}</Typography> */}
                        <Stack direction="row" gap={1} alignItems="center">
                            <Stack gap={1} direction="row" flex={1}>
                                <UserDisplay user={author} size="sm" />
                                <Typography level="body-md" textColor="neutral.500">•</Typography>
                                {/* <Typography level="body-md" textColor="neutral.200">{ms(Date.now() - createdAt, { long: true })} ago</Typography> */}
                                <Datestamp date={createdAt} />
                            </Stack>
                            <Stack direction="row" gap={1.5}>
                                <Link href={`/profile/${profileUser.did}/posts/${id}`} color="neutral" startDecorator={<IconMessage />}>
                                    {comments}{" "}
                                    Comments
                                </Link>
                                <Link color="neutral" startDecorator={<IconShare />}>
                                    Share
                                </Link>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        );
    }
}