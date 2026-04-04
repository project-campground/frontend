import { Alert } from "@mui/joy";
import type { SettingsComponentProps } from "../SettingsModal";
import type { CampsiteViewDetailed } from "types/campsites";
import Form from "~/components/form/Form";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { useContext } from "react";
import CloseModalContext from "@mui/joy/Modal/CloseModalContext";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

export default function CampsiteSettingsDeletion({
    settingsProps: { campsite },
}: SettingsComponentProps<{ campsite: CampsiteViewDetailed }>) {
    const navigate = useNavigate();
    const session = useSession();
    const snackbars = useSnackbars();
    const modalClose = useContext(CloseModalContext);
    const onDelete = () =>
        session.http.campsites.delete(campsite.id).then((resp) => {
            if (!resp.ok) return snackbars.notifyApiError(resp);

            modalClose?.({}, "closeClick");
            return navigate("/");
        });

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
                        id="app.campsites.delete.warning"
                        defaultMessage="Deleting this campsite will result in permanent deletion of all of its messages, tents, bonfires, content and will force all members to leave. If you are sure you want to delete this campsite, type the name of the campsite and press ''{buttonText}''."
                        description="The warning about the consequences of deleting campsite"
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
                                    id="app.campsites.settings.delete.inputName"
                                    description="The header of the input that requires typing out campsite's name to allow deleting it."
                                    defaultMessage="The name of the campsite"
                                />
                            ),
                            type: "text",
                            required: true,
                            placeholder: campsite.name,
                            allowedValue: campsite.name,
                        },
                    ],
                },
            ]}
            submitText={<FormattedMessageGlobal id="form.confirmDelete" />}
            submitColor="danger"
            onSubmit={onDelete}
        />
    );
}
