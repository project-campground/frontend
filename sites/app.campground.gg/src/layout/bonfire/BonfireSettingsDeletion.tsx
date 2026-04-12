import { Alert, FormControl, FormLabel } from "@mui/joy";
import type { SettingsComponentProps } from "../settings";
import Form from "~/components/form/Form";
import {
    IconExclamationCircleFilled,
    IconTrashFilled,
} from "@tabler/icons-react";
import type { BonfireSettingsProps } from "./BonfireSettingsModal";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import FormSection from "~/components/form/FormSection";
import FormSubmit from "~/components/form/FormSubmit";
import FormFieldText from "~/components/form/FormFieldText";
import SettingsPageWrapper from "../settings/page";

export default function BonfireSettingsDeletion({
    settingsProps: { bonfire, onBonfireDeleted },
}: SettingsComponentProps<BonfireSettingsProps>) {
    return (
        <SettingsPageWrapper
            startDecorator={<IconTrashFilled />}
            header={<FormattedMessageGlobal id="app.bonfires.delete" />}
        >
            <Form onSubmit={onBonfireDeleted}>
                <FormSection>
                    <Alert
                        variant="soft"
                        color="danger"
                        startDecorator={<IconExclamationCircleFilled />}
                    >
                        <FormattedMessage
                            id="app.bonfires.settings.delete.warning"
                            defaultMessage="Deleting this bonfire will result in permanent deletion of all of its messages, tents and content. If you are sure you want to delete this bonfire, type the name of the bonfire and press ''{buttonText}''."
                            description="The warning about the consequences of deleting bonfire"
                            values={{
                                buttonText: (
                                    <FormattedMessageGlobal id="form.confirmDelete" />
                                ),
                            }}
                        />
                    </Alert>
                </FormSection>
                <FormSection>
                    <FormControl>
                        <FormLabel>
                            <FormattedMessage
                                id="app.bonfires.delete.inputName"
                                description="The header of the input that requires typing out bonfire's name to allow deleting it."
                                defaultMessage="The name of the bonfire"
                            />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="name"
                            placeholder={bonfire.name}
                            allowedValue={bonfire.name}
                        />
                    </FormControl>
                </FormSection>
                <FormSection>
                    <FormSubmit color="danger" sx={{ width: "max-content" }}>
                        <FormattedMessageGlobal id="form.confirmDelete" />
                    </FormSubmit>
                </FormSection>
            </Form>
        </SettingsPageWrapper>
    );
}
