import { IconLayoutBoardFilled, IconListCheck, IconTrashFilled, type ReactNode } from "@tabler/icons-react";
import type { BonfireViewBasic } from "types/campground/bonfires";
import SettingsModal, { type SettingsComponentProps } from "../settings";
import BonfireSettingsProfile from "./BonfireSettingsProfile";
import BonfireSettingsDeletion from "./BonfireSettingsDeletion";
import type PermissionsManager from "~/context/permissions/PermissionsManager";
import { useSnackbars } from "~/context/snackbar";
import CommonSettingsPermissions from "../CommonSettingsPermissions";
import { handleAnyRestErrorWith } from "~/util/rest";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import PageSidebarSection from "~/components/pages/PageSidebarSection";
import PageSidebarItem from "~/components/pages/PageSidebarItem";
import { useCampsiteContext } from "~/routes/_global._campsite/context";

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
    const { api } = useCampsiteContext();
    const snackbars = useSnackbars();
    const callbacks: Record<BonfireSettingsPage, (fieldValues: Record<string, any>) => unknown> = {
        profile: (fieldValues) => (console.log(fieldValues), api.bonfires.update(props.bonfire.campsiteId, props.bonfire.id, { name: fieldValues.name, description: fieldValues.description, avatarUri: fieldValues.avatarUri ?? "", bannerUri: fieldValues.bannerUri ?? "" })),
        permissions: ({ roleId, userId, permissions }) =>
            api
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
        >
            <PageSidebarSection header={props.bonfire   .name}>
                <PageSidebarItem
                    id="profile"
                    startDecorator={<IconLayoutBoardFilled />}
                >
                    <FormattedMessage
                        id="app.bonfires.settings.profile"
                        defaultMessage="Bonfire profile"
                        description="The bonfire profile settings tab"
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
                    <FormattedMessageGlobal id="app.bonfires.delete" />
                </PageSidebarItem>
            </PageSidebarSection>
        </SettingsModal>
    )
}