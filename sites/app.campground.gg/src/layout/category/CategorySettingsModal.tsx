import { IconLayoutBoardFilled, IconListCheck, IconTrashFilled, type ReactNode } from "@tabler/icons-react";
import SettingsModal, { type SettingsComponentProps } from "../settings";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import type React from "react";
import type { TentCategoryView } from "types/tent";
import TentSettingsProfile from "./CategorySettingsProfile";
import CategorySettingsDeletion from "./CategorySettingsDeletion";
import CommonSettingsPermissions from "../CommonSettingsPermissions";
import type PermissionsManager from "~/context/permissions/PermissionsManager";
import { handleAnyRestErrorWith } from "~/util/rest";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import PageSidebarItem from "~/components/pages/PageSidebarItem";
import PageSidebarSection from "~/components/pages/PageSidebarSection";

export type CategorySettingsPage = "profile" | "permissions" | "delete";
const settingsPages: Record<CategorySettingsPage, typeof React.Component | ((props: SettingsComponentProps<CategorySettingsProps>) => ReactNode | ReactNode[])> = {
    profile: TentSettingsProfile,
    permissions: CommonSettingsPermissions,
    delete: CategorySettingsDeletion,
};

export type CategorySettingsProps = {
    defaultPage?: CategorySettingsPage;
    categoryId: string;
    category: TentCategoryView;
    permissions: PermissionsManager;
};

export default function CategorySettingsModal(props: CategorySettingsProps) {
    const session = useSession();
    const snackbars = useSnackbars();
    const callbacks: Record<CategorySettingsPage, (fieldValues: Record<string, any>) => unknown> = {
        profile: (fieldValues) =>
            session
                .http
                .categories
                .update(props.category.id, {
                    name: fieldValues.name,
                    description: fieldValues.description,
                })
                .then(handleAnyRestErrorWith(snackbars)),
        permissions: ({ roleId, userId, permissions }) =>
            session
                .http
                .permissions
                .update({ role_id: roleId, actor: userId, category_id: props.categoryId }, { permissions })
                .then(handleAnyRestErrorWith(snackbars)),
        delete: () => null,
    }

    return (
        <SettingsModal<CategorySettingsPage, CategorySettingsProps>
            header={<FormattedMessageGlobal id="app.tentCategories.settings" />}
            settingsProps={props}
            settingsPages={settingsPages}
            defaultPage={props.defaultPage ?? "profile"}
            onSubmit={async (page, values) => callbacks[page](values)}
        >
            <PageSidebarSection header={props.category.name}>
                <PageSidebarItem
                    id="profile"
                    startDecorator={<IconLayoutBoardFilled />}
                >
                    <FormattedMessage
                        id="app.tentCategories.settings.profile"
                        defaultMessage="Category profile"
                        description="The tent category profile settings tab"
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
                    <FormattedMessageGlobal id="app.tentCategories.delete" />
                </PageSidebarItem>
            </PageSidebarSection>
        </SettingsModal>
    )
}