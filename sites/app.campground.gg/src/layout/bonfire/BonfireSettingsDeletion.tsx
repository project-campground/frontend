import { Alert } from "@mui/joy";
import type { SettingsComponentProps } from "../SettingsModal";
import Form from "~/components/form/Form";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import type { BonfireSettingsProps } from "./BonfireSettingsModal";

export default function BonfireSettingsDeletion({ settingsProps: { bonfire, onBonfireDeleted } }: SettingsComponentProps<BonfireSettingsProps>) {
    return (
        <Form
            header="Campsite deletion"
            description={
                <Alert variant="soft" color="danger" startDecorator={<IconExclamationCircleFilled />}>
                    Deleting this bonfire will result in permanent deletion of all of its messages, tents and content. If you are sure you want to delete this bonfire, type the name of the bonfire and press 'Confirm deletion'.
                </Alert>
            }
            sections={[
                {
                    id: "confirm",
                    fields: [
                        {
                            id: "name",
                            header: "The name of the bonfire",
                            type: "text",
                            required: true,
                            placeholder: bonfire.name,
                            allowedValue: bonfire.name,
                        }
                    ]
                }
            ]}
            submitText="Confirm deletion"
            submitColor="danger"
            onSubmit={onBonfireDeleted}
        />
    )
}
