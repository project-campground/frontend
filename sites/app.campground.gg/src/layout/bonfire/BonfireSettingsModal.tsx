import { IconLayoutBoardFilled, IconTrashFilled, type ReactNode } from "@tabler/icons-react";
import type { BonfireViewBasic } from "types/campsites";
import SettingsModal, { type SettingsComponentProps } from "../SettingsModal";
import { useSession } from "~/context/session";
import BonfireSettingsProfile from "./BonfireSettingsProfile";
import BonfireSettingsDeletion from "./BonfireSettingsDeletion";

type Page = "profile" | "delete";
const settingsPages: Record<Page, (props: SettingsComponentProps<BonfireSettingsProps>) => ReactNode | ReactNode[]> = {
    profile: BonfireSettingsProfile,
    delete: BonfireSettingsDeletion,
};

export type BonfireSettingsProps = {
    bonfire: BonfireViewBasic;
    canDeleteBonfire: boolean;
    onBonfireDeleted: () => unknown;
}

export default function BonfireSettingsModal(props: BonfireSettingsProps) {
    const session = useSession();
    const callbacks: Record<Page, (fieldValues: Record<string, any>) => unknown> = {
        profile: (fieldValues) => (console.log(fieldValues), session.restClient?.updateBonfire(props.bonfire.campsiteId, props.bonfire.id, { name: fieldValues.name, description: fieldValues.description, avatarUri: fieldValues.avatarUri ?? "", bannerUri: fieldValues.bannerUri ?? "" })),
        delete: () => null,
    }

    return (
        <SettingsModal<Page, BonfireSettingsProps>
            header="Bonfire Settings"
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
                            name: "Bonfire profile",
                            startDecorator: <IconLayoutBoardFilled />
                        },
                    ]
                },
                {
                    id: "other",
                    header: "Other",
                    items: [
                        {
                            id: "delete",
                            name: "Delete bonfire",
                            color: "danger",
                            startDecorator: <IconTrashFilled />
                        }
                    ]
                },
            ]} />
    )
}