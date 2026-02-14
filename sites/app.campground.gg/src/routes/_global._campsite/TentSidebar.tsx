import { Avatar, Box, Divider, Dropdown, IconButton, ListItemContent, ListItemDecorator, Menu, MenuButton, MenuItem, Modal, Skeleton, Stack, styled, Tooltip, Typography } from "@mui/joy";
import { IconCampfire, IconDots, IconSettings2, IconTicket } from "@tabler/icons-react";
import type { RestResponseError } from "api/RESTResponse";
import { Group, Image } from "components";
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
import CampsiteSettingsModal from "~/layout/campsite/CampsiteSettingsModal";
import BonfireSettingsModal from "~/layout/bonfire/BonfireSettingsModal";
import { type NavigateFunction } from "react-router";

type Props = {
    campsite: CampsiteViewDetailed;
    bonfireSelected: string | null;
    tentSelected: string | null;
    navigate: NavigateFunction;
};
type MenuOption = "campsite-settings" | "bonfire-settings" | "bonfire-list";
type State = {
    menuOpen: MenuOption | null;
    bonfireSelected: BonfireViewBasic;
    loading: boolean;
    error: RestResponseError | null;
};

export const TentSidebarBox = styled(Stack, {
    name: "CampsiteSidebar",
    slot: "root",
})(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.level1,
    minWidth: 320,
    maxWidth: 320,
    borderRadius: theme.vars.radius.xl,
    boxShadow: theme.vars.shadow.lg,
    border: `solid 1px ${theme.vars.palette.neutral.border}`,
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
    transition: "opacity 0.3s",
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
    private lock: boolean = false;
    constructor(props: Props, context: Session) {
        super(props, context);

        this.state = {
            menuOpen: null,
            bonfireSelected: this.bonfireSelected,
            loading: true,
            error: null,
        };
    }
    toggleGroupMenu() {
        return this.setMenu(this.state.menuOpen ? null : "bonfire-list");
    }
    setMenu(value: MenuOption | null) {
        this.setState({ menuOpen: value });
    }
    get bonfireSelected(): BonfireViewBasic {
        return this.props.bonfireSelected ? this.props.campsite.bonfires.find((x) => x.id === this.props.bonfireSelected) ?? this.defaultBonfire : this.defaultBonfire;
    }
    get defaultBonfire(): BonfireViewBasic {
        return this.props.campsite.bonfires.sort((a, b) => a.priority - b.priority)[0]!;
    }
    async componentDidUpdate(prevProps: Readonly<Props>, _prevState: Readonly<State>, _snapshot?: any): Promise<void> {
        if (this.props.bonfireSelected !== prevProps.bonfireSelected)
            return this.setBonfireSelected(this.bonfireSelected);
        else if (!this.state.loading || this.lock)
            return;

        const { bonfireSelected } = this.state;

        const tents = this.bonfiresToTents[bonfireSelected.id];
        if (tents)
            return this.setState({ loading: false });

        this.lock = true;
        return (this.context as Session).restClient?.getTents(this.props.campsite.id, bonfireSelected.id)
            .then((x) => {
                if (!x.ok)
                    return this.setState({ error: x });

                this.bonfiresToTents[bonfireSelected.id] = x.content;
                this.lock = false;

                return this.setState({ loading: false });
            });
            
    }
    get topBonfire() {
        return this.bonfires.sort((a, b) => a.priority - b.priority)[0];
    }
    get bonfires() {
        return this.props.campsite.bonfires;
    }
    set bonfires(value: BonfireViewBasic[]) {
        this.props.campsite.bonfires = value;
    }
    setBonfireSelected(bonfire: BonfireViewBasic) {
        this.setState({ bonfireSelected: bonfire, menuOpen: null, loading: true });
    }
    onBonfireCreated(bonfire: BonfireViewDetailed) {
        this.props.campsite.bonfires.push(bonfire);
    }
    onBonfireDeleted() {
        if (this.bonfires.length < 2)
            return;

        this.setState({ menuOpen: null });

        return (this.context as Session).restClient?.deleteBonfire(this.props.campsite.id, this.state.bonfireSelected.id)
            .then((resp) => {
                if (!resp.ok)
                    return;

                this.bonfires = this.bonfires.filter((x) => x.id !== this.state.bonfireSelected.id);
                const cached = Object.keys(this.bonfiresToTents);

                if (cached.length)
                    this.props.navigate(`/c/${this.props.campsite.id}/t/${this.bonfiresToTents[cached[0]].tents[0].id}`);
                else 
                    this.props.navigate(`/c/${this.props.campsite.id}`);
            });
    }
    render(): React.ReactNode {
        const { campsite, tentSelected } = this.props;
        // const bonfireOrDefault = campsite.bonfires.find((x) => x.id === bonfireSelected) ??
        const { loading, menuOpen, bonfireSelected } = this.state;
        const tents = this.bonfiresToTents[bonfireSelected.id];
        const toggleGroupMenu = this.toggleGroupMenu.bind(this);

        return (
            <TentSidebarBox>
                <TentSidebarBannerWrapper >
                    <FadingBanner sx={{ opacity: 0.25 }}>
                        {bonfireSelected.bannerUri
                            ? <Image src={bonfireSelected.bannerUri} />
                            : <GradientBanner />}
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
                                <Stack sx={{ maxHeight: 45, width: 194 }}>
                                    <Typography level="title-lg" textColor="text.primary">{bonfireSelected.name}</Typography>
                                    {bonfireSelected.description &&
                                    <Tooltip variant="soft" title={bonfireSelected.description}>
                                        <Typography level="body-sm" textColor="text.tertiary" sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>{bonfireSelected.description}</Typography>
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
                                    <MenuItem variant="soft" onClick={this.setMenu.bind(this, "campsite-settings")}>
                                        <ListItemDecorator>
                                            <IconCampfire />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            Campsite Settings
                                        </ListItemContent>
                                    </MenuItem>
                                    <MenuItem variant="soft" onClick={this.setMenu.bind(this, "bonfire-settings")}>
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
                    open={menuOpen === "bonfire-list"}
                    top={menuTopDesktop}
                    bonfires={campsite.bonfires}
                    onBonfireOpen={this.setBonfireSelected.bind(this)}
                    onBonfireCreated={this.onBonfireCreated.bind(this)}
                />
                <Modal open={menuOpen === "campsite-settings"} onClose={this.setMenu.bind(this, null)}>
                    <CampsiteSettingsModal campsite={campsite} />
                </Modal>
                <Modal open={menuOpen === "bonfire-settings"} onClose={this.setMenu.bind(this, null)}>
                    <BonfireSettingsModal canDeleteBonfire={campsite.bonfires.length > 1} bonfire={bonfireSelected} onBonfireDeleted={this.onBonfireDeleted.bind(this)} />
                </Modal>
                <Box flex={1} sx={{ py: 2, px: 1 }}>
                    {loading || !tents
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
            </TentStyledList>
            <Divider />
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