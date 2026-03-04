import { Alert } from "@mui/joy";
import type { SettingsComponentProps } from "../SettingsModal";
import Form from "~/components/form/Form";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import type { CategorySettingsProps } from "./CategorySettingsModal";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";

export default function CategorySettingsDeletion({ settingsProps: { category } }: SettingsComponentProps<CategorySettingsProps>) {
    const session = useSession();
    const floating = useSnackbars();

    return (
        <Form
            header="Campsite deletion"
            description={
                <Alert variant="soft" color="danger" startDecorator={<IconExclamationCircleFilled />}>
                    Deleting this category will result in permanent deletion of all of its messages and content. If you are sure you want to delete this category, type the name of the category and press 'Confirm deletion'.
                </Alert>
            }
            sections={[
                {
                    id: "confirm",
                    fields: [
                        {
                            id: "name",
                            header: "The name of the category",
                            type: "text",
                            required: true,
                            placeholder: category.name,
                            allowedValue: category.name,
                        }
                    ]
                }
            ]}
            submitText="Confirm deletion"
            submitColor="danger"
            onSubmit={() => session
                    .http
                    .categories.delete(category.id)
                    .then((resp) => {
                        if (!resp.ok)
                            return floating.notifyApiError(resp);
                    })
            }
        />
    )
}
