import { Alert } from "@mui/joy";
import type { SettingsComponentProps } from "../SettingsModal";
import Form from "~/components/form/Form";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import type { BonfireSettingsProps } from "./BonfireSettingsModal";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

export default function BonfireSettingsDeletion({
    settingsProps: { bonfire, onBonfireDeleted },
}: SettingsComponentProps<BonfireSettingsProps>) {
    return (
        <Form
            header="Campsite deletion"
            description={
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
            }
            sections={[
                {
                    id: "confirm",
                    fields: [
                        {
                            id: "name",
                            header: (
                                <FormattedMessage
                                    id="app.bonfires.delete.inputName"
                                    description="The header of the input that requires typing out bonfire's name to allow deleting it."
                                    defaultMessage="The name of the bonfire"
                                />
                            ),
                            type: "text",
                            required: true,
                            placeholder: bonfire.name,
                            allowedValue: bonfire.name,
                        },
                    ],
                },
            ]}
            submitText={<FormattedMessageGlobal id="form.confirmDelete" />}
            submitColor="danger"
            onSubmit={onBonfireDeleted}
        />
    );
}
