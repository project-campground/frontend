import { Stack, Modal, Button } from "@mui/joy";
import React, { ReactNode, type ContextType } from "react";
import GlobalNavbar from "./GlobalNavbar";
import { SessionContext } from "~/context/session";
import { AccountContext } from "~/context/account";
import type { WSSubscription } from "~/api/WSClient";
import type { TypeToPayload } from "types/ws";
import type {
    CampsiteViewBasic,
    CampsiteViewWithDomain,
} from "types/campground/campsites";
import UserSettingsModal from "~/layout/user/UserSettingsModal";
import type { GetSession } from "types/atproto/session";
import PagePlaceholder, {
    PagePlaceholderIcon,
} from "~/components/pages/PagePlaceholder";
import { FormattedMessage } from "react-intl";
import { IconLogout2 } from "@tabler/icons-react";
import { FormattedMessageGlobal } from "~/i18n";
import type { CampgroundProfileRecord } from "types/campground/user";
import { defaultBackendDomain } from "api.config";
import type { HttpResponseOkWithContent } from "~/api/http/HTTPResponse";

type Props = {
    page: string | undefined | null;
    children: ReactNode[] | ReactNode;
};

type State = {
    loadedSessionInfo: boolean;
    loadedCampsites: boolean;
    errorLoading?: string;
    userSettingsOpen: boolean;
};

export default class GlobalLayout extends React.Component<Props, State> {
    static contextType?: React.Context<any> | undefined = SessionContext;
    declare context: ContextType<typeof SessionContext>;

    private _init: boolean = false;
    private _wsSubscription: WSSubscription | null = null;
    private _campsites: CampsiteViewWithDomain[] = [];
    private _pdsSession: GetSession | null = null;
    private _me: CampgroundProfileRecord | null = null;

    state: State = {
        loadedSessionInfo: false,
        loadedCampsites: false,
        userSettingsOpen: false,
    };

    constructor(props: Props, context: ContextType<typeof SessionContext>) {
        super(props, context);
    }

    private async onInitPreferences(): Promise<unknown> {
        const campsitesPref = this.context.preferences.full.campsites;
        const backendDomains = [
            ...new Set(
                (
                    campsitesPref?.campsites.map((x) => x.split("@")[0]) ?? []
                ).concat(defaultBackendDomain),
            ),
        ];

        return Promise.allSettled(
            backendDomains.map((domain) =>
                this.context.atproto.getBackendJoinedCampsites(domain),
            ),
        ).then((backendRespPromises) => {
            const backendResps = backendRespPromises
                .filter((x) => x.status === "fulfilled" && x.value.ok)
                .map(
                    (x) =>
                        (
                            x as PromiseFulfilledResult<
                                HttpResponseOkWithContent<{
                                    campsites: CampsiteViewBasic[];
                                    domain: string;
                                }>
                            >
                        ).value,
                );

            for (const badResp of backendRespPromises.filter(
                (x) => x.status === "rejected" || !x.value.ok,
            )) {
                console.error(
                    badResp.status === "rejected"
                        ? "Rejected promise while fetching campsite list"
                        : "HTTP Error while fetching campsite list",
                    badResp.status === "rejected"
                        ? badResp.reason
                        : badResp.value,
                );
            }

            this._campsites = backendResps.flatMap((resp) =>
                resp.content!.campsites.map(
                    (campsite) =>
                        ({
                            ...campsite,
                            _domain: resp.content.domain,
                        }) as CampsiteViewWithDomain,
                ),
            );
            return this.setState({ loadedCampsites: true });
        });
    }

    async componentDidMount(): Promise<void> {
        if (this._init) return;

        this._init = true;

        if (!this.context.auth.authenticated)
            return this.setState({ loadedSessionInfo: true });

        this._wsSubscription = this.context.ws.subscribe(
            (msg) => msg.op === 1 && this.onWsMessage(msg.t, msg.payload),
        );

        // So it doesn't get subscribed to too late
        if (!this.context.preferences.loaded)
            this.context.preferences.onInit(this.onInitPreferences.bind(this));

        return Promise.all([
            this.context.atproto.getSession(),
            this.context.atproto.profileRecords.get(this.context.auth.user.did),
            this.context.preferences.loaded && this.onInitPreferences(),
        ]).then(([sessionResp, profileResp]) => {
            // Deleted account
            if (sessionResp.status === 400)
                return this.onGetSessionError(sessionResp.errorDescription!);

            const badResp = [sessionResp, profileResp].find((x) => !x.ok);

            if (badResp)
                throw new Error(
                    `Error while fetching ${badResp.url.split("/").slice(4).join("/")}: ${badResp.status} ${badResp.errorHeader}: ${badResp.errorDescription}`,
                );

            this._me = profileResp.ok ? profileResp.content!.value : null;
            this._pdsSession = sessionResp.content!;

            return this.setState({ loadedSessionInfo: true });
        });
    }
    onGetSessionError(message: string) {
        this.setState({
            errorLoading: message,
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
                const index = this._campsites.findIndex(
                    (x) =>
                        x.id === (payload as TypeToPayload["CampsiteLeft"]).id,
                );
                if ((index ?? -1) >= 0) this._campsites.splice(index!, 1);
                break;
            case "CampsiteUpdated":
                const campsiteUpdated = this._campsites.find(
                    (x) =>
                        (payload as TypeToPayload["CampsiteUpdated"]).id ===
                        x.id,
                );

                if (campsiteUpdated) {
                    Object.assign(campsiteUpdated, payload);
                    break;
                }

                this._campsites.push({
                    ...payload,
                    _domain: defaultBackendDomain,
                } as CampsiteViewWithDomain);
                break;
            case "CampsiteCreated":
            case "CampsiteJoined":
                this._campsites.push({
                    ...payload,
                    _domain: defaultBackendDomain,
                } as CampsiteViewWithDomain);
                break;
            default:
                return;
        }
        this.setState({});
    }
    openUserSettings = () => this.setState({ userSettingsOpen: true });
    render() {
        const { page, children } = this.props;
        const {
            loadedSessionInfo: loaded,
            userSettingsOpen,
            errorLoading,
        } = this.state;

        if (errorLoading)
            return (
                <PagePlaceholder
                    icon={PagePlaceholderIcon.Error}
                    title={
                        <FormattedMessage
                            id="app.sessionError.header"
                            defaultMessage="Error while getting session"
                            description="The title of the error when there is a session error"
                        />
                    }
                >
                    {errorLoading.startsWith("Could not find user") ? (
                        <FormattedMessage
                            id="app.sessionError.notFound"
                            defaultMessage="The logged in account does not exist and has been likely deleted."
                            description="The description for session error when the account that user logged into does not exist."
                        />
                    ) : (
                        errorLoading
                    )}
                    <Stack mt={2} alignItems="center">
                        <Button
                            variant="glow"
                            startDecorator={<IconLogout2 />}
                            onClick={this.context.logout}
                        >
                            <FormattedMessageGlobal id="form.logout" />
                        </Button>
                    </Stack>
                </PagePlaceholder>
            );

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
                                      profile:
                                          this._me ??
                                          ({} satisfies Partial<CampgroundProfileRecord>),
                                      campsites: this._campsites,
                                      sessionInfo: this._pdsSession!,
                                      openUserSettings: this.openUserSettings,
                                  }
                                : { authenticated: false }
                            : { authenticated: false }
                    }
                >
                    <GlobalNavbar
                        page={page}
                        loadedCampsites={this.state.loadedCampsites}
                    />
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
