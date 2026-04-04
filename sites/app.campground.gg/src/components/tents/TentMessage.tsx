import { Box, CircularProgress, Skeleton, Stack, styled, Tooltip, Typography } from "@mui/joy";
import { Group, loremIpsum, TextBlock } from "components";
import type { TentMessageType, TentMessageViewWithReplies } from "types/content";
import UserAvatar, { UserAvatarSkeleton } from "../UserAvatar";
import MessageToolbar from "./MessageToolbar";
import { useState, type MouseEvent, type ReactNode } from "react";
import MessageEditor from "../editor/MessageEditor";
import { useSession } from "~/context/session";
import Datestamp, { defaultDateOptions } from "../Datestamp";
import { ThreadLineItem } from "../ThreadLine";
import TentMessageReply, { TentMessageReplySkeleton } from "./TentMessageReply";
import { UserDisplayNoModal } from "../UserDisplay";
import { IconExclamationCircleFilled, IconPencil } from "@tabler/icons-react";
import type { CampsiteMemberViewAuthor, CampsiteRoleView } from "types/campsites";
import { colorToDecimal } from "~/util/color";
import ContentDisplayBlock from "../markdown/ContentDisplayBlock";
import { FormattedMessage } from "react-intl";

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
    "&:not(.unhoverable):hover": {
        backgroundColor: theme.vars.palette.background.level2,
    }
}));

const TentMessageReplies = styled(Box, {
    name: "TentMessage",
    slot: "replies",
})(() => ({
    
}));

const TentMessageContainer = styled(Stack, {
    name: "TentMessage",
    slot: "container",
})(() => ({
    flexDirection: "row",
    gap: "16px",
}));

type Props = {
    unhoverable?: boolean;
    waiting?: boolean;
    error?: string;
    hideToolbar?: boolean;
    message: TentMessageViewWithReplies;
    colorRoles?: CampsiteRoleView[];
    isBeingRepliedTo?: boolean;
    onUserClick?: (ev: MouseEvent<HTMLDivElement>, user: CampsiteMemberViewAuthor) => unknown;
    onDelete: (message: TentMessageViewWithReplies, prompt: boolean) => unknown;
    addReply: (message: TentMessageViewWithReplies) => unknown;
};
type MessageTypeComponentProps = Pick<Props, "message" | "colorRoles" | "waiting" | "error" | "onUserClick"> & React.PropsWithChildren;

const TentMessageComponentByType: Record<TentMessageType, (props: MessageTypeComponentProps) => ReactNode[] | ReactNode> = {
    default: TentMessageDefault,
    system: TentMessageSystem,
};

export default function TentMessage({ unhoverable, waiting, error, onUserClick, colorRoles, isBeingRepliedTo, hideToolbar, message, onDelete, addReply }: Props) {
    const session = useSession();
    const [editMode, setEditMode] = useState(false);
    const [msgContent, setMsgContent] = useState(message.content);

    const onEdit = (content: string) => {
        setEditMode(false);

        return session.http.messages.update(message.tentId, message.id, { content })
            .then((resp) => {
                if (!resp.ok)
                    return;

                return setMsgContent(message.content = resp.content.content);
            });
    }
    const MessageComponent = TentMessageComponentByType[message.type ?? "default"];

    // To reduce potential future lag associated with updating tons of states, especially after context updates via shift and control
    const [hover, setHover] = useState(false);

    return (
        <TentMessageWrapper onMouseMove={() => setHover(true)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`TentMessage-wrapper${unhoverable ? " unhoverable" : ""}${isBeingRepliedTo ? " being-replied-to" : ""}${waiting ? " waiting" : ""}${error ? " error" : ""}`}>
            {!hideToolbar && hover && <MessageToolbar
                onEdit={message.type !== "system" ? () => setEditMode(true) : undefined}
                onDelete={(prompt) => onDelete(message, prompt)}
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
                <MessageComponent message={message} colorRoles={colorRoles} onUserClick={onUserClick} waiting={waiting} error={error}>
                    {editMode && !waiting
                    ? <MessageEditor
                        content={msgContent}
                        confirmButton="Edit"
                        onConfirm={onEdit}
                        onCancel={() => setEditMode(false)}
                        />
                        : <ContentDisplayBlock inline content={msgContent} components={message.components} createdBy={message.createdBy} onUserClick={onUserClick} colorRoles={colorRoles} />}
                </MessageComponent>
            </TentMessageContainer>
        </TentMessageWrapper>
    )
}

function TentMessageDefault({ message, colorRoles, onUserClick, waiting, error, children }: MessageTypeComponentProps) {
    const onAuthorClick = (ev: MouseEvent<HTMLDivElement>) => onUserClick?.(ev, message.createdBy);
    const colorRole = colorRoles?.find((x) => message.createdBy.roles.includes(x.id));
    const displayColors = colorToDecimal(colorRole?.colors);

    return (
        <>
            <Box onClick={onAuthorClick}>
                <UserAvatar did={message.createdBy.user.did} avatar={message.createdBy.user.avatar} size="lg" />
            </Box>
            <Stack flex={1}>
                <Group gap={1} alignItems="center">
                    <UserDisplayNoModal noAvatar onClick={onAuthorClick} user={message.createdBy.user} member={message.createdBy} colors={displayColors} motion={colorRole?.motion} />
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
                                <FormattedMessage
                                    id="app.messages.edited"
                                    defaultMessage="({icon} edited)"
                                    description="Hint at the top of the message that the message was edited"
                                    values={{
                                        icon: <IconPencil size={16} />
                                    }}
                                />
                            </Typography>
                        </Tooltip>
                    }
                </Group>
                <Box sx={{ overflow: "hidden" }}>
                    {children}
                </Box>
            </Stack>
        </>
    );
}
function TentMessageSystem({ message, children }: MessageTypeComponentProps) {
    return (
        <div>
            {children}
            {" "}
            <TextBlock>
                <Typography level="body-sm" ml={1}>
                    <Datestamp long date={new Date(message.createdAt)}/>
                </Typography>
            </TextBlock>
        </div>
    );
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