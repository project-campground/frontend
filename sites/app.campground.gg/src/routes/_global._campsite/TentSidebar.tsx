import { Avatar, Box, Divider, Dropdown, IconButton, ListItemContent, ListItemDecorator, Menu, MenuButton, MenuItem, Modal, Skeleton, Stack, styled, Tooltip, Typography } from "@mui/joy";
import { IconCampfire, IconDoorExit, IconDots, IconSettingsFilled, IconTicket } from "@tabler/icons-react";
import type { HttpResponseError } from "~/api/http/HTTPResponse";
import { Group, Image } from "components";
import React, { type ContextType } from "react";
import type { CampsiteViewDetailed } from "types/campground/campsites";
import type { BonfireViewBasic } from "types/campground/bonfires";
import type { GetTentsOutput } from "types/campground/tent";
import FadingBanner from "~/components/pages/FadingBanner";
import GradientBanner from "~/components/pages/GradientBanner";
import type { Session } from "~/context/session/types";
import TentSidebarList from "./TentSidebarList";
import BonfireListMenu from "../../layout/sidebar/BonfireListMenu";
import { TentItemSkeleton } from "../../components/tents/TentItem";
import { TentCategorySkeleton } from "../../components/tents/TentCategory";
import CampsiteSettingsModal from "~/layout/campsite/CampsiteSettingsModal";
import BonfireSettingsModal from "~/layout/bonfire/BonfireSettingsModal";
import { type NavigateFunction } from "react-router";
import type { WSSubscription } from "~/api/WSClient";
import type { TypeToPayload } from "types/ws";
import InviteCreationModal from "../../layout/InviteCreationModal";
import { CampsiteContextSuiteContext } from "./context";
import { GeneralPermissionConsts } from "~/util/permissions";
import { handleAnyRestErrorWith } from "~/util/rest";
import TentList from "~/components/tents/TentList";
import tentSidebarEventHandlers from "./sidebar-events";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

type Props = {
    campsite: CampsiteViewDetailed;
    bonfireSelected: string | null;
    tentSelected: string | null;
    navigate: NavigateFunction;
};
type MenuOption = "campsite-settings" | "bonfire-settings" | "bonfire-list" | "invite-creation";
type State = {
    menuOpen: MenuOption | null;
    bonfireSelected: BonfireViewBasic;
    loading: boolean;
    error: HttpResponseError | null;
};

