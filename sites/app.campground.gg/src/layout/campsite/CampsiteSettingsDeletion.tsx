import { Alert, FormControl, FormLabel } from "@mui/joy";
import type { SettingsComponentProps } from "../settings";
import type { CampsiteViewDetailed } from "types/campsites";
import Form from "~/components/form/Form";
import {
    IconExclamationCircleFilled,
    IconTrashFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { useContext } from "react";
import CloseModalContext from "@mui/joy/Modal/CloseModalContext";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import FormSection from "~/components/form/FormSection";
import FormSubmit from "~/components/form/FormSubmit";
import FormFieldText from "~/components/form/FormFieldText";
import SettingsPageWrapper from "../settings/page";

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
        <SettingsPageWrapper
            startDecorator={<IconTrashFilled />}
            header={<FormattedMessageGlobal id="app.campsites.delete" />}
        >
            <Form onSubmit={onDelete}>
                <FormSection>
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
                </FormSection>
                <FormSection>
                    <FormControl required>
                        <FormLabel>
                            <FormattedMessage
                                id="app.campsites.settings.delete.inputName"
                                description="The header of the input that requires typing out campsite's name to allow deleting it."
                                defaultMessage="The name of the campsite"
                            />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="name"
                            placeholder={campsite.name}
                            allowedValue={campsite.name}
                        />
                    </FormControl>
                </FormSection>
                <FormSection>
                    <FormSubmit
                        color="danger"
                        variant="glow"
                        sx={{ width: "max-content" }}
                    >
                        <FormattedMessageGlobal id="form.confirmDelete" />
                    </FormSubmit>
                </FormSection>
            </Form>
        </SettingsPageWrapper>
    );
}
