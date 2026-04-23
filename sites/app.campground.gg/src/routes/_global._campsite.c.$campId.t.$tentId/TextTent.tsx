import {
    Alert,
    Box,
    Divider,
    Link,
    Skeleton,
    Stack,
    styled,
    Typography,
} from "@mui/joy";
import type { HttpResponseError } from "~/api/http/HTTPResponse";
import React, { type ContextType } from "react";
import type {
    MessageViewBasic,
    MessageViewWithReplies,
} from "types/campground/content";
import type { TentViewDetailed } from "types/campground/tent";
import MessageEditor, {
    MessageEditorContainer,
} from "~/components/editor/MessageEditor";
import PagePlaceholder, {
    PagePlaceholderIcon,
    textToIcon,
} from "~/components/pages/PagePlaceholder";
import TentMessage, {
    TentMessageSkeleton1,
    TentMessageSkeleton2,
} from "~/components/tents/TentMessage";
import ContentDeleteModal from "../../layout/ContentDeleteModal";
import {
    IconCircleXFilled,
    IconExclamationCircleFilled,
    IconLockFilled,
} from "@tabler/icons-react";
import { UserDisplayNoModal } from "~/components/UserDisplay";
import { Group } from "components";
import FadingBox from "~/components/pages/FadingBox";
import { type ContextSuite } from "~/context/context-suite";
import { ContentPermissionConsts } from "~/util/permissions";
import { CampsiteContext } from "../_global._campsite/context";
import type { RoleView } from "types/campground/roles";
import { colorToDecimal } from "~/util/color";
import TentMessageDivider from "~/components/tents/TentMessageDivider";
import { type WSSubscription } from "~/api/WSClient";
import { handleAnyRestErrorWith } from "~/util/rest";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

type Props = {
    campsiteId: string;
    tent: TentViewDetailed;
};

export type TextTentMessage = MessageViewWithReplies & {
    waiting?: true;
    error?: string;
};

type State = {
    messages: TextTentMessage[];
    loading: boolean;
    error: HttpResponseError | null;
    isEnd: boolean;
    deleteMessage: MessageViewWithReplies | null;
    replyMessages: MessageViewWithReplies[];
};

export default class TextTent extends React.Component<Props, State> {
    static contextType?: React.Context<any> | undefined = CampsiteContext;
    declare context: ContextType<typeof CampsiteContext>;

    state: State = {
        messages: [],
        loading: true,
        error: null,
        isEnd: false,
        deleteMessage: null,
        replyMessages: [],
    };
    pseudoMessages: string[] = [];
    private _initLock: boolean = false;
    private _lock: boolean = false;
    private _wsSubscription: WSSubscription | null = null;

    async componentDidMount(): Promise<void> {
        if (this._initLock) return;

        this._initLock = true;
        const session = (this.context as CampsiteContext).session;
        this._wsSubscription = session.ws.subscribe((ev) => {
            if (ev.op !== 1) return;

            return this.onWebSocketEvent(ev.t, ev.payload);
        });

        return this.fetchMessages(0).then(
            (messages) =>
                messages &&
                this.setState({
                    messages,
                    loading: false,
                    isEnd: messages.length < 50,
                }),
        );
    }

    private onWebSocketEvent(type: string, payload: any) {
        const { session } = this.context as CampsiteContext;
        const message = payload as MessageViewBasic;
        if (message.tentId !== this.props.tent.id) return;
        switch (type) {
            case "MessageCreated":
                // Instead of ignoring messages being waited, the waited messages can be deleted, but it can look weird if you both see
                // the message that was created by you and you are still waiting for for a split second.
                if (
                    this.state.messages.some(
                        (x) =>
                            x.id === message.id ||
                            (x.waiting &&
                                x.content === message.content &&
                                session.auth.authenticated &&
                                session.auth.user.did ===
                                    message.createdBy.user.did),
                    )
                )
                    return;

                this.setState({
                    messages: [
                        {
                            ...message,
                            replyingTo: [],
                            replyingToCount: message.replyingTo.length,
                        },
                        ...this.state.messages,
                    ],
                });
                break;
            case "MessageUpdated":
                const updatedMessageIndex = this.state.messages.findIndex(
                    (x) => x.id === message.id,
                );
                if (updatedMessageIndex < 0) return;

                Object.assign(this.state.messages[updatedMessageIndex], {
                    content: message.content,
                    updatedAt: message.updatedAt,
                });
                break;
            case "MessageDeleted":
                const deletedMessageIndex = this.state.messages.findIndex(
                    (x) => x.id === message.id,
                );
                if (deletedMessageIndex < 0) return;

                this.state.messages.splice(deletedMessageIndex, 1);
                this.setState({
                    replyMessages: this.state.replyMessages.filter(
                        (x) => x.id !== message.id,
                    ),
                });
                // Already has been updated
                return;
            default:
                return;
        }
        this.setState({});
    }

