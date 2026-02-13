import { Stack } from "@mui/joy";
import React, { ReactNode } from "react";
import GlobalNavbar from "./GlobalNavbar";
import type { Me } from "types/me";
import { MeContext, SessionContext } from "~/context/session";
import type { Session } from "~/context/session/types";

type Props = {
    page: string | undefined | null;
    children: ReactNode[] | ReactNode;
};

type State = {
    me: Me | null;
    loaded: boolean;
}

export default class GlobalLayout extends React.Component<Props, State> {
    static contextType?: React.Context<any> | undefined = SessionContext;
    private init: boolean = false;
    state = {
        me: null,
        loaded: false,
    };
    async componentDidMount(): Promise<void> {
        if (this.init)
            return;

        this.init = true;
        const session = (this.context as Session);

        if (!session.auth.authenticated)
            return this.setState({ loaded: true });

        return session.restClient!
            .getMe()
            .then((resp) => {
                if (!resp.ok) {
                    this.setState({ loaded: true });
                    return console.error("Got error while fetching me:", { description: resp.errorDescription, header: resp.errorHeader, status: resp.status });
                }

                return this.setState({ me: resp.content, loaded: true });
            });
    }
    render() {
        const { page, children } = this.props;
        const { me, loaded } = this.state;

        return (
            <Stack alignItems="stretch" sx={{ flexDirection: { sm: "column-reverse", md: "column" }, width: "100%", height: "100%", overflow: "hidden" }}>
                <MeContext.Provider value={me}>
                    <GlobalNavbar page={page} loaded={loaded} />
                    <Stack sx={{ flex: 1, height: "100%", overflow: "hidden" }}>
                        { children }
                    </Stack>
                </MeContext.Provider>
            </Stack>
        )
    }
}