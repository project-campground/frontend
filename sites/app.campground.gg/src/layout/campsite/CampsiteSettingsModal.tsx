import { IconBadgesFilled, IconLayoutBoardFilled, IconTrashFilled, type ReactNode } from "@tabler/icons-react";
import type { CampsiteViewDetailed } from "types/campsites";
import CampsiteSettingsProfile from "~/layout/campsite/CampsiteSettingsProfile";
import SettingsModal, { type SettingsComponentProps } from "../SettingsModal";
import { useSession } from "~/context/session";
import CampsiteSettingsRoles from "./CampsiteSettingsRoles";
import { useSnackbars } from "~/context/snackbar";
import { useCampsiteContext } from "~/routes/_global._campsite/context";
import CampsiteSettingsDeletion from "./CampsiteSettingsDeletion";
import type { PageSidebarSection } from "~/components/sidebar/PageSidebar";

type Page = "profile" | "roles" | "delete";
const settingsPages: Record<Page, (props: SettingsComponentProps<Props>) => ReactNode | ReactNode[]> = {
    profile: CampsiteSettingsProfile,
    roles: CampsiteSettingsRoles,
    delete: CampsiteSettingsDeletion,
};

type Props = {
    campsite: CampsiteViewDetailed;
}

export default function CampsiteSettingsModal(props: Props) {
    const session = useSession();
    const snackbars = useSnackbars();
    const { updateCampsite } = useCampsiteContext();
    const callbacks: Record<Page, (fieldValues: Record<string, any>) => unknown> = {
        profile: (fieldValues) =>
            session
                .restClient!
                .updateCampsite(props.campsite.id, {
                    name: fieldValues.name,
                    description: fieldValues.description,
                    avatarUri: fieldValues.avatarUri ?? "",
                    bannerUri: fieldValues?.bannerUri ?? "",
                    tags: fieldValues.tags,
                    vanityUrl: fieldValues.vanityUrl ?? ""
                })
                .then((resp) => {
                    if (!resp.ok)
                        return snackbars.notifyApiError(resp);

                    return updateCampsite(resp.content);
                }),
        roles: ({ id, ...fieldValues }) =>
            session.restClient?.updateRole(props.campsite.id, id as string, fieldValues)
                .then((resp) => {
                    if (!resp.ok)
                        return snackbars.notifyApiError(resp);

                    const modifiedRole = props.campsite.roles.find((x) => x.id === resp.content.id);
                    if (modifiedRole)
                        return Object.assign(modifiedRole, resp.content);
                }),
        delete: () => null,
    }

    return (
        <SettingsModal<Page, Props>
            header="Campsite Settings"
            settingsProps={props}
            settingsPages={settingsPages}
            defaultPage="profile"
            onSubmit={async (page, values) => callbacks[page](values)}
            sections={[
                {
                    id: "overview",
                    header: props.campsite.name,
                    items: [
                        {
                            id: "profile",
                            name: "Campsite Profile",
                            startDecorator: <IconLayoutBoardFilled />
                        },
                    ]
                },
                {
                    id: "members",
                    header: "Campsite Members",
                    items: [
                        {
                            id: "roles",
                            name: "Roles",
                            startDecorator: <IconBadgesFilled />
                        }
                    ]
                },
                props.campsite.owner === props.campsite.member.user.did && {
                    id: "other",
                    header: "Other",
                    items: [
                        {
                            id: "delete",
                            name: "Delete campsite",
                            color: "danger",
                            startDecorator: <IconTrashFilled />
                        }
                    ]
                },
            ].filter(Boolean) as PageSidebarSection[]} />
    )
}