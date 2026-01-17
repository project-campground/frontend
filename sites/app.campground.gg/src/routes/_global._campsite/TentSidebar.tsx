import { Avatar, Box, Dropdown, IconButton, ListItemContent, ListItemDecorator, Menu, MenuButton, MenuItem, Skeleton, Stack, styled, Tooltip, Typography } from "@mui/joy";
import { IconCampfire, IconDots, IconSettings2, IconTicket } from "@tabler/icons-react";
import type { RestResponseError } from "api/RESTResponse";
import { Group } from "components";
import React from "react";
import type { BonfireViewBasic, BonfireViewDetailed, CampsiteViewDetailed } from "types/campsites";
import type { GetTentsOutput } from "types/tent";
import FadingBanner from "~/components/FadingBanner";
import GradientBanner from "~/components/GradientBanner";
import { SessionContext } from "~/context/session";
import type { Session } from "~/context/session/types";
import TentList, { TentStyledList } from "./TentList";
import BonfireListMenu from "./BonfireListMenu";
import { TentItemSkeleton } from "./TentItem";
import { TentCategorySkeleton } from "./TentCategory";

type Props = {
    campsite: CampsiteViewDetailed;
    bonfireSelected: string | null;
    tentSelected: string | null;
};
type State = {
    groupMenuOpen: boolean;
    bonfireSelected: BonfireViewBasic;
    loading: boolean;
    init: boolean;
    error: RestResponseError | null;
};

export const TentSidebarBox = styled(Box, {
    name: "CampsiteSidebar",
    slot: "root",
})(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.level1,
    minWidth: 320,
    borderRadius: theme.vars.radius.xl,
    height: "100%",
    paddingTop: "5px",
}));
export const TentSidebarBannerWrapper = styled(Box, {
    name: "BonfireBanner",
    slot: "banner",
})(({ theme }) => ({
    borderRadius: theme.vars.radius.xl,
    overflow: "hidden",
    position: "relative",
    height: 128,
    margin: `0 5px`,
    zIndex: 3,
    cursor: "pointer"
}));
export const TentSidebarTopBar = styled(Group)(() => ({
    alignItems: "center",
    padding: "0 8px",
    gap: 8,
}));

const menuTopDesktop = 65 + 5 + 128 + 8;

const ClickableBox = styled(Box)(() => ({
    padding: "8px 12px",
    opacity: 0,
    height: 85,
    transition: "opacity 0.5s",
    ":hover": {
        opacity: 0.65,
    }
}));

export const TentSidebarBonfireDisplayBox = styled(Box)(() => ({
    flex: 1,
    // height: 45,
    marginTop: "auto",
    marginBottom: "auto"
}));

