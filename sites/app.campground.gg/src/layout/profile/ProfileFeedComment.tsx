import { Card, CardContent, Stack, Typography } from "@mui/joy";
import React from "react";
import UserDisplay from "~/components/UserDisplay";
import { IconShare } from "@tabler/icons-react";
import Datestamp from "~/components/Datestamp";
import type { UserPostComment } from "types/user";
import Link from "~/components/Link";
import MarkdownWrapper from "~/components/markdown/MarkdownWrapper";
import { LargeContentMarkdown } from "~/components/markdown/Markdown";

type Props = {
    comment: UserPostComment;
    linkTitle?: boolean;
};

export default class ProfileFeedComment extends React.Component<Props> {
    render(): React.ReactNode {
        const { content, createdAt, author } = this.props.comment;

        return (
            <Card variant="soft">
                <CardContent>
                    <Stack gap={1.5}>
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