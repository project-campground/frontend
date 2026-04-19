import { IconSnowflake, IconTrashFilled, IconUserCircle, IconUserFilled, type ReactNode } from "@tabler/icons-react";
import SettingsModal, { type SettingsComponentProps } from "../settings";
import { useAccount } from "~/context/account";
import type React from "react";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import PageSidebarItem from "~/components/pages/PageSidebarItem";
import PageSidebarSection from "~/components/pages/PageSidebarSection";
import UserSettingsAccount from "./UserSettingsAccount";
import UserSettingsFreeze from "./UserSettingsFreeze";

type Page = "account" | "profile" | "deactivate" | "delete";
const settingsPages: Record<
    Page,
    | { new (props: any, context: any): React.Component }
    | ((
          props: SettingsComponentProps<UserSettingsProps>,
      ) => ReactNode | ReactNode[])
> = {
    account: UserSettingsAccount,
    profile: UserSettingsAccount,
    deactivate: UserSettingsFreeze,
    delete: UserSettingsFreeze,
};

export type UserSettingsProps = {
};

export default function UserSettingsModal(props: UserSettingsProps) {
    const account = useAccount();
    const callbacks: Record<
        Page,
        (fieldValues: Record<string, any>) => unknown
    > = {
        account: () => {},
        profile: () => {},
        deactivate: () => {},
        delete: () => {},
    };

    return (
        <SettingsModal<Page, UserSettingsProps>
            header={<FormattedMessageGlobal id="app.users.settings" />}
            settingsProps={props}
            settingsPages={settingsPages}
            defaultPage="account"
            onSubmit={async (page, values) => callbacks[page](values)}
        >
            <PageSidebarSection header={`@${account?.authenticated ? account.me.profile.handle.split("/")[2] : ""}`}>
                <PageSidebarItem
                    id="account"
                    startDecorator={<IconUserFilled />}
                >
                    <FormattedMessage
                        id="app.users.settings.account"
                        defaultMessage="Account"
                        description="The user account settings tab"
                    />
                </PageSidebarItem>
                <PageSidebarItem
                    id="profile"
                    startDecorator={<IconUserCircle />}
                >
                    <FormattedMessage
                        id="app.users.settings.profile"
                        defaultMessage="User profile"
                        description="The user profile settings tab"
                    />
                </PageSidebarItem>
            </PageSidebarSection>
            <PageSidebarSection header={
                <FormattedMessageGlobal id="app.settings.other" />
            }>
                <PageSidebarItem
                    id="deactivate"
                    startDecorator={<IconSnowflake />}
                    color="danger"
                >
                    <FormattedMessageGlobal id="app.users.settings.deactivate" />
                </PageSidebarItem>
                <PageSidebarItem
                    id="delete"
                    startDecorator={<IconTrashFilled />}
                    color="danger"
                >
                    <FormattedMessage
                        id="app.users.settings.delete"
                        defaultMessage="Delete account"
                        description="The account deletion page in user settings"
                    />
                </PageSidebarItem>
            </PageSidebarSection>
        </SettingsModal>
    );
}