    async fetchMessages(offset: number = 0) {
        const { api } = this.context;
        const { tent } = this.props;

        return api.messages.getMany(tent.id, offset).then((resp) => {
            if (!resp.ok) return this.setState({ error: resp, loading: false });

            return resp.content.messages; // this.setState({ messages: resp.content.messages, isEnd: resp.content.messages.length < 50, loading: false });
        });
    }

    async componentDidUpdate(
        prevProps: Readonly<Props>,
        _prevState: Readonly<State>,
        _snapshot?: ContextSuite | undefined,
    ): Promise<void> {
        if (
            !this._initLock ||
            this._lock ||
            prevProps.tent.id === this.props.tent.id
        )
            return;

        this._lock = true;
        this.setState({ loading: true });

        return this.fetchMessages(0).then(
            (messages) =>
                messages &&
                !(this._lock = false) &&
                this.setState({
                    messages,
                    isEnd: messages.length < 50,
                    loading: false,
                }),
        );
    }

    componentWillUnmount(): void {
        if (!this._wsSubscription) return;

        (this.context as CampsiteContext).session.ws.unsubscribe(
            this._wsSubscription,
        );
    }

    async onMessageCreate(content: string): Promise<unknown> {
        const { campsite, api } = this.context as CampsiteContext;
        const replyMessages = this.state.replyMessages;

        // For user's messages to not randomly appear after a year (not literally)
        const fakeMessage: TextTentMessage = {
            id: (Math.floor(Math.random() * 9000) + 1000).toString(),
            replyingTo: replyMessages.map(
                (x) =>
                    ({
                        ...x,
                        replyingTo: x.replyingTo.map((y) => y.id),
                    }) as MessageViewBasic,
            ),
            replyingToCount: replyMessages.length,
            campsiteId: this.props.tent.bonfireId,
            bonfireId: this.props.tent.bonfireId,
            tentId: this.props.tent.id,
            content,
            createdBy: { isMember: true, ...campsite.me },
            createdAt: new Date().toISOString(),
            waiting: true,
        };
        this.setState({
            replyMessages: [],
            messages: [fakeMessage, ...this.state.messages],
        });
        this.pseudoMessages.push(fakeMessage.id);

        return api.messages
            .create(this.props.tent.id, {
                content,
                replies: replyMessages.map((x) => x.id),
            })
            .then((resp) => {
                if (!resp.ok)
                    return this.setState({
                        messages: [
                            { ...fakeMessage, error: resp.errorDescription },
                            ...this.state.messages.filter(
                                (x) => x.id !== fakeMessage.id,
                            ),
                        ],
                    });

                const replyingTo = replyMessages.map((x) => ({
                    ...x,
                    replyingTo: x.replyingTo.map((y) => y.id),
                }));
                Object.assign(fakeMessage, resp.content, { replyingTo });
                // To not have spinning circle
                delete fakeMessage.waiting;

                this.pseudoMessages = this.pseudoMessages.filter(
                    (x) => x === fakeMessage.id,
                );
                return this.setState({});
            });
    }

    async onMessagesLoad() {
        if (this._lock) return;

        this._lock = true;
        return this.fetchMessages(this.state.messages.length).then(
            (messages) =>
                messages &&
                !(this._lock = false) &&
                this.setState({
                    messages: [...this.state.messages, ...messages],
                    isEnd: messages.length < 50,
                }),
        );
    }

    onMessageDelete(message: MessageViewWithReplies, prompt: boolean) {
        if (prompt) return this.setState({ deleteMessage: message });

        return this.deleteMessage(message);
    }

    MessageDeleteRender() {
        if (!this.state.deleteMessage)
            return (
                <Alert
                    color="warning"
                    variant="soft"
                    startDecorator={<IconExclamationCircleFilled />}
                >
                    Could not render message.
                </Alert>
            );

        return (
            <TentMessage
                hideToolbar
                message={this.state.deleteMessage}
                onDelete={() => null}
                addReply={() => null}
            />
        );
    }

    async deleteMessage(messageDeleted: MessageViewWithReplies) {
        const { floaters, api } = this.context;

        // To not do random useless requests and keep them
        if (this.pseudoMessages.includes(messageDeleted.id))
            return this.setState({
                deleteMessage: null,
                messages: this.state.messages.filter(
                    (x) => x.id !== messageDeleted.id,
                ),
            });

        this.setState({ deleteMessage: null });

        return api.messages
            .delete(this.props.tent.id, messageDeleted.id)
            .then(handleAnyRestErrorWith(floaters));
    }

