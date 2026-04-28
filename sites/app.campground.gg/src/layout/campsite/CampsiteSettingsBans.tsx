import type { SettingsComponentProps } from "../settings";
import type { CampsiteSettingsProps } from "./CampsiteSettingsModal";
import React from "react";
import DataDisplay from "~/components/pages/DataDisplay";
import { CampsiteContext } from "~/routes/_global._campsite/context";
import type { TypeToPayload } from "types/ws";
import type { MemberBanView } from "types/campground/membership";
import { Typography } from "@mui/joy";
import Datestamp from "~/components/Datestamp";
import { UserDisplayNoModal } from "~/components/UserDisplay";
import { IconHammer, IconHammerOff } from "@tabler/icons-react";
import { handleAnyRestErrorWith } from "~/util/rest";
import { FormattedMessage } from "react-intl";
import SettingsPageWrapper from "../settings/page";
import { FormattedMessageGlobal } from "~/i18n";

type State = {};

export default class CampsiteSettingsBans extends React.Component<
    SettingsComponentProps<CampsiteSettingsProps>,
    State
> {
    static contextType?: React.Context<CampsiteContext> = CampsiteContext;
    declare context: React.ContextType<typeof CampsiteContext>;

    private onWebSocketEvent<T extends keyof TypeToPayload>(
        bans: MemberBanView[],
        type: T,
        payload: TypeToPayload[T],
    ): boolean {
        const ban = payload as MemberBanView;

        if (ban.campsiteId !== this.props.settingsProps.campsite.id)
            return false;

        switch (type) {
            case "MemberBanDeleted":
                const inviteIndex = bans.findIndex(
                    (x) => x.userId === ban.userId,
                );
                if (inviteIndex < 0) return false;

                bans.splice(inviteIndex, 1);
                break;
        }
        return true;
    }

    private async fetchBans(offset: number, limit: number) {
        const { api } = this.context;

        return api.memberBans
            .getMany(this.props.settingsProps.campsite.id, offset, limit)
            .then((resp) => {
                if (!resp.ok) return resp;

                return { ...resp, content: resp.content.memberBans };
            });
    }

    private _onBansDeleteBind = this.onBansDelete.bind(this);
    private onBansDelete(bans: MemberBanView[]) {
        return Promise.all(
            bans.map((ban) =>
                this.context.api.memberBans
                    .delete(ban.campsiteId, ban.userId)
                    .then(handleAnyRestErrorWith(this.context.floaters)),
            ),
        );
    }

    render(): React.ReactNode {
        return (
            <SettingsPageWrapper
                startDecorator={<IconHammer />}
                header={<FormattedMessageGlobal id="app.bans" />}
            >
                <DataDisplay
                    title="bans"
                    itemsPerPage={50}
                    maxItems={null}
                    columns={[
                        {
                            id: "actor",
                            name: (
                                <FormattedMessage
                                    id="app.bans.actor"
                                    defaultMessage="Banned user"
                                    description="Who was banned in the ban list"
                                />
                            ),
                            width: 240,
                            Component: TargetComponent,
                        },
                        {
                            id: "reason",
                            name: (
                                <FormattedMessage
                                    id="app.bans.reason"
                                    defaultMessage="Reason"
                                    description="Reason for the ban in the ban list"
                                />
                            ),
                            Component: ReasonComponent,
                            screenSize: "lg",
                        },
                        {
                            id: "createdBy",
                            name: (
                                <FormattedMessage
                                    id="app.bans.by"
                                    defaultMessage="Banned by"
                                    description="Banned by who in the ban list"
                                />
                            ),
                            width: 240,
                            Component: CreatedByComponent,
                        },
                        {
                            id: "createdAt",
                            name: (
                                <FormattedMessage
                                    id="app.bans.at"
                                    defaultMessage="Banned at"
                                    description="Banned when in the ban list"
                                />
                            ),
                            width: 120,
                            Component: CreatedAtComponent,
                            screenSize: "xl",
                        },
                    ]}
                    menu={[
                        {
                            startDecorator: <IconHammerOff />,
                            content: (
                                <FormattedMessage
                                    id="app.bans.unban"
                                    defaultMessage="Remove bans from users"
                                    description="Unban multiple or one user button in the ban list"
                                />
                            ),
                            onClick: this._onBansDeleteBind,
                        },
                    ]}
                    HeaderComponent={TargetComponent}
                    fetch={this.fetchBans.bind(this)}
                    updateItems={this.onWebSocketEvent.bind(this)}
                />
            </SettingsPageWrapper>
        );
    }
}

function TargetComponent({ item: ban }: { item: MemberBanView }) {
    return <UserDisplayNoModal user={ban.user} />;
}
function CreatedByComponent({ item: ban }: { item: MemberBanView }) {
    return <Typography>{ban.createdBy}</Typography>;
}
function CreatedAtComponent({ item: ban }: { item: MemberBanView }) {
    return <Datestamp long date={new Date(ban.createdAt)} />;
}
function ReasonComponent({ item: ban }: { item: MemberBanView }) {
    return (
        <Typography
            sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}
            level="body-md"
            textColor={ban.reason ? "text.tertiary" : "text.quartary"}
        >
            {ban.reason ?? "No max limit"}
        </Typography>
    );
}