export const TentSidebarBox = styled(Stack, {
    name: "CampsiteSidebar",
    slot: "root",
})(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.surface,
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
export const TentSidebarTopBar = styled(Stack)(() => ({
    flexDirection: "row",
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

const anyManageCampsitePermission = GeneralPermissionConsts.MANAGE_CAMPSITE | GeneralPermissionConsts.BAN_MEMBERS | GeneralPermissionConsts.MANAGE_ROLES | GeneralPermissionConsts.MANAGE_INVITES;

export default class TentSidebar extends React.Component<Props, State> {
    static contextType?: React.Context<any> | undefined = CampsiteContextSuiteContext;
    declare context: ContextType<typeof CampsiteContextSuiteContext>;

    public bonfiresToTents: Record<string, GetTentsOutput> = {};
    private _lock: boolean = false;
    private _initLock: boolean = false;
    private _wsSubscription: WSSubscription | null = null;
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
    public get bonfireSelected(): BonfireViewBasic {
        return this.props.bonfireSelected ? this.props.campsite.bonfires.find((x) => x.id === this.props.bonfireSelected) ?? this.defaultBonfire : this.defaultBonfire;
    }
    public get defaultBonfire(): BonfireViewBasic {
        return this.props.campsite.bonfires.find((x) => x.home)!;
    }
    componentDidMount(): void {
        if (this._initLock)
            return;

        this._initLock = true;

        const { session } = this.context;
        this._wsSubscription = session
            .ws
            .subscribe((msg) =>
                msg.op === 1 &&
                this.onWsEvent(msg.t as keyof TypeToPayload, msg.payload)
            );
    }
    onWsEvent<T extends keyof TypeToPayload>(eventType: T, payload: TypeToPayload[T]) {
        const eventHandler = tentSidebarEventHandlers[eventType];

        if (!eventHandler)
            return;

        eventHandler(payload, this.bonfiresToTents, this);

        this.setState({});
    }
    componentWillUnmount(): void {
        if (!this._wsSubscription)
            return;

        const { session } = this.context;
        return (
            session
                .ws
                .unsubscribe(this._wsSubscription)
        );
    }
    async componentDidUpdate(prevProps: Readonly<Props>, _prevState: Readonly<State>, _snapshot?: any): Promise<void> {
        if (this.props.bonfireSelected !== prevProps.bonfireSelected)
            return this.setBonfireSelected(this.bonfireSelected);
        else if (!this.state.loading || this._lock)
            return;

        const { bonfireSelected } = this.state;

        const tents = this.bonfiresToTents[bonfireSelected.id];
        if (tents)
            return this.setState({ loading: false });

        this._lock = true;
        return this.context
            .session
            .http
            .tents.getMany(this.props.campsite.id, bonfireSelected.id)
            .then((x) => {
                if (!x.ok)
                    return this.setState({ error: x });

                this.bonfiresToTents[bonfireSelected.id] = x.content;
                this.context.permissions.tentList.setNewValue(x.content);
                this._lock = false;

                return this.setState({ loading: false });
            });
            
    }
    get topBonfire() {
        return this.bonfires.sort((a, b) => a.position - b.position)[0];
    }
    get bonfires() {
        return this.props.campsite.bonfires;
    }
    set bonfires(value: BonfireViewBasic[]) {
        this.props.campsite.bonfires = value;
    }
    setBonfireSelected(bonfire: BonfireViewBasic) {
        if (this.bonfiresToTents[bonfire.id])
            this.context.permissions.tentList.setNewValue(this.bonfiresToTents[bonfire.id]);
        this.setState({ bonfireSelected: bonfire, menuOpen: null, loading: true });
    }
    onBonfireDeleted() {
        if (this.bonfires.length < 2)
            return;

        this.setState({ menuOpen: null });
        const { floaters, session } = this.context;

        return (
            session
                .http
                .bonfires
                .delete(this.props.campsite.id, this.state.bonfireSelected.id)
                .then(handleAnyRestErrorWith(floaters))
        );
    }
    leaveCampsite() {
        const { floaters, session } = this.context;
        return (
            session
                .http
                .members
                .remove(this.props.campsite.id, this.props.campsite.me.user.did)
                .then(handleAnyRestErrorWith(floaters))
        );
    }
    render(): React.ReactNode {
        const { campsite, tentSelected } = this.props;
        const { loading, menuOpen, bonfireSelected } = this.state;
        const tents = this.bonfiresToTents[bonfireSelected.id];
        const toggleGroupMenu = this.toggleGroupMenu.bind(this);
        const { permissions } = this.context;

        return (
            <TentSidebarBox>
                {/* On drag enter opens the menu, so tents and categories could be dragged into them */}
                <TentSidebarBannerWrapper onDragEnter={() => this.setMenu("bonfire-list")}>
                    <FadingBanner sx={{ opacity: 0.25 }}>
                        {bonfireSelected.bannerUri
                            ? <Image src={bonfireSelected.bannerUri} />
                            : <GradientBanner />}
                    </FadingBanner>
                    <ClickableBox onClick={toggleGroupMenu}>
                        <Typography>
                            <FormattedMessage
                                id="app.bonfires.bannerClick"
                                defaultMessage="Click to see bonfire list"
                                description="Hint that you can press on tent list banner to open bonfire list"
                            />
                        </Typography>
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
                                    {!!(permissions.role.general & GeneralPermissionConsts.CREATE_INVITES) && <MenuItem variant="soft" onClick={this.setMenu.bind(this, "invite-creation")}>
                                        <ListItemDecorator>
                                            <IconTicket />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <FormattedMessageGlobal id="app.invites.create" />
                                        </ListItemContent>
                                    </MenuItem>}
                                    {!!(permissions.role.general & anyManageCampsitePermission) && <MenuItem variant="soft" onClick={this.setMenu.bind(this, "campsite-settings")}>
                                        <ListItemDecorator>
                                            <IconCampfire />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <FormattedMessageGlobal id="app.campsites.settings" />
                                        </ListItemContent>
                                    </MenuItem>}
                                    {!!(permissions.bonfire.general & GeneralPermissionConsts.MANAGE_BONFIRES) && <MenuItem variant="soft" onClick={this.setMenu.bind(this, "bonfire-settings")}>
                                        <ListItemDecorator>
                                            <IconSettingsFilled />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <FormattedMessageGlobal id="app.bonfires.settings" />
                                        </ListItemContent>
                                    </MenuItem>}
                                    {campsite.owner !== campsite.me.user.did && <MenuItem variant="plain" color="danger" onClick={this.leaveCampsite.bind(this)}>
                                        <ListItemDecorator>
                                            <IconDoorExit />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <FormattedMessage
                                                id="app.tents.leaveCampsite"
                                                defaultMessage="Leave campsite"
                                                description="Menu item for leaving a campsite"
                                            />
                                        </ListItemContent>
                                    </MenuItem>}
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
                />
                <Modal open={menuOpen === "invite-creation"} onClose={this.setMenu.bind(this, null)}>
                    <InviteCreationModal
                        campsiteId={campsite.id}
                    />
                </Modal>
                <Modal open={menuOpen === "campsite-settings"} onClose={this.setMenu.bind(this, null)}>
                    <CampsiteSettingsModal campsite={campsite} />
                </Modal>
                <Modal open={menuOpen === "bonfire-settings"} onClose={this.setMenu.bind(this, null)}>
                    <BonfireSettingsModal
                        bonfireId={bonfireSelected.id}
                        permissions={this.context.permissions}
                        canDeleteBonfire={campsite.bonfires.length > 1}
                        bonfire={bonfireSelected}
                        onBonfireDeleted={this.onBonfireDeleted.bind(this)}
                    />
                </Modal>
                <Box flex={1} sx={{ py: 2, px: 1 }}>
                    {loading || !tents
                    ? <TentListSkeleton />
                    : <TentSidebarList
                        campsiteId={campsite.id}
                        bonfireId={bonfireSelected.id}
                        tentSelected={tentSelected}
                        tents={tents}
                        onTentCreated={(tent) => this.bonfiresToTents[bonfireSelected.id].tents.push(tent)}
                        navigate={this.props.navigate}
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
            <TentList>
                <TentItemSkeleton />
            </TentList>
            <Divider />
            <TentList>
                <TentItemSkeleton />
                <TentItemSkeleton />
                <TentItemSkeleton />
                <TentItemSkeleton />
            </TentList>
            <TentCategorySkeleton>
                <TentList>
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                </TentList>
            </TentCategorySkeleton>
            <TentCategorySkeleton>
                <TentList>
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                    <TentItemSkeleton />
                </TentList>
            </TentCategorySkeleton>
        </>
    );
}