export default class TentSidebar extends React.Component<Props, State, Session> {
    static contextType?: React.Context<any> | undefined = SessionContext;
    bonfiresToTents: Record<string, GetTentsOutput> = {};
    constructor(props: Props, context: Session) {
        super(props, context);

        const bonfireSelected = props.bonfireSelected ? this.bonfires.find((x) => x.id === props.bonfireSelected) ?? this.topBonfire : this.topBonfire;

        this.state = {
            groupMenuOpen: false,
            bonfireSelected,
            loading: true,
            init: false,
            error: null,
        };
    }
    toggleGroupMenu() {
        return this.setGroupMenu(!this.state.groupMenuOpen);
    }
    setGroupMenu(value: boolean) {
        this.setState({ groupMenuOpen: value });
    }
    async componentDidMount(): Promise<void> {
        const { bonfireSelected } = this.state;

        const tents = this.bonfiresToTents[bonfireSelected.id];
        if (tents)
            return this.setState({ loading: false });

        return (this.context as Session).restClient?.getTents(this.props.campsite.id, bonfireSelected.id)
            .then((x) => {
                if (!x.ok)
                    return this.setState({ error: x });

                this.bonfiresToTents[bonfireSelected.id] = x.content;

                return this.setState({ loading: false });
            });
    }
    async componentDidUpdate(_prevProps: Readonly<Props>, _prevState: Readonly<State>, _snapshot?: any): Promise<void> {
        if (this.state.init || !this.state.loading)
            return;

        const { bonfireSelected } = this.state;

        const tents = this.bonfiresToTents[bonfireSelected.id];
        if (tents)
            return this.setState({ loading: false });

        return (this.context as Session).restClient?.getTents(this.props.campsite.id, bonfireSelected.id)
            .then((x) => {
                if (!x.ok)
                    return this.setState({ error: x });

                this.bonfiresToTents[bonfireSelected.id] = x.content;

                return this.setState({ loading: false });
            });
            
    }
    get topBonfire() {
        return this.bonfires.sort((a, b) => a.priority - b.priority)[0];
    }
    get bonfires() {
        return this.props.campsite.bonfires;
    }
    setBonfireSelected(bonfire: BonfireViewBasic) {
        this.setState({ bonfireSelected: bonfire, groupMenuOpen: false, loading: true });
    }
    onBonfireCreated(bonfire: BonfireViewDetailed) {
        this.props.campsite.bonfires.push(bonfire);
    }
    render(): React.ReactNode {
        const { campsite, tentSelected } = this.props;
        // const bonfireOrDefault = campsite.bonfires.find((x) => x.id === bonfireSelected) ??
        const { loading, groupMenuOpen, bonfireSelected } = this.state;
        const tents = this.bonfiresToTents[bonfireSelected.id];
        const toggleGroupMenu = this.toggleGroupMenu.bind(this);

        return (
            <TentSidebarBox>
                <TentSidebarBannerWrapper >
                    <FadingBanner sx={{ opacity: 0.25 }}>
                        <GradientBanner />
                    </FadingBanner>
                    <ClickableBox onClick={toggleGroupMenu}>
                        <Typography>Click to see bonfire list</Typography>
                    </ClickableBox>
                    <Group alignItems="center" sx={{ px: 1.5, height: 45 }}>
                        <TentSidebarBonfireDisplayBox onClick={toggleGroupMenu}>
                            <TentSidebarTopBar>
                                <Avatar sx={{ borderRadius: "sm" }} src={bonfireSelected.avatarUri ?? undefined} size="sm" variant="solid" color="primary">
                                    {bonfireSelected.name[0]}
                                </Avatar>
                                <Stack sx={{ maxHeight: 45 }}>
                                    <Typography level="title-lg" textColor="text.primary">{bonfireSelected.name}</Typography>
                                    {bonfireSelected.description &&
                                    <Tooltip variant="soft" title={bonfireSelected.description}>
                                        <Typography level="body-sm" textColor="text.tertiary">{bonfireSelected.description.substring(0, 50)}{bonfireSelected.description.length > 50 ? "..." : ""}</Typography>
                                    </Tooltip>}
                                </Stack>
                            </TentSidebarTopBar>
                        </TentSidebarBonfireDisplayBox>
                        <Group>
                            <Dropdown>
                                <MenuButton slots={{ root: IconButton }} variant="soft">
                                    <IconDots />
                                </MenuButton>
                                <Menu variant="soft">
                                    <MenuItem variant="soft">
                                        <ListItemDecorator>
                                            <IconTicket />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            Create invites
                                        </ListItemContent>
                                    </MenuItem>
                                    <MenuItem variant="soft">
                                        <ListItemDecorator>
                                            <IconCampfire />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            Campsite Settings
                                        </ListItemContent>
                                    </MenuItem>
                                    <MenuItem variant="soft">
                                        <ListItemDecorator>
                                            <IconSettings2 />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            Bonfire Settings
                                        </ListItemContent>
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        </Group>
                    </Group>
                </TentSidebarBannerWrapper>
                <BonfireListMenu
                    campsiteId={campsite.id}
                    open={groupMenuOpen}
                    top={menuTopDesktop}
                    bonfires={campsite.bonfires}
                    onBonfireOpen={this.setBonfireSelected.bind(this)}
                    onBonfireCreated={this.onBonfireCreated.bind(this)}
                />
                <Box sx={{ py: 2, px: 1 }}>
                    {loading
                    ? <TentListSkeleton />
                    : <TentList
                        campsiteId={campsite.id}
                        bonfireId={bonfireSelected.id}
                        tentSelected={tentSelected}
                        tents={tents}
                        onTentCreated={(tent) => this.bonfiresToTents[bonfireSelected.id].tents.push(tent)}
                    />}
                </Box>
            </TentSidebarBox>
        );
    }
}

export function TentSidebarSkeleton() {
    return (
        <TentSidebarBox>
            <TentSidebarBannerWrapper>
                <FadingBanner sx={{ opacity: 0.25 }}>
                    <GradientBanner />
                </FadingBanner>
                <Box sx={{ height: 85 }}>

                </Box>
                <Group alignItems="center" sx={{ px: 1.5, height: 45 }}>
                    <TentSidebarBonfireDisplayBox>
                        <TentSidebarTopBar>
                            <Avatar sx={{ borderRadius: "sm" }} size="sm">
                                <Skeleton loading />
                            </Avatar>
                            <Stack sx={{ maxHeight: 45 }}>
                                <Typography level="title-lg" textColor="text.primary">
                                    <Skeleton loading>
                                        Loading...
                                    </Skeleton>
                                </Typography>
                                <Typography level="body-sm" textColor="text.tertiary">
                                    <Skeleton loading>
                                        Loading...
                                    </Skeleton>
                                </Typography>
                            </Stack>
                        </TentSidebarTopBar>
                    </TentSidebarBonfireDisplayBox>
                </Group>
            </TentSidebarBannerWrapper>
            <Box sx={{ py: 2, px: 1 }}>
                <TentListSkeleton />
            </Box>
        </TentSidebarBox>
    );
}

function TentListSkeleton() {
    return (
        <>
            <TentStyledList>
                <TentItemSkeleton />
                <TentItemSkeleton />
                <TentItemSkeleton />
                <TentItemSkeleton />
            </TentStyledList>
            <TentCategorySkeleton>
                <TentStyledList>
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                </TentStyledList>
            </TentCategorySkeleton>
            <TentCategorySkeleton>
                <TentStyledList>
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                </TentStyledList>
            </TentCategorySkeleton>
        </>
    );
}