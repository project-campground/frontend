import { Alert, Box, Divider, Link, Skeleton, Stack, styled, Typography } from "@mui/joy";
import type { RestResponseError } from "api/RESTResponse";
import React from "react";
import type { TentMessageViewBasic, TentMessageViewWithReplies } from "types/content";
import type { TentViewDetailed } from "types/tent";
import MessageEditor, { MessageEditorContainer } from "~/components/editor/MessageEditor";
import PagePlaceholder, { PagePlaceholderIcon, textToIcon } from "~/components/pages/PagePlaceholder";
import TentMessage, { TentMessageSkeleton1, TentMessageSkeleton2 } from "~/components/tents/TentMessage";
import ContentDeleteModal from "../../layout/ContentDeleteModal";
import { IconCircleXFilled, IconExclamationCircleFilled, IconLockFilled } from "@tabler/icons-react";
import { UserDisplayNoModal } from "~/components/UserDisplay";
import { Group } from "components";
import FadingBox from "~/components/pages/FadingBox";
import { type ContextSuite } from "~/context/context-suite";
import { TentPermissionConsts } from "~/util/permissions";
import { CampsiteContextSuiteContext, type CampsiteContextSuite } from "../_global._campsite/context";
import { PermissionsContext } from "~/context/permissions";
import type { CampsiteRoleView } from "types/campsites";
import { getColorFromSet } from "~/util/color";
import TentMessageDivider from "~/components/tents/TentMessageDivider";
import { type WebSocketSubscription } from "api/WebSocketClient";

type Props = {
    campsiteId: string;
    tent: TentViewDetailed;
};

export type TextTentMessage = TentMessageViewWithReplies & { waiting?: true; error?: string; };

type State = {
    messages: TextTentMessage[];
    loading: boolean;
    error: RestResponseError | null;
    isEnd: boolean;
    deleteMessage: TentMessageViewWithReplies | null;
    replyMessages: TentMessageViewWithReplies[];
};

export default class TextTent extends React.Component<Props, State, ContextSuite> {
    static contextType?: React.Context<any> | undefined = CampsiteContextSuiteContext;
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
    private _wsSubscription: WebSocketSubscription | null = null;

    async componentDidMount(): Promise<void> {
        if (this._initLock)
            return;
        
        this._initLock = true;
        const session = (this.context as CampsiteContextSuite).session;
        this._wsSubscription = session.webSocket
            .subscribe((ev) => {
                if (ev.op !== 1)
                    return;

                return this.onWebSocketEvent(ev.t, ev.payload);
            });
            
            return this.fetchMessages(0)
            .then((messages) =>
                messages && this.setState({ messages, loading: false, isEnd: messages.length < 50 })
        );
    }
    
    private onWebSocketEvent(type: string, payload: any) {
        const message = payload as TentMessageViewBasic;
        if (message.tentId !== this.props.tent.id)
            return;
        switch (type) {
            case "MessageCreated":
                if (this.state.messages.some((x) => x.id === message.id))
                    return;

                this.setState({ messages: [ { ...message, replyingTo: [], replyingToCount: message.replyingTo.length }, ...this.state.messages ] })
                break;
            case "MessageUpdated":
                const updatedMessageIndex = this.state.messages.findIndex((x) => x.id === message.id);
                if (updatedMessageIndex < 0)
                    return;

                Object.assign(this.state.messages[updatedMessageIndex], { content: message.content, updatedAt: message.updatedAt });
                break;
            case "MessageDeleted":
                const deletedMessageIndex = this.state.messages.findIndex((x) => x.id === message.id);
                if (deletedMessageIndex < 0)
                    return;

                this.state.messages.splice(deletedMessageIndex, 1);
                this.setState({ replyMessages: this.state.replyMessages.filter((x) => x.id !== message.id)});
                // Already has been updated
                return;
            default:
                return;
        }
        this.setState({});
    }

