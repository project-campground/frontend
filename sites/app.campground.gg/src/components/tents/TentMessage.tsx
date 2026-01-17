import { Avatar, Box, Skeleton, Stack, styled, Typography } from "@mui/joy";
import { Group, loremIpsum } from "components";
import type { TentMessageViewWithReplies } from "types/content";
import UserAvatar, { UserAvatarSkeleton } from "../UserAvatar";
import MarkdownWrapper from "../markdown/MarkdownWrapper";
import { LargeContentMarkdown } from "../markdown/Markdown";
import MessageToolbar from "./MessageToolbar";
import { useState } from "react";
import MessageEditor from "../editor/MessageEditor";
import { useSession } from "~/context/session";
import Datestamp from "../Datestamp";
import { ThreadLineItem } from "../ThreadLine";
import TentMessageReply, { TentMessageReplySkeleton } from "./TentMessageReply";
import UserDisplay from "../UserDisplay";

const TentMessageWrapper = styled(Stack, {
    name: "TentMessage",
    slot: "root",
})(({ theme }) => ({
    padding: "12px 24px",
    backgroundColor: "transparent",
    transition: "background 0.3s",
    position: "relative",
    ":hover": {
        backgroundColor: theme.vars.palette.background.level2,
    }
}));

const TentMessageReplies = styled(Box, {
    name: "TentMessage",
    slot: "replies",
})();

const TentMessageContainer = styled(Stack, {
    name: "TentMessage",
    slot: "container",
})(() => ({
    flexDirection: "row",
    gap: "16px",
}));

type Props = {
    hideToolbar?: boolean;
    message: TentMessageViewWithReplies;
    promptDelete: (message: TentMessageViewWithReplies) => unknown;
    addReply: (message: TentMessageViewWithReplies) => unknown;
};

export default function TentMessage({ hideToolbar, message, promptDelete, addReply }: Props) {
    const session = useSession();
    const [editMode, setEditMode] = useState(false);
    const [msgContent, setMsgContent] = useState(message.content);

    const onEdit = (content: string) => {
        setEditMode(false);

        return session.restClient?.updateTentMessage(message.tentId, message.id, { content })
            .then((resp) => {
                if (!resp.ok)
                    return;

                return setMsgContent(message.content = resp.content.content);
            });
    }

    return (
        <TentMessageWrapper className="TentMessage-wrapper">
            {!hideToolbar && <MessageToolbar
                // message={message}
                onEdit={() => setEditMode(true)}
                onDelete={() => promptDelete(message)}
                addReply={() => addReply(message)}
            />}
            {message.replyingTo && <TentMessageReplies>
                {message.replyingTo.map((x, i) =>
                    <ThreadLineItem reverse key={`reply-${i}`} hookSx={{ width: 55, }}>
                        <TentMessageReply message={x} />
                    </ThreadLineItem>
                )}
            </TentMessageReplies>}
            <TentMessageContainer className="TentMessage-container">
                <Box>
                    <UserAvatar did={message.createdBy.did} avatar={message.createdBy.avatar} size="lg" />
                </Box>
                <Stack flex={1}>
                    <Group gap={1} alignItems="center">
                        <UserDisplay noAvatar user={message.createdBy} />
                        {/* <Typography level="title-md" fontWeight={700}>{message.createdBy}</Typography> */}
                        <Typography level="body-sm">
                            <Datestamp long date={new Date(message.createdAt)}/>
                        </Typography>
                    </Group>
                    <Box>
                        {editMode
                        ? <MessageEditor
                            content={msgContent}
                            confirmButton="Edit"
                            onConfirm={onEdit}
                            onCancel={() => setEditMode(false)}
                            />
                            : <MarkdownWrapper>
                            <LargeContentMarkdown>
                                {msgContent}
                            </LargeContentMarkdown>
                        </MarkdownWrapper>}
                    </Box>
                </Stack>
            </TentMessageContainer>
        </TentMessageWrapper>
    )
}

function TentMessageSkeletonHeader() {
    return (
        <Group gap={1}>
            <Typography level="title-md" fontWeight={700}>
                <Skeleton loading>
                    Loading
                </Skeleton>
            </Typography>
            <Typography level="body-sm" fontWeight={700}>
                <Skeleton loading>
                    ??? hours ago
                </Skeleton>
            </Typography>
        </Group>
    );
}

function TentMessageSkeletonContent() {
    return (
        <Box>
            <Typography>
                <Skeleton loading>
                    {loremIpsum.lg}
                </Skeleton>
            </Typography>
        </Box>
    );
}

export function TentMessageSkeleton2() {
    return (
        <TentMessageWrapper>
            <TentMessageReplies>
                <ThreadLineItem reverse hookSx={{ width: 55 }}>
                    <TentMessageReplySkeleton />
                </ThreadLineItem>
                <ThreadLineItem reverse hookSx={{ width: 55 }}>
                    <TentMessageReplySkeleton />
                </ThreadLineItem>
            </TentMessageReplies>
            <TentMessageContainer>
                <Box>
                    <UserAvatarSkeleton size="lg" />
                </Box>
                <Stack flex={1}>
                    <TentMessageSkeletonHeader />
                    <TentMessageSkeletonContent />
                </Stack>
            </TentMessageContainer>
        </TentMessageWrapper>
    )
}

export function TentMessageSkeleton1() {
    return (
        <TentMessageWrapper>
            <TentMessageContainer>
                <Box>
                    <UserAvatarSkeleton size="lg" />
                </Box>
                <Stack flex={1}>
                    <TentMessageSkeletonHeader />
                    <TentMessageSkeletonContent />
                </Stack>
            </TentMessageContainer>
        </TentMessageWrapper>
    )
}