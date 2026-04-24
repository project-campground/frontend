import { Alert, Button, Stack, Typography } from "@mui/joy";
import type { SettingsComponentProps } from "../settings";
import React, { type ContextType } from "react";
import SettingsPageWrapper from "../settings/page";
import { IconMailFilled, IconSnowflake, IconTrash, IconUserCircle, IconUserFilled } from "@tabler/icons-react";
import { AccountContext, type AccountContextAuthenticated } from "~/context/account";
import { FormattedMessage } from "react-intl";
import UserHeader from "~/components/users/UserHeader";
import CardButton from "~/components/CardButton";

type DefaultValues = {
    
};
type State = {
    
};

export default class UserSettingsAccount extends React.Component<SettingsComponentProps<{}>, State> {
    static contextType?: React.Context<any> | undefined = AccountContext;
    declare context: AccountContextAuthenticated;
    private _defaultValues: DefaultValues;
    private _init: boolean = false;

    constructor(props: SettingsComponentProps<{}>, context: ContextType<typeof AccountContext>) {
        super(props, context);

        this._defaultValues = {
            
        };
    }
    oneOfNotDefault(fieldValues: Record<string, any>) {
        return Object.entries(fieldValues).some(
            ([key, value]) =>
                this._defaultValues[key as keyof typeof this._defaultValues] != value,
        );
    }
    componentDidMount(): void {
        if (this._init)
            return;

        this._init = true;
    }
    render() {
        const me = this.context.profile;

        return (
            <SettingsPageWrapper
                startDecorator={<IconUserFilled />}
                header={me.profile.displayName}
                gap={4}
            >
                <Stack gap={1}>
                    <UserHeader did={me.profile.did} avatar={me.profile.avatar} banner={me.profile.banner} bannerAspectRatio={10} />
                    <Stack>
                        <Typography level="h2">
                            {me.profile.displayName}
                        </Typography>
                        <Typography level="body-lg" textColor="text.tertiary">
                            @{me.profile.handle.substring("at://".length)}
                        </Typography>
                    </Stack>
                </Stack>
                {this.context.sessionInfo.emailConfirmed
                ? <Alert variant="soft" color="success" startDecorator={<IconMailFilled />}>
                    <FormattedMessage
                        id="app.settings.emailConfirmed"
                        defaultMessage="The email is confirmed to belong to this account."
                        description="Notifies user in the settings that their email is already confirmed"
                    />
                </Alert>
                : <Alert variant="soft" color="danger" startDecorator={<IconMailFilled />}>
                    <Stack gap={1} alignItems="start">
                        <FormattedMessage
                            id="app.settings.emailUnconfirmed"
                            defaultMessage="Your email has not been yet confirmed to belong to this account. Make sure to confirm it."
                            description="Notifies user in the settings that their email has not yet been confirmed"
                        />
                        <Button color="danger">
                            <FormattedMessage
                                id="app.users.settings.emailConfirmButton"
                                defaultMessage="Confirm email"
                                description="The email confirm button in settings"
                            />
                        </Button>
                    </Stack>
                </Alert>}
                {/* <Stack gap={1}>
                    <Typography level="h4" fontWeight={700}>
                        <FormattedMessage
                            id="app.settings.buttons.header"
                            defaultMessage="Do more with your account"
                            description="'Do more with your account' header for buttons in the settings page home"
                        />
                    </Typography>
                    <CardButton startDecorator={<IconUserCircle size={32} />}>
                        <Typography level="title-md" fontWeight={700}>
                            <FormattedMessage
                                id="app.settings.profile.button.title"
                                defaultMessage="Manage your profile"
                                description="'Manage your profile' button in the settings page home"
                            />
                        </Typography>
                        <Typography level="body-md" fontWeight={500}>
                            <FormattedMessage
                                id="app.settings.profile.button.subtitle"
                                defaultMessage="Change the username, tagline, etc."
                                description="'Manage your profile' button's subtitle in the settings page home"
                            />
                        </Typography>
                    </CardButton>
                    <CardButton startDecorator={<IconSnowflake size={32} />} color="danger">
                        <Typography level="title-md" fontWeight={700}>
                            <FormattedMessage
                                id="app.settings.deactivate.button.title"
                                defaultMessage="Deactivate your account"
                                description="'Deactivate the account' button in the settings page home"
                            />
                        </Typography>
                        <Typography level="body-md" fontWeight={500}>
                            <FormattedMessage
                                id="app.settings.profile.button.subtitle"
                                defaultMessage="Deactivate this account and make it unusable until it is reactivated"
                                description="'Deactivate the account' button's subtitle in the settings page home"
                            />
                        </Typography>
                    </CardButton>
                    <CardButton startDecorator={<IconTrash size={32} />} color="danger">
                        <Typography level="title-md" fontWeight={700}>
                            <FormattedMessage
                                id="app.settings.delete.button.title"
                                defaultMessage="Delete your account"
                                description="'Delete your account' button in the settings page home"
                            />
                        </Typography>
                        <Typography level="body-md" fontWeight={500}>
                            <FormattedMessage
                                id="app.settings.delete.button.subtitle"
                                defaultMessage="Erase your account and all of your posts (this does not include messages)"
                                description="'Delete your account' button's subtitle in the settings page home"
                            />
                        </Typography>
                    </CardButton>
                </Stack> */}
            </SettingsPageWrapper>
        );
    }
}

// export default function UserSettingsAccount({
//     setResetHandler,
//     onValuesChanged,
// }: SettingsComponentProps<{ me: Me }>) {
//     const me = useMeContext();
//     const defaultValues = useMemo(
//         () => ({
//         }),
//         [],
//     );

// }