    addMessageReply(message: MessageViewWithReplies) {
        if (this.state.replyMessages.length >= 5) return;
        else if (this.state.replyMessages.includes(message))
            return this.setState({
                replyMessages: this.state.replyMessages.filter(
                    (x) => x !== message,
                ),
            });

        return this.setState({
            replyMessages: [...this.state.replyMessages, message],
        });
    }

    removeMessageReply(message: MessageViewWithReplies) {
        return this.setState({
            replyMessages: this.state.replyMessages.filter(
                (x) => x !== message,
            ),
        });
    }

    removeAllMessageReplies() {
        return this.setState({ replyMessages: [] });
    }

    render(): React.ReactNode {
        if (this.state.loading)
            return (
                <Stack sx={{ height: "100%", overflow: "hidden" }}>
                    <Box flex={1} sx={{ overflow: "hidden" }}>
                        <MessageLimitStack sx={{ overflow: "hidden" }}>
                            <TentMessageSkeleton1 />
                            <TentMessageSkeleton1 />
                            <TentMessageSkeleton2 />
                            <TentMessageSkeleton2 />
                            <TentMessageSkeleton1 />
                            <TentMessageSkeleton1 />
                            <TentMessageSkeleton1 />
                            <TentMessageSkeleton2 />
                            <TentMessageSkeleton1 />
                            <TentMessageSkeleton1 />
                            <TentMessageSkeleton2 />
                            <TentMessageSkeleton2 />
                            <TentMessageSkeleton2 />
                            <TentMessageSkeleton1 />
                            <TentMessageSkeleton2 />
                        </MessageLimitStack>
                    </Box>
                    <MessageInputSkeleton />
                </Stack>
            );

        const { tent } = this.props;
        const { campsite } = this.context as CampsiteContext;
        const colorRoles = campsite.roles.filter((x) => x.colors.length);

        return (
            <Stack sx={{ height: "100%", overflow: "hidden" }}>
                <Box flex={1} sx={{ overflow: "hidden" }}>
                    <MessageList
                        colorRoles={colorRoles}
                        replyMessages={this.state.replyMessages}
                        isEnd={this.state.isEnd}
                        messages={this.state.messages}
                        onMessagesLoad={this.onMessagesLoad.bind(this)}
                        onMessageDelete={this.onMessageDelete.bind(this)}
                        addReply={this.addMessageReply.bind(this)}
                    />
                </Box>
                <MessageInputWrapper
                    tentName={tent.name}
                    onCreate={this.onMessageCreate.bind(this)}
                    removeReply={this.removeMessageReply.bind(this)}
                    removeAllReplies={this.removeAllMessageReplies.bind(this)}
                    replyMessages={this.state.replyMessages}
                    colorRoles={colorRoles}
                    canCreate={Boolean(
                        this.context.permissions.getTentPermissions(
                            tent.categoryId,
                            tent.id,
                        ).content & ContentPermissionConsts.CREATE_CONTENT,
                    )}
                />
                <ContentDeleteModal
                    nominativeCase={
                        <FormattedMessageGlobal id="app.messages.nominativeCase" />
                    }
                    accusativeCase={
                        <FormattedMessageGlobal id="app.messages.accusativeCase" />
                    }
                    open={Boolean(this.state.deleteMessage)}
                    ContentRender={this.MessageDeleteRender.bind(this)}
                    onConfirm={() =>
                        this.deleteMessage(this.state.deleteMessage!)
                    }
                    onClose={() => this.setState({ deleteMessage: null })}
                />
            </Stack>
        );
    }
}

const MessageLimitStack = styled(Stack)(() => ({
    flexDirection: "column-reverse",
    overflow: "auto",
    height: "100%",
    paddingBottom: 8,
}));

type MessageListProps = {
    colorRoles: RoleView[];
    isEnd: boolean;
    messages: TextTentMessage[];
    replyMessages: MessageViewWithReplies[];
    onMessagesLoad: () => unknown;
    onMessageDelete: (
        message: MessageViewWithReplies,
        prompt: boolean,
    ) => unknown;
    addReply: (message: MessageViewWithReplies) => unknown;
};

