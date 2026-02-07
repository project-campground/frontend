import { IconLayoutBoardFilled, type ReactNode } from "@tabler/icons-react";
import type { BonfireViewBasic } from "types/campsites";
import SettingsModal, { type SettingsComponentProps } from "../SettingsModal";
import { useSession } from "~/context/session";
import BonfireSettingsProfile from "./BonfireSettingsProfile";

type Page = "profile";
const settingsPages: Record<Page, (props: SettingsComponentProps<Props>) => ReactNode | ReactNode[]> = {
    profile: BonfireSettingsProfile,
};

type Props = {
    bonfire: BonfireViewBasic;
    canDeleteBonfire: boolean;
    onBonfireDeleted: () => unknown;
}

export default function BonfireSettingsModal(props: Props) {
    const session = useSession();
    const callbacks: Record<Page, (fieldValues: Record<string, any>) => unknown> = {
        profile: (fieldValues) => (console.log(fieldValues), session.restClient?.updateBonfire(props.bonfire.campsiteId, props.bonfire.id, { name: fieldValues.name, description: fieldValues.description, avatarUri: fieldValues.avatarUri ?? "", bannerUri: fieldValues.bannerUri ?? "" })),
    }

    return (
        <SettingsModal<Page, Props>
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
                            name: "Bonfire Profile",
                            startDecorator: <IconLayoutBoardFilled />
                        },
                    ]
                },
            ]} />
    )
}