import { Stack, styled, Tab, TabList, Tabs, Typography } from "@mui/joy";
import { IconListTree, IconUsers } from "@tabler/icons-react";
import type { RestResponseError } from "api/RESTResponse";
import React from "react";
import type { TentViewDetailed } from "types/tent";
import MarkdownWrapper from "~/components/markdown/MarkdownWrapper";
import { SessionContext } from "~/context/session";
import type { Session } from "~/context/session/types";
import type { CampsiteMemberViewBasic, CampsiteViewDetailed } from "types/campsites";
import MemberList from "./MemberList";
import { CampsiteContext } from "../_global._campsite/context";

type Props = {
    campsiteId: string;
    campsite: CampsiteViewDetailed;
    tent: TentViewDetailed;
    closed?: boolean;
} & React.PropsWithChildren;
type State = {
    loading: boolean;
    init: boolean;
    end: boolean;
    error: RestResponseError | null;
    tab: number;
    members: CampsiteMemberViewBasic[];
};

export const RightSidebarBox = styled(Stack, {
    name: "CampsiteSidebar",
    slot: "wrapper",
})(() => ({
    width: 320,
    height: "100%",
    transition: "width 0.3s",
    ".closed": {
        width: 0,
    },
}));
export const RightSidebarList = styled(Stack, {
    name: "CampsiteSidebar",
    slot: "root",
})(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.level1,
    borderRadius: theme.vars.radius.xl,
    padding: 5,
}));

export default class MemberSidebar extends React.Component<Props, State, Session> {
    static contextType?: React.Context<any> | undefined = SessionContext;
    state: State = {
        loading: true,
        init: false,
        end: false,
        error: null,
        tab: 0,
        members: [],
    };
    constructor(props: Props, context: Session) {
        super(props, context);
    }
    async componentDidMount(): Promise<void> {
        if (this.state.init)
            return;

        this.setState({ init: true });

        return this.initFetchMembers();
    }
    async componentDidUpdate(_prevProps: Readonly<Props>, _prevState: Readonly<State>, _snapshot?: any): Promise<void> {
        if (this.state.init || !this.state.loading)
            return;
        // else if (_prevProps.tent.id !== this.props.tent.id)
        //     return this.initFetchMembers();

        return this
            .fetchMembers(this.state.members.length)
            .then((x) => {
                if (!x.ok)
                    return this.setState({ error: x, loading: false });
                
                return this.setState({
                    members: [...this.state.members, ...x.content.members],
                    end: x.content.members.length < 50,
                    loading: false
                });
            });
    }
    async initFetchMembers(): Promise<void> {
        return this.fetchMembers(0)
            .then((resp) => {
                if (!resp.ok)
                    return this.setState({ loading: false, error: resp });

                return this.setState({ loading: false, members: resp.content.members, end: resp.content.members.length < 50 });
            });
    }
    async fetchMembers(offset: number) {
        return (this.context as Session).restClient!.getMembers(this.props.campsiteId, offset);
    }
    render(): React.ReactNode {
        const { closed, tent, children } = this.props;

        return (
            <RightSidebarBox gap={1} className={closed ? "closed" : ""}>
                {children && <RightSidebarList>
                    {children}
                </RightSidebarList>}
                {tent.description && <RightSidebarList sx={{ px: 2, py: 1.5 }}>
                    <Typography level="title-md">Channel topic</Typography>
                    <MarkdownWrapper>
                        {tent.description}
                    </MarkdownWrapper>
                </RightSidebarList>}
                <RightSidebarList flex={1}>
                    <Tabs onChange={(_, v) => this.setState({ tab: (v ?? 0) as number })} size="lg" sx={{ mb: 1, borderRadius: "xl", overflow: "hidden" }}>
                        <TabList>
                            <Tab value={0}>
                                <IconUsers />
                                Members
                            </Tab>
                            <Tab value={1}>
                                <IconListTree />
                                Threads
                            </Tab>
                        </TabList>
                    </Tabs>
                    <CampsiteContext.Consumer>
                        {campsite =>
                            <MemberList
                                memberCount={1}
                                members={this.state.members}
                                roles={campsite.roles}
                            />
                        }
                    </CampsiteContext.Consumer>
                </RightSidebarList>
                {/* <Button startDecorator={<IconUserPlus />} variant="outlined" color="neutral" sx={(theme) => ({ border: `dashed 1px ${theme.vars.palette.neutral[500]}` })}>
                    Invite users
                </Button> */}
            </RightSidebarBox>
        );
    }
}