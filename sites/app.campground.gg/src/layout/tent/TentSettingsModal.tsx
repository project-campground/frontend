import { IconLayoutBoardFilled, IconListCheck, IconTrashFilled, type ReactNode } from "@tabler/icons-react";
import SettingsModal, { type SettingsComponentProps } from "../SettingsModal";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import type { PageSidebarSection } from "~/components/pages/PageSidebar";
import type React from "react";
import type { TentViewBasic } from "types/tent";
import TentSettingsProfile from "./TentSettingsProfile";
import TentSettingsDeletion from "./TentSettingsDeletion";
import CommonSettingsPermissions from "../CommonSettingsPermissions";
import type PermissionsManager from "~/context/permissions/PermissionsManager";

export type TentSettingsPage = "profile" | "permissions" | "delete";
const settingsPages: Record<TentSettingsPage, typeof React.Component | ((props: SettingsComponentProps<TentSettingsProps>) => ReactNode | ReactNode[])> = {
    profile: TentSettingsProfile,
    permissions: CommonSettingsPermissions,
    delete: TentSettingsDeletion,
};

export type TentSettingsProps = {
    defaultPage?: TentSettingsPage;
    tentId: string;
    tent: TentViewBasic;
    permissions: PermissionsManager;
};

export default function TentSettingsModal(props: TentSettingsProps) {
    const session = useSession();
    const snackbars = useSnackbars();
    const callbacks: Record<TentSettingsPage, (fieldValues: Record<string, any>) => unknown> = {
        profile: (fieldValues) =>
            session
                .http
                .updateTent(props.tent.id, {
                    name: fieldValues.name,
                    description: fieldValues.description,
                    viewType: fieldValues.viewType,
                })
                .then((resp) => {
                    if (!resp.ok)
                        return snackbars.notifyApiError(resp);
                }),
        permissions: ({ roleId, userId, permissions }) =>
            session
                .http
                .updatePermission({ role_id: roleId, actor: userId, tent_id: props.tentId }, { permissions })
                .then((resp) => {
                    if (!resp.ok)
                        return snackbars.notifyApiError(resp);
                }),
        delete: () => null,
    }

    return (
        <SettingsModal<TentSettingsPage, TentSettingsProps>
            header="Tent Settings"
            settingsProps={props}
            settingsPages={settingsPages}
            defaultPage={props.defaultPage ?? "profile"}
            onSubmit={async (page, values) => callbacks[page](values)}
            sections={[
                {
                    id: "overview",
                    header: props.tent.name,
                    items: [
                        {
                            id: "profile",
                            name: "Tent profile",
                            startDecorator: <IconLayoutBoardFilled />
                        },
                        {
                            id: "permissions",
                            name: "Permissions",
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
                            name: "Delete tent",
                            color: "danger",
                            startDecorator: <IconTrashFilled />
                        }
                    ]
                },
            ].filter(Boolean) as PageSidebarSection[]} />
    )
}