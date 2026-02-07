import { IconBadgesFilled, IconLayoutBoardFilled, type ReactNode } from "@tabler/icons-react";
import type { CampsiteViewDetailed } from "types/campsites";
import CampsiteSettingsProfile from "~/layout/campsite/CampsiteSettingsProfile";
import SettingsModal, { type SettingsComponentProps } from "../SettingsModal";
import { useSession } from "~/context/session";
import CampsiteSettingsRoles from "./CampsiteSettingsRoles";

type Page = "profile" | "roles";
const settingsPages: Record<Page, (props: SettingsComponentProps<Props>) => ReactNode | ReactNode[]> = {
    profile: CampsiteSettingsProfile,
    roles: CampsiteSettingsRoles,
};

type Props = {
    campsite: CampsiteViewDetailed;
}

export default function CampsiteSettingsModal(props: Props) {
    const session = useSession();
    const callbacks: Record<Page, (fieldValues: Record<string, any>) => unknown> = {
        profile: (fieldValues) => session.restClient?.updateCampsite(props.campsite.id, { name: fieldValues.name, description: fieldValues.description, avatarUri: fieldValues.avatarUri ?? "", bannerUri: fieldValues?.bannerUri ?? "", tags: fieldValues.tags, vanityUrl: fieldValues.vanityUrl ?? "" }),
        roles: (fieldValues) => session.restClient?.updateCampsite(props.campsite.id, { name: fieldValues.name }),
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
            ]} />
    )
}