function MessageList({
    replyMessages,
    messages,
    isEnd,
    onMessagesLoad,
    onMessageDelete,
    addReply,
    colorRoles,
}: MessageListProps) {
    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const target = e.target as HTMLDivElement;

        if (-target.scrollTop < target.scrollHeight - target.offsetHeight - 80)
            return;

        return onMessagesLoad();
    };

    return (
        <>
            <MessageLimitStack onScroll={isEnd ? undefined : onScroll}>
                {/* To make You've reached the end always at the top */}
                <Box flex={1}></Box>
                {messages.map((m, i, all) => {
                    const previousMessageDate =
                        all[i + 1] &&
                        new Date(all[i + 1].createdAt).toDateString();
                    const currentMessageDate = new Date(m.createdAt);

                    return (
                        <React.Fragment key={m.id}>
                            <TentMessage
                                key={m.id}
                                colorRoles={colorRoles}
                                message={m}
                                onDelete={onMessageDelete}
                                addReply={addReply}
                                waiting={m.waiting}
                                error={m.error}
                                isBeingRepliedTo={replyMessages.includes(m)}
                            />
                            {previousMessageDate &&
                                previousMessageDate !==
                                    currentMessageDate.toDateString() && (
                                    <TentMessageDivider color="neutral">
                                        {currentMessageDate.toLocaleDateString()}
                                    </TentMessageDivider>
                                )}
                        </React.Fragment>
                    );
                })}
                {isEnd ? (
                    <Stack gap={4} pt={4} pb={2} sx={{ position: "relative" }}>
                        <FadingBox
                            sx={{
                                zIndex: 1,
                                position: "absolute",
                                left: 0,
                                right: 0,
                                bottom: 40,
                                opacity: 0.15,
                            }}
                        >
                            <Group px={4}>
                                <Typography
                                    level="title-lg"
                                    fontSize={64}
                                    sx={{ transform: "rotate(-10deg)" }}
                                >
                                    {textToIcon[PagePlaceholderIcon.NotOk]}
                                </Typography>
                                <Box flex={1}></Box>
                                <Typography
                                    level="title-lg"
                                    fontSize={64}
                                    sx={{ transform: "rotate(10deg)" }}
                                >
                                    {
                                        textToIcon[
                                            PagePlaceholderIcon.Appreciation
                                        ]
                                    }
                                </Typography>
                            </Group>
                        </FadingBox>
                        <PagePlaceholder
                            sx={{ zIndex: 2 }}
                            icon={PagePlaceholderIcon.NoMore}
                            title="You've reached the end"
                        >
                            <FormattedMessage
                                id="app.messages.end"
                                defaultMessage="This is the beginning of this tent. There are no more messages in this tent."
                                description="The very top of the tent that gives user a note that there are no more messages"
                            />
                        </PagePlaceholder>
                        <Divider sx={{ zIndex: 2 }} orientation="horizontal" />
                    </Stack>
                ) : (
                    <FadingBox className="reverse">
                        <TentMessageSkeleton1 />
                        <TentMessageSkeleton2 />
                    </FadingBox>
                )}
            </MessageLimitStack>
        </>
    );
}

function MessageInputWrapper({
    colorRoles,
    canCreate,
    tentName,
    replyMessages,
    onCreate,
    removeReply,
    removeAllReplies,
}: {
    colorRoles: RoleView[];
    canCreate: boolean;
    tentName: string;
    replyMessages: MessageViewWithReplies[];
    removeReply: (message: MessageViewWithReplies) => unknown;
    removeAllReplies: () => unknown;
    onCreate: (content: string) => Promise<unknown>;
}) {
    return (
        <Stack sx={{ px: 2, pb: 2 }} gap={1}>
            {!!replyMessages.length && (
                <Group gap={1} alignItems="center">
                    <Typography level="body-md" textColor="text.tertiary">
                        Replying to{" "}
                    </Typography>
                    {replyMessages.map((msg, i) => {
                        const colorRole = colorRoles.find((role) =>
                            msg.createdBy.roles.includes(role.id),
                        );
                        const colors = colorToDecimal(colorRole?.colors);
                        return (
                            <Link
                                color="neutral"
                                alignItems="center"
                                component="button"
                                onClick={() => removeReply(msg)}
                            >
                                <Group gap={0.5} alignItems="center">
                                    <UserDisplayNoModal
                                        key={`reply-${i}`}
                                        size="sm"
                                        colors={colors}
                                        motion={colorRole?.motion}
                                        user={msg.createdBy.user}
                                    />
                                    <IconCircleXFilled size={16} />
                                </Group>
                            </Link>
                        );
                    })}
                </Group>
            )}
            <Box sx={{ maxHeight: 200 }}>
                {canCreate ? (
                    <MessageEditor
                        placeholder={`Message #${tentName}`}
                        onConfirm={onCreate}
                        onClearReplies={removeAllReplies}
                    />
                ) : (
                    <MessageEditorContainer>
                        <Box sx={{ px: "8px", py: "6px" }}>
                            <Typography
                                textColor="text.tertiary"
                                startDecorator={<IconLockFilled />}
                                gap={0.5}
                            >
                                <FormattedMessage
                                    id="app.messages.noPermission"
                                    defaultMessage="You do not have the permission to type in this tent."
                                    description="Tells user they lack permission to write in the text tent"
                                />
                            </Typography>
                        </Box>
                    </MessageEditorContainer>
                )}
            </Box>
        </Stack>
    );
}

function MessageInputSkeleton() {
    return (
        <Stack sx={{ height: 80, px: 2 }}>
            <Skeleton width="100%" height={52} />
        </Stack>
    );
}
