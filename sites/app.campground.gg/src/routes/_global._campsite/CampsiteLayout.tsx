import { Box } from "@mui/joy";
import { Group } from "components";
import React from "react";
// import type { CampsiteViewDetailed } from "types/campsites";
import TentSidebar, { TentSidebarSkeleton } from "./TentSidebar";
import { CampsiteContextSuiteContext, CurrentTentContext, TentContext } from "./context";
import type { BonfireViewBasic, CampsiteViewDetailed } from "types/campsites";
import type { Session } from "~/context/session/types";
import type { HttpResponseError } from "api/HTTPResponse";
import { ContextSuiteContext, type ContextSuite } from "~/context/context-suite";
import type { NavigateFunction } from "react-router";
import { PermissionsContext } from "~/context/permissions";
import type { WSSubscription } from "api/WSClient";
import type { TypeToPayload } from "types/ws";
import PermissionsManager from "~/context/permissions/PermissionsManager";

type Props = {
    campsiteId: string;
    navigate: NavigateFunction;
} & React.PropsWithChildren;

type State = {
    init: boolean;
    loading: boolean;
    campsite: CampsiteViewDetailed | null;
    err: HttpResponseError | null;
    bonfireSelected: string | null;
    tentSelected: string | null;
};

export default class CampsiteLayout extends React.Component<Props, State, Session> {
    private _currentTent: CurrentTentContext;
    private _permissionsManager: PermissionsManager = null!;
    static contextType?: React.Context<any> | undefined = ContextSuiteContext;
    _updateCampsiteDataBind: (data: Partial<CampsiteViewDetailed>) => unknown;
    private _init: boolean = false;
    private _wsSubscription: WSSubscription | null = null;
    constructor(props: Props, context: any) {
        super(props, context);

        // tentSidebarOpen false by default, so it wouldn't be auto-open on mobile
        this.state = { err: null, campsite: null, init: false, loading: true, bonfireSelected: null, tentSelected: null };

        this._currentTent = new CurrentTentContext(null);
        this._updateCampsiteDataBind = this.updateCampsiteData.bind(this);
        this._currentTent.subscribeToChanges((newValue) =>
            this.setState({ bonfireSelected: newValue?.bonfireId ?? null, tentSelected: newValue?.id ?? null })
        );
    }

    async fetchCampsite() {
        return (this.context as ContextSuite)
            .session
            .http
            .getCampsite(this.props.campsiteId)
            .then((resp) => {
                if (!resp.ok)
                    return this.setState({ err: resp });
                this.sortCampsiteRoles(resp.content);
                this._permissionsManager = new PermissionsManager(resp.content);
                return this.setState({ err: null, campsite: resp.content, init: true, loading: false });
            });
    }
    sortCampsiteRoles(campsite: Pick<CampsiteViewDetailed, "roles">) {
        return campsite.roles.sort((a, b) => (a.flags & 1) == (b.flags & 1) ? (a.priority - b.priority) : a.flags);
    }
    async componentDidMount(): Promise<void> {
        if (this._init)
            return;
        this._init = true;
        this.setCampsiteForWebSocket();

        return this.fetchCampsite();
    }
    async componentDidUpdate(prevProps: Readonly<Props>, _prevState: Readonly<State>, _snapshot?: Session | undefined): Promise<void> {
        if (prevProps.campsiteId == this.props.campsiteId)
            return;

        // To see campsite events
        this.setCampsiteForWebSocket();
        
        this.setState({ loading: true });
        
        return this.fetchCampsite();
    }
    componentWillUnmount(): void {
        (this.context as ContextSuite)
            .session
            .ws
            .unsubscribe(this._wsSubscription!);
    }
    setCampsiteForWebSocket() {
        const ws = (this.context as ContextSuite).session.ws;
        ws.setCampsite(this.props.campsiteId);
        this._wsSubscription = ws.subscribe(message =>
            message.op === 1 && this.onWsMessage(message.t, message.payload)
        );
        return ws;
    }
    onWsMessage<T extends keyof TypeToPayload>(type: T, payload: TypeToPayload[T]) {
        const bonfire = payload as BonfireViewBasic;

        switch (type) {
            case "CampsiteLeft":
                if ((payload as { id: string; }).id === this.props.campsiteId)
                    this.props.navigate("/");
                return;
            case "CampsiteUpdated":
                if ((payload as { id: string; }).id !== this.props.campsiteId)
                    return;
                this.setState({ campsite: Object.assign(this.state.campsite!, payload) });
                break;
            case "BonfireCreated":
                this.setState({ campsite: Object.assign(this.state.campsite!, { bonfires: [...this.state.campsite!.bonfires, bonfire] }) });
                return;
            case "BonfireUpdated":
                const modifiedBonfire = this.state.campsite!.bonfires.findIndex((x) => x.id === bonfire.id);
                if (modifiedBonfire < 0)
                    this.state.campsite!.bonfires.push(bonfire);
                else
                    Object.assign(this.state.campsite!.bonfires[modifiedBonfire], bonfire);
                break;
            case "BonfireDeleted":
                this.setState({ campsite: Object.assign(this.state.campsite!, { bonfires: this.state.campsite!.bonfires.filter((x) => x.id !== bonfire.id) }) });
                return;
        }
        this.setState({});
    }
    updateCampsiteData(data: Partial<CampsiteViewDetailed>) {
        if (data.roles)
            this.sortCampsiteRoles(data as Pick<CampsiteViewDetailed, "roles">);

        this.setState({ campsite: Object.assign(this.state.campsite!, data) });
    }
    render(): React.ReactNode {
        const context = this.context as ContextSuite;
        const { children, navigate } = this.props;
        const { init, loading, bonfireSelected, tentSelected, campsite } = this.state;

        if (!init || loading)
            return (
                <Group sx={{ width: "100%", height: "100%" }} gap={1}>
                    <Box>
                        <TentSidebarSkeleton />
                    </Box>
                </Group>
            );

        return (
            <Group sx={{ width: "100%", height: "100%", overflow: "hidden" }} gap={1}>
                <TentContext.Provider value={this._currentTent}>
                    <PermissionsContext.Provider value={this._permissionsManager}>
                        <CampsiteContextSuiteContext.Provider value={{ ...context, permissions: this._permissionsManager, campsite: campsite!, updateCampsite: this._updateCampsiteDataBind }}>
                            <Box>
                                <TentSidebar
                                    campsite={campsite!}
                                    bonfireSelected={bonfireSelected}
                                    tentSelected={tentSelected}
                                    navigate={navigate}
                                />
                            </Box>
                            {children}
                        </CampsiteContextSuiteContext.Provider>
                    </PermissionsContext.Provider>
                </TentContext.Provider>
            </Group>
        );
    }
}