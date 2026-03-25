import type { SettingsComponentProps } from "../SettingsModal";
import type { CampsiteSettingsProps } from "./CampsiteSettingsModal";
import React from "react";
import DataDisplay from "~/components/pages/DataDisplay";
import { CampsiteContextSuiteContext, type CampsiteContextSuite } from "~/routes/_global._campsite/context";
import type { TypeToPayload } from "types/ws";
import type { CampsiteBanView } from "types/membership";
import { Typography } from "@mui/joy";
import Datestamp from "~/components/Datestamp";
import { UserDisplayNoModal } from "~/components/UserDisplay";
import { IconHammerOff } from "@tabler/icons-react";
import { handleAnyRestErrorWith } from "~/util/rest";

type State = {

};

export default class CampsiteSettingsBans extends React.Component<SettingsComponentProps<CampsiteSettingsProps>, State> {
    static contextType?: React.Context<CampsiteContextSuite> = CampsiteContextSuiteContext;
    declare context: React.ContextType<typeof CampsiteContextSuiteContext>;

    private onWebSocketEvent<T extends keyof TypeToPayload>(bans: CampsiteBanView[], type: T, payload: TypeToPayload[T]): boolean {
        const ban = payload as CampsiteBanView;

        if (ban.campsiteId !== this.props.settingsProps.campsite.id)
            return false;

        switch(type) {
            case "MemberBanDeleted":
                const inviteIndex = bans.findIndex((x) => x.userId === ban.userId);
                if (inviteIndex < 0)
                    return false;

                bans.splice(inviteIndex, 1);
                break;
        }
        return true;
    }

    private async fetchBans(offset: number, limit: number) {
        const { session } = this.context;

        return session
            .http
            .memberBans
            .getMany(this.props.settingsProps.campsite.id, offset, limit)
            .then((resp) => {
                if (!resp.ok)
                    return resp;

                return { ...resp, content: resp.content.memberBans };
            });
    }

    private _onBansDeleteBind = this.onBansDelete.bind(this);
    private onBansDelete(bans: CampsiteBanView[]) {
        return Promise.all(
            bans.map((ban) =>
                this
                    .context
                    .session
                    .http
                    .memberBans
                    .delete(ban.campsiteId, ban.userId)
                    .then(handleAnyRestErrorWith(this.context.floaters))
            )
        );
    }

    render(): React.ReactNode {
        return (
            <DataDisplay
                title="bans"
                itemsPerPage={50}
                maxItems={null}
                columns={[
                    { id: "id", name: "Banned User", width: 240, Component: TargetComponent },
                    { id: "reason", name: "Reason", Component: ReasonComponent, screenSize: "lg" },
                    { id: "createdBy", name: "Banned By", width: 240, Component: CreatedByComponent },
                    { id: "createdAt", name: "Banned At", width: 120, Component: CreatedAtComponent, screenSize: "xl" },
                ]}
                menu={[
                    { startDecorator: <IconHammerOff />, content: "Unban users", onClick: this._onBansDeleteBind }
                ]}
                HeaderComponent={TargetComponent}
                fetch={this.fetchBans.bind(this)}
                updateItems={this.onWebSocketEvent.bind(this)}
            />
        );
    }
}

function TargetComponent({ item: ban }: { item: CampsiteBanView }) {
    return (
        <UserDisplayNoModal user={ban.user} />
    );
}
function CreatedByComponent({ item: ban }: { item: CampsiteBanView }) {
    return (
        <Typography>{ban.createdBy}</Typography>
    );
}
function CreatedAtComponent({ item: ban }: { item: CampsiteBanView }) {
    return (
        <Datestamp long date={new Date(ban.createdAt)} />
    );
}
function ReasonComponent({ item: ban }: { item: CampsiteBanView }) {
    return (
        <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} level="body-md" textColor={ban.reason ? "text.tertiary" : "text.quartary"}>{ban.reason ?? "No max limit"}</Typography>
    );
}