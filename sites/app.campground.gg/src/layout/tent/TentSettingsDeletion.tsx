import { Alert } from "@mui/joy";
import type { SettingsComponentProps } from "../SettingsModal";
import Form from "~/components/form/Form";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import type { TentSettingsProps } from "./TentSettingsModal";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";

export default function TentSettingsDeletion({ settingsProps: { tent } }: SettingsComponentProps<TentSettingsProps>) {
    const session = useSession();
    const floating = useSnackbars();

    return (
        <Form
            header="Campsite deletion"
            description={
                <Alert variant="soft" color="danger" startDecorator={<IconExclamationCircleFilled />}>
                    Deleting this tent will result in permanent deletion of all of its messages and content. If you are sure you want to delete this tent, type the name of the tent and press 'Confirm deletion'.
                </Alert>
            }
            sections={[
                {
                    id: "confirm",
                    fields: [
                        {
                            id: "name",
                            header: "The name of the tent",
                            type: "text",
                            required: true,
                            placeholder: tent.name,
                            allowedValue: tent.name,
                        }
                    ]
                }
            ]}
            submitText="Confirm deletion"
            submitColor="danger"
            onSubmit={() => session
                    .restClient
                    .deleteTent(tent.id)
                    .then((resp) => {
                        if (!resp.ok)
                            return floating.notifyApiError(resp);
                    })
            }
        />
    )
}
