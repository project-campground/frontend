import {
    IconLayoutBoardFilled,
    IconListCheck,
    IconTrashFilled,
    type ReactNode,
} from "@tabler/icons-react";
import SettingsModal, { type SettingsComponentProps } from "../settings";
import { useSnackbars } from "~/context/snackbar";
import type React from "react";
import type { TentViewBasic } from "types/campground/tent";
import TentSettingsProfile from "./TentSettingsProfile";
import TentSettingsDeletion from "./TentSettingsDeletion";
import CommonSettingsPermissions from "../CommonSettingsPermissions";
import type PermissionsManager from "~/context/permissions/PermissionsManager";
import { handleAnyRestErrorWith } from "~/util/rest";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import PageSidebarItem from "~/components/pages/PageSidebarItem";
import PageSidebarSection from "~/components/pages/PageSidebarSection";
import { useCampsiteContext } from "~/routes/_global._campsite/context";

export type TentSettingsPage = "profile" | "permissions" | "delete";
const settingsPages: Record<
    TentSettingsPage,
    | typeof React.Component
    | ((
          props: SettingsComponentProps<TentSettingsProps>,
      ) => ReactNode | ReactNode[])
> = {
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
    const { api } = useCampsiteContext();
    const snackbars = useSnackbars();
    const callbacks: Record<
        TentSettingsPage,
        (fieldValues: Record<string, any>) => unknown
    > = {
        profile: (fieldValues) =>
            api.tents
                .update(props.tent.id, {
                    name: fieldValues.name,
                    description: fieldValues.description,
                    viewType: fieldValues.viewType,
                })
                .then(handleAnyRestErrorWith(snackbars)),
        permissions: ({ roleId, userId, permissions }) =>
            api.permissions
                .update(
                    { role_id: roleId, actor: userId, tent_id: props.tentId },
                    { permissions },
                )
                .then(handleAnyRestErrorWith(snackbars)),
        delete: () => null,
    };

    return (
        <SettingsModal<TentSettingsPage, TentSettingsProps>
            header={<FormattedMessageGlobal id="app.tents.settings" />}
            settingsProps={props}
            settingsPages={settingsPages}
            defaultPage={props.defaultPage ?? "profile"}
            onSubmit={async (page, values) => callbacks[page](values)}
        >
            <PageSidebarSection header={props.tent.name}>
                <PageSidebarItem
                    id="profile"
                    startDecorator={<IconLayoutBoardFilled />}
                >
                    <FormattedMessage
                        id="app.tents.settings.profile"
                        defaultMessage="Tent profile"
                        description="The tent profile settings tab"
                    />
                </PageSidebarItem>
                <PageSidebarItem
                    id="permissions"
                    startDecorator={<IconListCheck />}
                >
                    <FormattedMessageGlobal id="app.permissions.plural" />
                </PageSidebarItem>
            </PageSidebarSection>
            <PageSidebarSection
                header={<FormattedMessageGlobal id="app.settings.other" />}
            >
                <PageSidebarItem
                    id="delete"
                    startDecorator={<IconTrashFilled />}
                    color="danger"
                >
                    <FormattedMessageGlobal id="app.tents.delete" />
                </PageSidebarItem>
            </PageSidebarSection>
        </SettingsModal>
    );
}
