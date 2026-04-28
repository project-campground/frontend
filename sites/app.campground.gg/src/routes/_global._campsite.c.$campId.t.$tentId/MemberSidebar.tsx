import { Stack, styled, Tabs, Typography } from "@mui/joy";
import { IconListTree, IconUsers } from "@tabler/icons-react";
import type { HttpResponseError } from "~/api/http/HTTPResponse";
import React, { type ContextType } from "react";
import MarkdownWrapper from "~/components/markdown/MarkdownWrapper";
import type { Session } from "~/context/session/types";
import type { MemberViewBasic } from "types/campground/membership";
import MemberList from "./MemberList";
import { CampsiteContext } from "../_global._campsite/context";
import { SmoothTabList } from "campground-ui";
import { FormattedMessageGlobal } from "~/i18n";
import type { TentViewBasic } from "types/campground/tent";

type Props = {
    campsiteId: string;
    tent: TentViewBasic;
    closed?: boolean;
} & React.PropsWithChildren;
type State = {
    loading: boolean;
    end: boolean;
    error: HttpResponseError | null;
    tab: number;
    members: MemberViewBasic[];
};

export const RightSidebarBox = styled(Stack, {
    name: "CampsiteSidebar",
    slot: "wrapper",
})(() => ({
    gap: 4,
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
    backgroundColor: theme.vars.palette.background.surface,
    borderRadius: theme.vars.radius.xl,
    boxShadow: theme.vars.shadow.lg,
    border: `solid 1px ${theme.vars.palette.neutral.border}`,
    padding: 5,
}));

export default class MemberSidebar extends React.Component<
    Props,
    State
> {
    static contextType?: React.Context<any> | undefined = CampsiteContext;
    declare context: ContextType<typeof CampsiteContext>;

    private init: boolean = false;
    state: State = {
        loading: true,
        end: false,
        error: null,
        tab: 0,
        members: [],
    };
    constructor(props: Props, context: Session) {
        super(props, context);
    }
    async componentDidMount(): Promise<void> {
        if (this.init) return;

        this.init = true;

        return this.initFetchMembers();
    }
    async componentDidUpdate(
        _prevProps: Readonly<Props>,
        _prevState: Readonly<State>,
        _snapshot?: any,
    ): Promise<void> {
        if (this.init || !this.state.loading) return;
        // else if (_prevProps.tent.id !== this.props.tent.id)
        //     return this.initFetchMembers();

        return this.fetchMembers(this.state.members.length).then((x) => {
            if (!x.ok) return this.setState({ error: x, loading: false });

            return this.setState({
                members: [...this.state.members, ...x.content.members],
                end: x.content.members.length < 50,
                loading: false,
            });
        });
    }
    async initFetchMembers(): Promise<void> {
        return this.fetchMembers(0).then((resp) => {
            if (!resp.ok) return this.setState({ loading: false, error: resp });

            return this.setState({
                loading: false,
                members: resp.content.members,
                end: resp.content.members.length < 50,
            });
        });
    }
    async fetchMembers(offset: number) {
        return this.context.api.members.getMany(
            this.props.campsiteId,
            offset,
        );
    }
    render(): React.ReactNode {
        const { closed, tent, children } = this.props;

        return (
            <RightSidebarBox className={closed ? "closed" : ""}>
                {children && <RightSidebarList>{children}</RightSidebarList>}
                {tent.description && (
                    <RightSidebarList sx={{ px: 2, py: 1.5 }}>
                        <Typography level="title-md" fontWeight={700}>
                            <FormattedMessageGlobal id="info.topic" />
                        </Typography>
                        <MarkdownWrapper>{tent.description}</MarkdownWrapper>
                    </RightSidebarList>
                )}
                <RightSidebarList flex={1}>
                    <Tabs
                        onChange={(_, v) =>
                            this.setState({ tab: (v ?? 0) as number })
                        }
                        size="lg"
                        sx={{ mb: 1, borderRadius: "xl", overflow: "hidden" }}
                    >
                        <SmoothTabList
                            tabs={[
                                {
                                    id: 0,
                                    startDecorator: <IconUsers />,
                                    name: (
                                        <FormattedMessageGlobal id="app.members" />
                                    ),
                                },
                                {
                                    id: 1,
                                    startDecorator: <IconListTree />,
                                    name: (
                                        <FormattedMessageGlobal id="app.threads" />
                                    ),
                                },
                            ]}
                        />
                    </Tabs>
                    <CampsiteContext.Consumer>
                        {(ctx) => (
                            <MemberList
                                campsiteId={this.props.campsiteId}
                                memberCount={this.context.campsite.memberCount}
                                members={this.state.members}
                                roles={ctx.campsite.roles}
                            />
                        )}
                    </CampsiteContext.Consumer>
                </RightSidebarList>
            </RightSidebarBox>
        );
    }
}
