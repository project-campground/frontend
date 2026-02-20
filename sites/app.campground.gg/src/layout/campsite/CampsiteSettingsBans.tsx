import type { SettingsComponentProps } from "../SettingsModal";
import type { CampsiteSettingsProps } from "./CampsiteSettingsModal";
import React from "react";
import DataFetchTable from "~/components/pages/DataFetchTable";
import { CampsiteContextSuiteContext, type CampsiteContextSuite } from "~/routes/_global._campsite/context";
import type { TypeToPayload } from "types/ws";
import type { CampsiteBanView } from "types/membership";
import { Typography } from "@mui/joy";
import Datestamp from "~/components/Datestamp";
import { UserDisplayNoModal } from "~/components/UserDisplay";

type State = {

};

export default class CampsiteSettingsBans extends React.Component<SettingsComponentProps<CampsiteSettingsProps>, State> {
    static contextType?: React.Context<any> | undefined = CampsiteContextSuiteContext;

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
        const { session } = this.context as CampsiteContextSuite;

        return session
            .restClient!
            .getBans(this.props.settingsProps.campsite.id, offset, limit)
            .then((resp) => {
                if (!resp.ok)
                    return resp;

                return { ...resp, content: resp.content.memberBans };
            });
    }

    render(): React.ReactNode {
        return (
            <DataFetchTable
                title="invites"
                itemsPerPage={50}
                maxItems={null}
                columns={[
                    { id: "id", name: "Banned User", Component: TargetComponent },
                    { id: "reason", name: "Reason", width: 320, Component: ReasonComponent },
                    { id: "createdBy", name: "Created By", width: 300, Component: CreatedByComponent },
                    { id: "createdAt", name: "Created At", width: 120, Component: CreatedAtComponent },
                ]}
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