    async fetchMessages(offset: number = 0) {
        const { session } = this.context as CampsiteContextSuite;

        const { tent } = this.props;

        return session
            .restClient!
            .getTentMessages(tent.id, offset)
            .then((resp) => {
                if (!resp.ok)
                    return this.setState({ error: resp, loading: false });

                return resp.content.messages;// this.setState({ messages: resp.content.messages, isEnd: resp.content.messages.length < 50, loading: false });
            });
    }

    async componentDidUpdate(prevProps: Readonly<Props>, _prevState: Readonly<State>, _snapshot?: ContextSuite | undefined): Promise<void> {
        if (!this._initLock || this._lock || prevProps.tent.id === this.props.tent.id)
            return;

        this._lock = true;
        this.setState({ loading: true });

        return this
            .fetchMessages(0)
            .then((messages) =>
                messages && !(this._lock = false) && this.setState({ messages, isEnd: messages.length < 50, loading: false })
            );
    }

    componentWillUnmount(): void {
        if (!this._wsSubscription)
            return;

        (this.context as CampsiteContextSuite).session.webSocket.unsubscribe(
            this._wsSubscription
        );
    }

    async onMessageCreate(content: string): Promise<unknown> {
        const { session, campsite } = this.context as CampsiteContextSuite;
        const replyMessages = this.state.replyMessages;

        // For user's messages to not randomly appear after a year (not literally)
        const fakeMessage: TextTentMessage = {
            id: (Math.floor(Math.random() * 9000) + 1000).toString(),
            replyingTo: replyMessages.map((x) => ({ ...x, replyingTo: x.replyingTo.map((y) => y.id) }) as TentMessageViewBasic),
            replyingToCount: replyMessages.length,
            campsiteId: this.props.tent.bonfireId,
            bonfireId: this.props.tent.bonfireId,
            tentId: this.props.tent.id,
            content,
            createdBy: { isMember: true, ...campsite.member },
            createdAt: new Date().toISOString(),
            waiting: true,
        };
        this.setState({ replyMessages: [], messages: [fakeMessage, ...this.state.messages] });
        this.pseudoMessages.push(fakeMessage.id);

        return session
            .restClient!
            .createTentMessage(this.props.tent.id, { content, replies: replyMessages.map((x) => x.id) })
            .then((resp) => {
                if (!resp.ok)
                    return this.setState({ messages: [{ ...fakeMessage, error: resp.errorDescription }, ...this.state.messages.filter((x) => x.id !== fakeMessage.id)] })

                this.pseudoMessages = this.pseudoMessages.filter((x) => x === fakeMessage.id);
                const replyingTo = replyMessages.map((x) => ({ ...x, replyingTo: x.replyingTo.map((y) => y.id), }));
                return this.setState({ messages: [{ ...resp.content, replyingToCount: resp.content.replyingTo?.length ?? 0, replyingTo, }, ...this.state.messages.filter((x) => x.id !== fakeMessage.id)] })
            });
    }

    async onMessagesLoad() {
        if (this._lock)
            return;

        this._lock = true;
        return this.fetchMessages(this.state.messages.length)
            .then((messages) =>
                messages && !(this._lock = false) && this.setState({ messages: [...this.state.messages, ...messages], isEnd: messages.length < 50 })
        );
    }

    onMessageDeletePrompt(message: TentMessageViewWithReplies) {
        return this.setState({ deleteMessage: message });
    }

    MessageDeleteRender() {
        if (!this.state.deleteMessage)
            return (
                <Alert color="warning" variant="soft" startDecorator={<IconExclamationCircleFilled />}>Could not render message.</Alert>
            );

        return (
            <TentMessage
                hideToolbar
                message={this.state.deleteMessage}
                promptDelete={() => null}
                addReply={() => null}
            />
        );
    }

