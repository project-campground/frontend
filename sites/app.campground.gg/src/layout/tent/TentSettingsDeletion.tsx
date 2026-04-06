import { Alert } from "@mui/joy";
import type { SettingsComponentProps } from "../SettingsModal";
import Form from "~/components/form/Form";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import type { TentSettingsProps } from "./TentSettingsModal";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { useContext } from "react";
import CloseModalContext from "@mui/joy/Modal/CloseModalContext";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

export default function TentSettingsDeletion({
    settingsProps: { tent },
}: SettingsComponentProps<TentSettingsProps>) {
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
                        id="app.tents.delete.warning"
                        defaultMessage="Deleting this tent will result in permanent deletion of all of its permissions, messages and content. If you are sure you want to delete this tent, type the name of the tent and press ''{buttonText}''."
                        description="The warning about the consequences of deleting tent"
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
                                    id="app.tents.delete.inputName"
                                    description="The header of the input that requires typing out tent's name to allow deleting it."
                                    defaultMessage="The name of the tent"
                                />
                            ),
                            type: "text",
                            required: true,
                            placeholder: tent.name,
                            allowedValue: tent.name,
                        },
                    ],
                },
            ]}
            submitText={<FormattedMessageGlobal id="form.confirmDelete" />}
            submitColor="danger"
            onSubmit={(ev) =>
                session.http.tents.delete(tent.id).then((resp) => {
                    if (!resp.ok) return floating.notifyApiError(resp);

                    return modalClose?.(ev, "closeClick");
                })
            }
        />
    );
}
