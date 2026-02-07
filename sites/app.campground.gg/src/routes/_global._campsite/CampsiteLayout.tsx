import { Box } from "@mui/joy";
import { Group } from "components";
import React from "react";
// import type { CampsiteViewDetailed } from "types/campsites";
import TentSidebar, { TentSidebarSkeleton } from "./TentSidebar";
import { CampsiteContext, CampsiteContextSuiteContext, CurrentTentContext, TentContext } from "./context";
import type { CampsiteViewDetailed } from "types/campsites";
import type { Session } from "~/context/session/types";
import type { RestResponseError } from "api/RESTResponse";
import { ContextSuiteContext, type ContextSuite } from "~/context/context-suite";
import type { NavigateFunction } from "react-router";
import { getPermissionsContextValue, ownerPermissions, PermissionsContext } from "~/context/permissions";

type Props = {
    campsiteId: string;
    navigate: NavigateFunction;
} & React.PropsWithChildren;

type State = {
    init: boolean;
    loading: boolean;
    campsite: CampsiteViewDetailed | null;
    err: RestResponseError | null;
    bonfireSelected: string | null;
    tentSelected: string | null;
};

export default class CampsiteLayout extends React.Component<Props, State, Session> {
    currentTent: CurrentTentContext;
    static contextType?: React.Context<any> | undefined = ContextSuiteContext;
    constructor(props: Props, context: any) {
        super(props, context);

        // tentSidebarOpen false by default, so it wouldn't be auto-open on mobile
        this.state = { err: null, campsite: null, init: false, loading: true, bonfireSelected: null, tentSelected: null };

        this.currentTent = new CurrentTentContext(null);
        this.currentTent.subscribeToChanges((newValue) =>
            this.setState({ bonfireSelected: newValue?.bonfireId ?? null, tentSelected: newValue?.id ?? null })
        );
    }
    async fetchCampsite() {
        return (this.context as ContextSuite).session.restClient!
            .getCampsite(this.props.campsiteId)
            .then((resp) => {
                if (!resp.ok)
                    return this.setState({ err: resp });
                resp.content.roles.sort((a, b) => a.priority - b.priority);
                return this.setState({ err: null, campsite: resp.content, init: true, loading: false });
            });
    }
    async componentDidMount(): Promise<void> {
        if (this.state.init)
            return;

        this.setState({ init: true });
        
        return this.fetchCampsite();
    }
    async componentDidUpdate(prevProps: Readonly<Props>, _prevState: Readonly<State>, _snapshot?: Session | undefined): Promise<void> {
        if (prevProps.campsiteId == this.props.campsiteId)
            return;
        
        this.setState({ loading: true });

        return this.fetchCampsite();
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
                <Box>
                    <TentSidebar
                        campsite={campsite!}
                        bonfireSelected={bonfireSelected}
                        tentSelected={tentSelected}
                        navigate={navigate}
                    />
                </Box>
                <TentContext.Provider value={this.currentTent}>
                    <CampsiteContext.Provider value={campsite!}>
                        <CampsiteContextSuiteContext.Provider value={{ ...context, campsite: campsite! }}>
                            <PermissionsContext.Provider value={this.currentTent.value ? getPermissionsContextValue(campsite!, this.currentTent.value.permissions) : ownerPermissions}>
                                {children}
                            </PermissionsContext.Provider>
                        </CampsiteContextSuiteContext.Provider>
                    </CampsiteContext.Provider>
                </TentContext.Provider>
            </Group>
        );
    }
}