    async onMessageDelete() {
        const { floaters } = this.context as CampsiteContextSuite;
        const messageDeleted = this.state.deleteMessage!;

        // To not do random useless requests and keep them
        if (this.pseudoMessages.includes(messageDeleted.id))
            return this.setState({ deleteMessage: null, messages: this.state.messages.filter((x) => x.id !== messageDeleted.id) });
    
        this.setState({ deleteMessage: null });

        return (this.context as ContextSuite).session.restClient
            ?.deleteTentMessage(this.props.tent.id, messageDeleted.id)
            .then((resp) => {
                if (!resp.ok)
                    return (floaters.notifyError(`${resp.status} ${resp.errorHeader}: ${resp.errorDescription}`), this.setState({ deleteMessage: null }));
            });
    }

    addMessageReply(message: TentMessageViewWithReplies) {
        if (this.state.replyMessages.length >= 5)
            return;
        else if (this.state.replyMessages.includes(message))
            return this.setState({ replyMessages: this.state.replyMessages.filter((x) => x !== message) });
        
        return this.setState({ replyMessages: [...this.state.replyMessages, message] });
    }
    
    removeMessageReply(message: TentMessageViewWithReplies) {
        return this.setState({ replyMessages: this.state.replyMessages.filter((x) => x !== message) });
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
        const { campsite } = this.context as CampsiteContextSuite;
        const colorRoles = campsite.roles.filter((x) => x.color || x.colorSecondary);

        return (
            <Stack sx={{ height: "100%", overflow: "hidden" }}>
                <Box flex={1} sx={{ overflow: "hidden" }}>
                    <MessageList
                        colorRoles={colorRoles}
                        replyMessages={this.state.replyMessages}
                        isEnd={this.state.isEnd}
                        messages={this.state.messages}
                        onMessagesLoad={this.onMessagesLoad.bind(this)}
                        promptMessageDelete={this.onMessageDeletePrompt.bind(this)}
                        addReply={this.addMessageReply.bind(this)}
                    />
                </Box>
                <PermissionsContext.Consumer>
                    {permissions =>
                        <MessageInputWrapper
                            tentName={tent.name}
                            onCreate={this.onMessageCreate.bind(this)}
                            removeReply={this.removeMessageReply.bind(this)}
                            replyMessages={this.state.replyMessages}
                            colorRoles={colorRoles}
                            canCreate={Boolean(permissions.getTentPermissions(tent.categoryId, tent.id).tent & TentPermissionConsts.CREATE_CONTENT)}
                        />
                    }
                </PermissionsContext.Consumer>
                <ContentDeleteModal
                    title="message"
                    open={Boolean(this.state.deleteMessage)}
                    ContentRender={this.MessageDeleteRender.bind(this)}
                    onConfirm={this.onMessageDelete.bind(this)}
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
    colorRoles: CampsiteRoleView[];
    isEnd: boolean;
    messages: TextTentMessage[];
    replyMessages: TentMessageViewWithReplies[];
    onMessagesLoad: () => unknown;
    promptMessageDelete: (message: TentMessageViewWithReplies) => unknown;
    addReply: (message: TentMessageViewWithReplies) => unknown;
};

function MessageList({ replyMessages, messages, isEnd, onMessagesLoad, promptMessageDelete, addReply, colorRoles }: MessageListProps) {
    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const target = e.target as HTMLDivElement;

        if (-target.scrollTop < (target.scrollHeight - target.offsetHeight - 80))
            return;

        return onMessagesLoad();
    };

    return (
        <>
            <MessageLimitStack onScroll={isEnd ? undefined : onScroll}>
                {/* To make You've reached the end always at the top */}
                <Box flex={1}></Box>
                {messages.map((m, i, all) => {
                    const previousMessageDate = all[i + 1] && new Date(all[i + 1].createdAt).toDateString();
                    const currentMessageDate = new Date(m.createdAt);

                    return (
                        <React.Fragment key={m.id}>
                            <TentMessage
                                key={m.id}
                                colorRoles={colorRoles}
                                message={m}
                                promptDelete={promptMessageDelete}
                                addReply={addReply}
                                waiting={m.waiting}
                                error={m.error}
                                isBeingRepliedTo={replyMessages.includes(m)}
                            />
                            {previousMessageDate && previousMessageDate !== currentMessageDate.toDateString() &&
                                <TentMessageDivider color="neutral">
                                    {currentMessageDate.toLocaleDateString()}
                                </TentMessageDivider>
                            }
                        </React.Fragment>
                    );
                })}
                {isEnd ?
                    <Stack gap={4} pt={4} pb={2} sx={{ position: "relative" }}>
                        <FadingBox sx={{ zIndex: 1, position: "absolute", left: 0, right: 0, bottom: 40, opacity: 0.15 }}>
                            <Group px={4}>
                                <Typography level="title-lg" fontSize={64} sx={{ transform: "rotate(-10deg)" }}>
                                    {textToIcon[PagePlaceholderIcon.NotOk]}
                                </Typography>
                                <Box flex={1}></Box>
                                <Typography level="title-lg" fontSize={64} sx={{ transform: "rotate(10deg)" }}>
                                    {textToIcon[PagePlaceholderIcon.Appreciation]}
                                </Typography>
                            </Group>
                        </FadingBox>
                        <PagePlaceholder sx={{ zIndex: 2 }} icon={PagePlaceholderIcon.NoMore} title="You've reached the end">
                            This is the beginning of this tent. There are no more messages in this tent.
                        </PagePlaceholder>
                        <Divider sx={{ zIndex: 2 }} orientation="horizontal" />
                    </Stack>
                : <FadingBox className="reverse">
                    <TentMessageSkeleton1 />
                    <TentMessageSkeleton2 />
                </FadingBox>}
            </MessageLimitStack>
        </>
    );
}

function MessageInputWrapper({ colorRoles, canCreate, tentName, replyMessages, onCreate, removeReply }: { colorRoles: CampsiteRoleView[], canCreate: boolean, tentName: string, replyMessages: TentMessageViewWithReplies[], removeReply: (message: TentMessageViewWithReplies) => unknown, onCreate: (content: string) => Promise<unknown> }) {
    return (
        <Stack sx={{ px: 2, pb: 2 }} gap={1}>
            {!!replyMessages.length && <Group gap={1} alignItems="center">
                <Typography level="body-md" textColor="text.tertiary">Replying to </Typography>
                {replyMessages.map((msg, i) => {
                    const colorRole = colorRoles.find((role) => msg.createdBy.roles.includes(role.id));
                    const colors = getColorFromSet(colorRole?.color, colorRole?.colorSecondary);
                    return (
                        <Link color="neutral" alignItems="center" component="button" onClick={() => removeReply(msg)}>
                            <Group gap={0.5} alignItems="center">
                                <UserDisplayNoModal
                                    key={`reply-${i}`}
                                    size="sm"
                                    colors={colors}
                                    user={msg.createdBy.user}
                                    />
                                <IconCircleXFilled size={16} />
                            </Group>
                        </Link>
                    );
                })}
            </Group>}
            <Box sx={{ maxHeight: 200 }}>
                {canCreate
                ? <MessageEditor placeholder={`Message #${tentName}`} onConfirm={onCreate} />
                : <MessageEditorContainer>
                    <Box sx={{ px: "12px", py: "6px" }}>
                        <Typography textColor="text.tertiary" startDecorator={<IconLockFilled />}>You do not have the permission to type in this tent.</Typography>
                    </Box>
                </MessageEditorContainer>}
            </Box>
        </Stack>
    );
}

function MessageInputSkeleton() {
    return (
        <Stack sx={{ height: 80, px: 2, }}>
            <Skeleton width="100%" height={52} />
        </Stack>
    );
}