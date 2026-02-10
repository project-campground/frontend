import { Box, CircularProgress, Skeleton, Stack, styled, Tooltip, Typography } from "@mui/joy";
import { Group, loremIpsum } from "components";
import type { TentMessageViewWithReplies } from "types/content";
import UserAvatar, { UserAvatarSkeleton } from "../UserAvatar";
import MarkdownWrapper from "../markdown/MarkdownWrapper";
import { LargeContentMarkdown } from "../markdown/Markdown";
import MessageToolbar from "./MessageToolbar";
import { useState, type MouseEvent } from "react";
import MessageEditor from "../editor/MessageEditor";
import { useSession } from "~/context/session";
import Datestamp, { defaultDateOptions } from "../Datestamp";
import { ThreadLineItem } from "../ThreadLine";
import TentMessageReply, { TentMessageReplySkeleton } from "./TentMessageReply";
import { UserDisplayNoModal } from "../UserDisplay";
import { IconExclamationCircleFilled, IconPencil } from "@tabler/icons-react";
import type { CampsiteRoleView } from "types/campsites";
import { decimalToHexColor } from "~/util/color";

const TentMessageWrapper = styled(Stack, {
    name: "TentMessage",
    slot: "root",
})(({ theme }) => ({
    padding: "12px 24px",
    backgroundColor: "transparent",
    transition: "background 0.3s",
    position: "relative",
    "&.waiting": {
        opacity: 0.45,
    },
    "&.error": {
        color: theme.vars.palette.danger[500],
    },
    "&.being-replied-to": {
        backgroundColor: theme.vars.palette.info[950],
    },
    "&.being-replied-to:hover": {
        backgroundColor: theme.vars.palette.info[900],
    },
    "&.being-replied-to::before": {
        content: "''",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: 3,
        backgroundColor: theme.vars.palette.info[500],
    },
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
    waiting?: boolean;
    error?: string;
    hideToolbar?: boolean;
    message: TentMessageViewWithReplies;
    colorRoles?: CampsiteRoleView[];
    isBeingRepliedTo?: boolean;
    onAuthorClick?: (ev: MouseEvent<HTMLDivElement>) => unknown;
    promptDelete: (message: TentMessageViewWithReplies) => unknown;
    addReply: (message: TentMessageViewWithReplies) => unknown;
};

export default function TentMessage({ waiting, error, onAuthorClick, colorRoles, isBeingRepliedTo, hideToolbar, message, promptDelete, addReply }: Props) {
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
    const colorRole = colorRoles?.find((x) => message.createdBy.roles.includes(x.id));
    const color = colorRole?.color || colorRole?.colorSecondary;

    return (
        <TentMessageWrapper className={`TentMessage-wrapper${isBeingRepliedTo ? " being-replied-to" : ""}${waiting ? " waiting" : ""}${error ? " error" : ""}`}>
            {!hideToolbar && <MessageToolbar
                // message={message}
                onEdit={() => setEditMode(true)}
                onDelete={() => promptDelete(message)}
                addReply={() => addReply(message)}
                beingRepliedTo={isBeingRepliedTo}
                onlyAllowDeletion={waiting}
            />}
            {message.replyingTo && <TentMessageReplies>
                {message.replyingTo.map((x, i) =>
                    <ThreadLineItem reverse key={`reply-${i}`} hookSx={{ width: 55, }}>
                        <TentMessageReply message={x} colorRoles={colorRoles} />
                    </ThreadLineItem>
                )}
            </TentMessageReplies>}
            <TentMessageContainer className="TentMessage-container">
                <Box onClick={onAuthorClick}>
                    <UserAvatar did={message.createdBy.user.did} avatar={message.createdBy.user.avatar} size="lg" />
                </Box>
                <Stack flex={1}>
                    <Group gap={1} alignItems="center">
                        <UserDisplayNoModal noAvatar onClick={onAuthorClick} user={message.createdBy.user} member={message.createdBy} color={color ? decimalToHexColor(color) : undefined} />
                        {/* <Typography level="title-md" fontWeight={700}>{message.createdBy}</Typography> */}
                        <Typography level="body-sm">
                            <Datestamp long date={new Date(message.createdAt)}/>
                        </Typography>
                        {waiting && !error && <CircularProgress size="sm" />}
                        {error && <Tooltip title={error}>
                            <Typography textColor="danger.500" level="body-sm" sx={{ lineHeight: 0 }}>
                                <IconExclamationCircleFilled />
                            </Typography>
                        </Tooltip>
                        }
                        {message.updatedAt &&
                        <Tooltip title={new Date(message.updatedAt).toLocaleString("en-US", defaultDateOptions)}>
                            <Typography level="body-sm" textColor="text.tertiary">
                                {"("}
                                <IconPencil size={16} />
                                {" edited)"}
                            </Typography>
                        </Tooltip>}
                    </Group>
                    <Box sx={{ overflow: "hidden" }}>
                        {editMode && !waiting
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