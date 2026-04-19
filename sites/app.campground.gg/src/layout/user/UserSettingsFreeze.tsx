import { Alert, FormControl, FormLabel } from "@mui/joy";
import type { SettingsComponentProps } from "../settings";
import Form from "~/components/form/Form";
import {
    IconExclamationCircleFilled,
    IconTrashFilled,
} from "@tabler/icons-react";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import FormSection from "~/components/form/FormSection";
import FormSubmit from "~/components/form/FormSubmit";
import FormFieldText from "~/components/form/FormFieldText";
import SettingsPageWrapper from "../settings/page";
import { useAccount } from "~/context/account";

export default function UserSettingsFreeze({}: SettingsComponentProps<{}>) {
    const session = useSession();
    const snackbars = useSnackbars();
    const account = useAccount();
    const onFreeze = () =>
        session.http.account.deactivate({}).then((resp) => {
            if (!resp.ok) return snackbars.notifyApiError(resp);
        });
    const onUnfreeze = () =>
        session.http.account.activate().then((resp) => {
            if (!resp.ok) return snackbars.notifyApiError(resp);
        });
    const deactivated = account?.authenticated && !account.account.active;

    return (
        <SettingsPageWrapper
            startDecorator={<IconTrashFilled />}
            header={<FormattedMessageGlobal id="app.users.settings.deactivate" />}
        >
            <Form onSubmit={deactivated ? onUnfreeze : onFreeze}>
                <FormSection>
                    {deactivated
                    ? <Alert
                        variant="soft"
                        color="info"
                        startDecorator={<IconExclamationCircleFilled />}
                    >
                        <FormattedMessage
                            id="app.users.deactivate.info"
                            defaultMessage="This account has been deactivated. If you want to reactivate the account, press ''{buttonText}''."
                            description="The note that the account is deactivated"
                            values={{
                                buttonText: (
                                    <FormattedMessageGlobal id="app.users.settings.reactivate" />
                                ),
                            }}
                        />
                    </Alert>
                    : <Alert
                        variant="soft"
                        color="warning"
                        startDecorator={<IconExclamationCircleFilled />}
                    >
                        <FormattedMessage
                            id="app.users.deactivate.warning"
                            defaultMessage="Deactivating will disallow you from creating posts, modifying your profile or interacting in campsites. If you are sure you want to deactivate this account, type your handle and press ''{buttonText}''."
                            description="The warning about the consequences of deleting the account"
                            values={{
                                buttonText: (
                                    <FormattedMessageGlobal id="app.users.settings.deactivate" />
                                ),
                            }}
                        />
                    </Alert>}
                </FormSection>
                {!deactivated && <FormSection>
                    <FormControl required>
                        <FormLabel>
                            <FormattedMessage
                                id="app.users.settings.delete.inputName"
                                description="The header of the input that requires typing out account's handle to allow deleting it."
                                defaultMessage="Your handle"
                            />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="handle"
                            placeholder={account?.authenticated ? account.me?.profile.handle.split("/")[2] : undefined}
                            allowedValue={account?.authenticated ? account.me?.profile.handle.split("/")[2] : null}
                        />
                    </FormControl>
                </FormSection>}
                <FormSection>
                    <FormSubmit
                        color={deactivated ? "success" : "danger"}
                        variant="glow"
                        sx={{ width: "max-content" }}
                    >
                        <FormattedMessageGlobal id={deactivated ? "app.users.settings.reactivate" : "app.users.settings.deactivate"} />
                    </FormSubmit>
                </FormSection>
            </Form>
        </SettingsPageWrapper>
    );
}
