import { IconUserFilled, type ReactNode } from "@tabler/icons-react";
import SettingsModal, { type SettingsComponentProps } from "../settings";
import { useAccount } from "~/context/account";
import type React from "react";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import PageSidebarItem from "~/components/pages/PageSidebarItem";
import PageSidebarSection from "~/components/pages/PageSidebarSection";
import UserSettingsAccount from "./UserSettingsAccount";

type Page = "account";
const settingsPages: Record<
    Page,
    | { new (props: any, context: any): React.Component }
    | ((
          props: SettingsComponentProps<UserSettingsProps>,
      ) => ReactNode | ReactNode[])
> = {
    account: UserSettingsAccount,
};

export type UserSettingsProps = {
};

export default function UserSettingsModal(props: UserSettingsProps) {
    const account = useAccount();
    const callbacks: Record<
        Page,
        (fieldValues: Record<string, any>) => unknown
    > = {
        account: () => {}
    };

    return (
        <SettingsModal<Page, UserSettingsProps>
            header={<FormattedMessageGlobal id="app.user.settings" />}
            settingsProps={props}
            settingsPages={settingsPages}
            defaultPage="account"
            onSubmit={async (page, values) => callbacks[page](values)}
        >
            <PageSidebarSection header={`@${account?.me.profile.handle.split("/")[2]}`}>
                <PageSidebarItem
                    id="account"
                    startDecorator={<IconUserFilled />}
                >
                    <FormattedMessage
                        id="app.user.settings.account"
                        defaultMessage="Account"
                        description="The user account settings tab"
                    />
                </PageSidebarItem>
            </PageSidebarSection>
        </SettingsModal>
    );
}
