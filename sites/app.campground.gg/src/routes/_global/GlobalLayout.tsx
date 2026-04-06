import { Stack } from "@mui/joy";
import React, { ReactNode, type ContextType } from "react";
import GlobalNavbar from "./GlobalNavbar";
import type { Me } from "types/me";
import { MeContext, SessionContext } from "~/context/session";
import type { WSSubscription } from "~/api/WSClient";
import type { TypeToPayload } from "types/ws";
import type { CampsiteViewBasic } from "types/campsites";

type Props = {
    page: string | undefined | null;
    children: ReactNode[] | ReactNode;
};

type State = {
    loaded: boolean;
}

export default class GlobalLayout extends React.Component<Props, State> {
    static contextType?: React.Context<any> | undefined = SessionContext;
    declare context: ContextType<typeof SessionContext>;
    private _init: boolean = false;
    state = {
        loaded: false,
    };
    private _me: Me | null = null;
    private _wsSubscription: WSSubscription | null = null;
    async componentDidMount(): Promise<void> {
        if (this._init || this._me)
            return;

        this._init = true;

        if (!this.context.auth.authenticated)
            return this.setState({ loaded: true });

        this._wsSubscription = this.context.ws.subscribe(msg =>
            msg.op === 1 &&
            this.onWsMessage(msg.t, msg.payload)
        );

        return this.context.http
            .getMe()
            .then((resp) => {
                if (!resp.ok) {
                    this.setState({ loaded: true });
                    return console.error("Got error while fetching me:", { description: resp.errorDescription, header: resp.errorHeader, status: resp.status });
                }

                this._me = resp.content;
                return this.setState({ loaded: true });
            });
    }
    componentWillUnmount(): void {
        this.context.ws.unsubscribe(this._wsSubscription!);
    }
    onWsMessage<T extends keyof TypeToPayload>(type: T, payload: TypeToPayload[T]) {
        switch(type) {
            case "CampsiteLeft":
                const index = this._me?.campsites.findIndex((x) => x.id === (payload as TypeToPayload["CampsiteLeft"]).id);
                if ((index ?? -1) >= 0)
                    this._me?.campsites.splice(index!, 1);
                break;
            case "CampsiteUpdated":
                const campsiteUpdated = this._me?.campsites.find((x) => (payload as TypeToPayload["CampsiteUpdated"]).id === x.id);

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
    render() {
        const { page, children } = this.props;
        const { _me } = this;
        const { loaded } = this.state;

        return (
            <Stack alignItems="stretch" sx={{ flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "column" }, width: "100%", height: "100%", overflow: "hidden" }}>
                <MeContext.Provider value={_me}>
                    <GlobalNavbar page={page} loaded={loaded} />
                    <Stack sx={{ flex: 1, height: "100%", overflow: "hidden" }}>
                        { children }
                    </Stack>
                </MeContext.Provider>
            </Stack>
        )
    }
}