import {
    IconBadgesFilled,
    IconHammer,
    IconLayoutBoardFilled,
    IconTicket,
    IconTrashFilled,
    type ReactNode,
} from "@tabler/icons-react";
import type { CampsiteViewDetailed } from "types/campground/campsites";
import CampsiteSettingsProfile from "~/layout/campsite/CampsiteSettingsProfile";
import SettingsModal, { type SettingsComponentProps } from "../settings";
import { useSession } from "~/context/session";
import CampsiteSettingsRoles from "./CampsiteSettingsRoles";
import { useSnackbars } from "~/context/snackbar";
import { useCampsiteContext } from "~/routes/_global._campsite/context";
import CampsiteSettingsDeletion from "./CampsiteSettingsDeletion";
import CampsiteSettingsInvites from "./CampsiteSettingsInvites";
import type React from "react";
import CampsiteSettingsBans from "./CampsiteSettingsBans";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import PageSidebarItem from "~/components/pages/PageSidebarItem";
import PageSidebarSection from "~/components/pages/PageSidebarSection";

type Page = "profile" | "bans" | "invites" | "roles" | "delete";
const settingsPages: Record<
    Page,
    | typeof React.Component
    | ((
          props: SettingsComponentProps<CampsiteSettingsProps>,
      ) => ReactNode | ReactNode[])
> = {
    profile: CampsiteSettingsProfile,
    roles: CampsiteSettingsRoles,
    invites: CampsiteSettingsInvites,
    bans: CampsiteSettingsBans,
    delete: CampsiteSettingsDeletion,
};

export type CampsiteSettingsProps = {
    campsite: CampsiteViewDetailed;
};

export default function CampsiteSettingsModal(props: CampsiteSettingsProps) {
    const session = useSession();
    const snackbars = useSnackbars();
    const { updateCampsite } = useCampsiteContext();
    const callbacks: Record<
        Page,
        (fieldValues: Record<string, any>) => unknown
    > = {
        profile: (fieldValues) =>
            session.http.campsites
                .update(props.campsite.id, {
                    name: fieldValues.name,
                    description: fieldValues.description,
                    avatarUri: fieldValues.avatarUri ?? "",
                    bannerUri: fieldValues?.bannerUri ?? "",
                    tags: fieldValues.tags,
                    vanityUrl: fieldValues.vanityUrl ?? "",
                })
                .then((resp) => {
                    if (!resp.ok) return snackbars.notifyApiError(resp);

                    return updateCampsite(resp.content);
                }),
        roles: ({ id, ...fieldValues }) =>
            session.http.roles
                .update(props.campsite.id, id as string, fieldValues)
                .then((resp) => {
                    if (!resp.ok) return snackbars.notifyApiError(resp);

                    const modifiedRole = props.campsite.roles.find(
                        (x) => x.id === resp.content.id,
                    );
                    if (modifiedRole)
                        return Object.assign(modifiedRole, resp.content);
                }),
        bans: () => null,
        invites: () => null,
        delete: () => null,
    };

    return (
        <SettingsModal<Page, CampsiteSettingsProps>
            header={<FormattedMessageGlobal id="app.campsites.settings" />}
            settingsProps={props}
            settingsPages={settingsPages}
            defaultPage="profile"
            onSubmit={async (page, values) => callbacks[page](values)}
        >
            <PageSidebarSection header={props.campsite.name}>
                <PageSidebarItem
                    id="profile"
                    startDecorator={<IconLayoutBoardFilled />}
                >
                    <FormattedMessage
                        id="app.campsites.settings.profile"
                        defaultMessage="Campsite profile"
                        description="The campsite profile settings tab"
                    />
                </PageSidebarItem>
            </PageSidebarSection>
            <PageSidebarSection
                header={
                    <FormattedMessage
                        id="global.campers"
                        defaultMessage="Campers"
                        description="Campsite members"
                    />
                }
            >
                <PageSidebarItem
                    id="roles"
                    startDecorator={<IconBadgesFilled />}
                >
                    <FormattedMessageGlobal id="app.roles" />
                </PageSidebarItem>
                <PageSidebarItem id="invites" startDecorator={<IconTicket />}>
                    <FormattedMessageGlobal id="app.invites" />
                </PageSidebarItem>
                <PageSidebarItem id="bans" startDecorator={<IconHammer />}>
                    <FormattedMessageGlobal id="app.bans" />
                </PageSidebarItem>
            </PageSidebarSection>
            {props.campsite.owner === props.campsite.me.user.did && (
                <PageSidebarSection
                    header={<FormattedMessageGlobal id="app.settings.other" />}
                >
                    <PageSidebarItem
                        id="delete"
                        startDecorator={<IconTrashFilled />}
                        color="danger"
                    >
                        <FormattedMessageGlobal id="app.campsites.delete" />
                    </PageSidebarItem>
                </PageSidebarSection>
            )}
        </SettingsModal>
    );
}
