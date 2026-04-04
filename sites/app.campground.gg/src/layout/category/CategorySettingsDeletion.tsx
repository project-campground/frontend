import { Alert } from "@mui/joy";
import type { SettingsComponentProps } from "../SettingsModal";
import Form from "~/components/form/Form";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import type { CategorySettingsProps } from "./CategorySettingsModal";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { useContext } from "react";
import CloseModalContext from "@mui/joy/Modal/CloseModalContext";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

export default function CategorySettingsDeletion({
    settingsProps: { category },
}: SettingsComponentProps<CategorySettingsProps>) {
    const session = useSession();
    const floating = useSnackbars();
    const modalClose = useContext(CloseModalContext);

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
                        id="app.tentCategories.settings.deleteWarning"
                        defaultMessage="Deleting this tent category will result in permanent deletion of all of its messages, tents and content. If you are sure you want to delete this tent category, type the name of the category and press ''{buttonText}''."
                        description="The warning about the consequences of deleting tent category"
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
                                    id="app.tentCategories.settings.deleteInputName"
                                    description="The header of the input that requires typing out tent category's name to allow deleting it."
                                    defaultMessage="The name of the category"
                                />
                            ),
                            type: "text",
                            required: true,
                            placeholder: category.name,
                            allowedValue: category.name,
                        },
                    ],
                },
            ]}
            submitText={<FormattedMessageGlobal id="form.confirmDelete" />}
            submitColor="danger"
            onSubmit={(ev) =>
                session.http.categories.delete(category.id).then((resp) => {
                    if (!resp.ok) return floating.notifyApiError(resp);

                    return modalClose?.(ev, "closeClick");
                })
            }
        />
    );
}
