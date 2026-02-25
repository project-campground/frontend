import { IconLayoutBoardFilled, IconListCheck, IconTrashFilled, type ReactNode } from "@tabler/icons-react";
import SettingsModal, { type SettingsComponentProps } from "../SettingsModal";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import type { PageSidebarSection } from "~/components/pages/PageSidebar";
import type React from "react";
import type { TentCategoryView } from "types/tent";
import TentSettingsProfile from "./CategorySettingsProfile";
import CategorySettingsDeletion from "./CategorySettingsDeletion";
import CommonSettingsPermissions from "../CommonSettingsPermissions";
import type PermissionsManager from "~/context/permissions/PermissionsManager";

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
                .restClient!
                .updateCategory(props.category.id, {
                    name: fieldValues.name,
                    description: fieldValues.description,
                })
                .then((resp) => {
                    if (!resp.ok)
                        return snackbars.notifyApiError(resp);
                }),
        permissions: ({ roleId, userId, permissions }) =>
            session
                .restClient
                .updatePermission({ role_id: roleId, actor: userId, category_id: props.categoryId }, { permissions })
                .then((resp) => {
                    if (!resp.ok)
                        return snackbars.notifyApiError(resp);
                }),
        delete: () => null,
    }

    return (
        <SettingsModal<CategorySettingsPage, CategorySettingsProps>
            header="Category Settings"
            settingsProps={props}
            settingsPages={settingsPages}
            defaultPage={props.defaultPage ?? "profile"}
            onSubmit={async (page, values) => callbacks[page](values)}
            sections={[
                {
                    id: "overview",
                    header: props.category.name,
                    items: [
                        {
                            id: "profile",
                            name: "Category profile",
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
                            name: "Delete category",
                            color: "danger",
                            startDecorator: <IconTrashFilled />
                        }
                    ]
                },
            ].filter(Boolean) as PageSidebarSection[]} />
    )
}