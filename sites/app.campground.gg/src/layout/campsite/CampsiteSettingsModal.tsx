import { IconBadgesFilled, IconHammer, IconLayoutBoardFilled, IconTicket, IconTrashFilled, type ReactNode } from "@tabler/icons-react";
import type { CampsiteViewDetailed } from "types/campsites";
import CampsiteSettingsProfile from "~/layout/campsite/CampsiteSettingsProfile";
import SettingsModal, { type SettingsComponentProps } from "../SettingsModal";
import { useSession } from "~/context/session";
import CampsiteSettingsRoles from "./CampsiteSettingsRoles";
import { useSnackbars } from "~/context/snackbar";
import { useCampsiteContext } from "~/routes/_global._campsite/context";
import CampsiteSettingsDeletion from "./CampsiteSettingsDeletion";
import type { PageSidebarSection } from "~/components/pages/PageSidebar";
import CampsiteSettingsInvites from "./CampsiteSettingsInvites";
import type React from "react";
import CampsiteSettingsBans from "./CampsiteSettingsBans";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

type Page = "profile" | "bans" | "invites" | "roles" | "delete";
const settingsPages: Record<Page, typeof React.Component | ((props: SettingsComponentProps<CampsiteSettingsProps>) => ReactNode | ReactNode[])> = {
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
    const callbacks: Record<Page, (fieldValues: Record<string, any>) => unknown> = {
        profile: (fieldValues) =>
            session
                .http
                .campsites
                .update(props.campsite.id, {
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
            session.http.roles.update(props.campsite.id, id as string, fieldValues)
                .then((resp) => {
                    if (!resp.ok)
                        return snackbars.notifyApiError(resp);

                    const modifiedRole = props.campsite.roles.find((x) => x.id === resp.content.id);
                    if (modifiedRole)
                        return Object.assign(modifiedRole, resp.content);
                }),
        bans: () => null,
        invites: () => null,
        delete: () => null,
    }

    return (
        <SettingsModal<Page, CampsiteSettingsProps>
            header={<FormattedMessageGlobal id="app.campsites.settings" />}
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
                            name: <FormattedMessage
                                id="app.campsites.settings.profile"
                                defaultMessage="Campsite profile"
                                description="The campsite profile settings tab"
                            />,
                            startDecorator: <IconLayoutBoardFilled />
                        },
                    ]
                },
                {
                    id: "members",
                    header: <FormattedMessage
                        id="global.campers"
                        defaultMessage="Campers"
                        description="Campsite members"
                    />,
                    items: [
                        {
                            id: "roles",
                            name: <FormattedMessageGlobal id="app.roles" />,
                            startDecorator: <IconBadgesFilled />
                        },
                        {
                            id: "invites", 
                            name: <FormattedMessage
                                id="app.invites.plural"
                                defaultMessage="Invites"
                                description="The campsite invites in plural form"
                            />,
                            startDecorator: <IconTicket />
                        },
                        {
                            id: "bans", 
                            name: <FormattedMessage
                                id="app.bans.plural"
                                defaultMessage="Bans"
                                description="The campsite user bans in plural form"
                            />,
                            startDecorator: <IconHammer />
                        },
                    ]
                },
                props.campsite.owner === props.campsite.me.user.did && {
                    id: "other",
                    header: <FormattedMessage
                        id="app.settings.other"
                        defaultMessage="Other"
                        description="Other settings pages and content"
                    />,
                    items: [
                        {
                            id: "delete",
                            name: <FormattedMessageGlobal id="app.campsites.delete" />,
                            color: "danger",
                            startDecorator: <IconTrashFilled />
                        }
                    ]
                },
            ].filter(Boolean) as PageSidebarSection[]} />
    )
}