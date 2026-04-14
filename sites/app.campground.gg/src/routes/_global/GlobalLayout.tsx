import { Stack, Modal } from "@mui/joy";
import React, { ReactNode, type ContextType } from "react";
import GlobalNavbar from "./GlobalNavbar";
import { SessionContext } from "~/context/session";
import { AccountContext } from "~/context/account";
import type { WSSubscription } from "~/api/WSClient";
import type { TypeToPayload } from "types/ws";
import type { CampsiteViewBasic } from "types/campground/campsites";
import UserSettingsModal from "~/layout/user/UserSettingsModal";
import type { Me } from "types/campground/me";
import type { GetSession } from "types/atproto/session";

type Props = {
    page: string | undefined | null;
    children: ReactNode[] | ReactNode;
};

type State = {
    loaded: boolean;
    userSettingsOpen: boolean;
};

export default class GlobalLayout extends React.Component<Props, State> {
    static contextType?: React.Context<any> | undefined = SessionContext;
    declare context: ContextType<typeof SessionContext>;

    private _init: boolean = false;
    private _wsSubscription: WSSubscription | null = null;
    private _me: Me | null = null;
    private _pdsSession: GetSession | null = null;

    state = {
        loaded: false,
        userSettingsOpen: false,
    };

    constructor(props: Props, context: ContextType<typeof SessionContext>) {
        super(props, context);
    }

    async componentDidMount(): Promise<void> {
        if (this._init) return;

        this._init = true;

        if (!this.context.auth.authenticated)
            return this.setState({ loaded: true });

        this._wsSubscription = this.context.ws.subscribe(
            (msg) => msg.op === 1 && this.onWsMessage(msg.t, msg.payload),
        );

        return Promise.all([
            this.context.http.getSession(),
            this.context.http.getMe(),
        ]).then((resps) => {
            const badResp = (
                resps.slice(0, 2) as [(typeof resps)[0], (typeof resps)[1]]
            ).find((x) => !x.ok);

            if (badResp)
                throw new Error(
                    `Error while fetching ${badResp.url.split("/").slice(4).join("/")}: ${badResp.status} ${badResp.errorHeader}: ${badResp.errorDescription}`,
                );

            const [fetchedPdsSession, fetchedMe] = resps;
            console.log({ fetchedPdsSession, fetchedMe });
            this._me = fetchedMe.content!;
            this._pdsSession = fetchedPdsSession.content!;

            return this.setState({ loaded: true });
        });
    }
    componentWillUnmount(): void {
        this.context.ws.unsubscribe(this._wsSubscription!);
    }
    onWsMessage<T extends keyof TypeToPayload>(
        type: T,
        payload: TypeToPayload[T],
    ) {
        switch (type) {
            case "CampsiteLeft":
                const index = this._me?.campsites.findIndex(
                    (x) =>
                        x.id === (payload as TypeToPayload["CampsiteLeft"]).id,
                );
                if ((index ?? -1) >= 0) this._me?.campsites.splice(index!, 1);
                break;
            case "CampsiteUpdated":
                const campsiteUpdated = this._me?.campsites.find(
                    (x) =>
                        (payload as TypeToPayload["CampsiteUpdated"]).id ===
                        x.id,
                );

                if (campsiteUpdated) {
                    Object.assign(campsiteUpdated, payload);
                    break;
                }

                this._me?.campsites.push(payload as CampsiteViewBasic);
                break;
            case "CampsiteCreated":
            case "CampsiteJoined":
                this._me?.campsites.push(payload as CampsiteViewBasic);
                break;
            default:
                return;
        }
        this.setState({});
    }
    openUserSettings = () => this.setState({ userSettingsOpen: true });
    render() {
        const { page, children } = this.props;
        const { _me, _pdsSession } = this;
        const { loaded, userSettingsOpen } = this.state;

        return (
            <Stack
                alignItems="stretch"
                sx={{
                    flexDirection: {
                        xs: "column-reverse",
                        sm: "column-reverse",
                        md: "column",
                    },
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                }}
            >
                <AccountContext.Provider
                    value={
                        loaded
                            ? this.context.auth.authenticated
                                ? {
                                      authenticated: true,
                                      me: _me!,
                                      account: _pdsSession!,
                                      openUserSettings: this.openUserSettings,
                                  }
                                : { authenticated: false }
                            : null
                    }
                >
                    <GlobalNavbar page={page} loaded={loaded} />
                    <Stack sx={{ flex: 1, height: "100%", overflow: "hidden" }}>
                        {children}
                    </Stack>
                    <Modal
                        open={userSettingsOpen}
                        onClose={() =>
                            this.setState({ userSettingsOpen: false })
                        }
                    >
                        <UserSettingsModal />
                    </Modal>
                </AccountContext.Provider>
            </Stack>
        );
    }
}
