import type { SettingsComponentProps } from "../SettingsModal";
import type { CampsiteSettingsProps } from "./CampsiteSettingsModal";
import React from "react";
import DataFetchTable from "~/components/pages/DataFetchTable";
import { CampsiteContextSuiteContext, type CampsiteContextSuite } from "~/routes/_global._campsite/context";
import type { TypeToPayload } from "types/ws";
import type { CampsiteInviteViewBasic } from "types/membership";
import { IconButton, Typography } from "@mui/joy";
import Datestamp from "~/components/Datestamp";
import { IconTrashFilled } from "@tabler/icons-react";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { UserDisplayNoModal } from "~/components/UserDisplay";

type State = {

};

export default class CampsiteSettingsInvites extends React.Component<SettingsComponentProps<CampsiteSettingsProps>, State> {
    static contextType?: React.Context<any> | undefined = CampsiteContextSuiteContext;

    private onWebSocketEvent<T extends keyof TypeToPayload>(invites: CampsiteInviteViewBasic[], type: T, payload: TypeToPayload[T]): boolean {
        const invite = payload as CampsiteInviteViewBasic;
        switch(type) {
            case "InviteCreated":
                if (invites.length > 50)
                    return false;
                invites.push(invite);
                break;
            case "InviteDeleted":
                const inviteIndex = invites.findIndex((x) => x.id === invite.id);
                if (inviteIndex < 0)
                    return false;

                invites.splice(inviteIndex, 1);
                break;
        }
        return true;
    }

    private async fetchInvites(offset: number, limit: number) {
        const { session } = this.context as CampsiteContextSuite;

        return session
            .restClient!
            .getInvites(this.props.settingsProps.campsite.id, offset, limit)
            .then((resp) => {
                if (!resp.ok)
                    return resp;

                return { ...resp, content: resp.content.invites };
            });
    }

    render(): React.ReactNode {
        return (
            <DataFetchTable
                title="invites"
                itemsPerPage={50}
                maxItems={null}
                columns={[
                    { id: "id", name: "Identifier", Component: IdComponent },
                    { id: "createdBy", name: "Created By", width: 300, Component: CreatedByComponent },
                    { id: "createdAt", name: "Created At", width: 120, Component: CreatedAtComponent },
                    { id: "expires", name: "Expires At", width: 120, Component: ExpiresComponent },
                    { id: "maxUses", name: "Max Uses", width: 120, Component: MaxUsesComponent },
                    { id: "deletion", name: "", width: 52, Component: DeleteComponent },
                ]}
                fetch={this.fetchInvites.bind(this)}
                updateItems={this.onWebSocketEvent.bind(this)}
            />
        );
    }
}

function IdComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
    return (
        <Typography>{invite.id}</Typography>
    );
}
function ExpiresComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
    return (
        invite.expiresAt
        ? <Datestamp long date={new Date(invite.expiresAt)} />
        : <Typography level="body-md" textColor="text.quartary">Never</Typography>
    );
}
function CreatedByComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
    return (
        <UserDisplayNoModal user={invite.createdBy} />
    );
}
function CreatedAtComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
    return (
        <Datestamp long date={new Date(invite.createdAt)} />
    );
}
function MaxUsesComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
    return (
        <Typography level="body-md" textColor={invite.allowedAmount ? "text.tertiary" : "text.quartary"}>{invite.allowedAmount ?? "No max limit"}</Typography>
    );
}
function DeleteComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
    const session = useSession();
    const snackbars = useSnackbars();
    const onDelete = () => session.restClient
        .deleteInvite(invite.campsiteId, invite.id)
        .then((resp) => {
            if (!resp.ok)
                return snackbars.notifyApiError(resp);
        });

    return (
        <IconButton onClick={onDelete}>
            <IconTrashFilled />
        </IconButton>
    );
}
