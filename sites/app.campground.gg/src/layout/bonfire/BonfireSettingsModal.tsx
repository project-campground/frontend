import { IconLayoutBoardFilled, IconListCheck, IconTrashFilled, type ReactNode } from "@tabler/icons-react";
import type { BonfireViewBasic } from "types/campsites";
import SettingsModal, { type SettingsComponentProps } from "../SettingsModal";
import { useSession } from "~/context/session";
import BonfireSettingsProfile from "./BonfireSettingsProfile";
import BonfireSettingsDeletion from "./BonfireSettingsDeletion";
import type PermissionsManager from "~/context/permissions/PermissionsManager";
import { useSnackbars } from "~/context/snackbar";
import CommonSettingsPermissions from "../CommonSettingsPermissions";
import { handleAnyRestErrorWith } from "~/util/rest";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

export type BonfireSettingsPage = "profile" | "permissions" | "delete";
const settingsPages: Record<BonfireSettingsPage, (props: SettingsComponentProps<BonfireSettingsProps>) => ReactNode | ReactNode[]> = {
    profile: BonfireSettingsProfile,
    permissions: CommonSettingsPermissions,
    delete: BonfireSettingsDeletion,
};

export type BonfireSettingsProps = {
    defaultPage?: BonfireSettingsPage;
    bonfireId: string;
    bonfire: BonfireViewBasic;
    canDeleteBonfire: boolean;
    permissions: PermissionsManager;
    onBonfireDeleted: () => unknown;
}

export default function BonfireSettingsModal(props: BonfireSettingsProps) {
    const session = useSession();
    const snackbars = useSnackbars();
    const callbacks: Record<BonfireSettingsPage, (fieldValues: Record<string, any>) => unknown> = {
        profile: (fieldValues) => (console.log(fieldValues), session.http.bonfires.update(props.bonfire.campsiteId, props.bonfire.id, { name: fieldValues.name, description: fieldValues.description, avatarUri: fieldValues.avatarUri ?? "", bannerUri: fieldValues.bannerUri ?? "" })),
        permissions: ({ roleId, userId, permissions }) =>
            session
                .http
                .permissions
                .update({ role_id: roleId, actor: userId, bonfire_id: props.bonfireId }, { permissions })
                .then(handleAnyRestErrorWith(snackbars)),
        delete: () => null,
    };

    return (
        <SettingsModal<BonfireSettingsPage, BonfireSettingsProps>
            header={<FormattedMessageGlobal id="app.bonfires.settings" />}
            settingsProps={props}
            settingsPages={settingsPages}
            defaultPage="profile"
            onSubmit={async (page, values) => callbacks[page](values)}
            sections={[
                {
                    id: "overview",
                    header: props.bonfire.name,
                    items: [
                        {
                            id: "profile",
                            name: <FormattedMessage
                                id="app.bonfires.settings.profile"
                                defaultMessage="Bonfire profile"
                                description="The bonfire profile settings tab"
                            />,
                            startDecorator: <IconLayoutBoardFilled />
                        },
                    ]
                },
                {
                    id: "roles",
                    header: "Roles",
                    items: [
                        {
                            id: "permissions",
                            name: <FormattedMessageGlobal id="app.permissions.plural" />,
                            startDecorator: <IconListCheck />
                        },
                    ]
                },
                {
                    id: "other",
                    header: "Other",
                    items: [
                        {
                            id: "delete",
                            name: <FormattedMessageGlobal id="app.bonfires.delete" />,
                            color: "danger",
                            startDecorator: <IconTrashFilled />
                        }
                    ]
                },
            ]} />
    )
}