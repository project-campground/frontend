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

export default function CampsiteSettingsDeletion({ settingsProps: { campsite } }: SettingsComponentProps<{ campsite: CampsiteViewDetailed }>) {
    const navigate = useNavigate();
    const session = useSession();
    const snackbars = useSnackbars();
    const modalClose = useContext(CloseModalContext);
    const onDelete = () =>
        session
            .http
            .campsites
            .delete(campsite.id)
            .then((resp) => {
                if (!resp.ok)
                    return snackbars.notifyApiError(resp);

                console.log("AAAAAAA");
                modalClose?.({}, "closeClick");
                return navigate("/");
            });

    return (
        <Form
            header="Campsite deletion"
            description={
                <Alert variant="soft" color="danger" startDecorator={<IconExclamationCircleFilled />}>
                    Deleting this campsite will result in permanent deletion of all of its messages, tents, bonfires, content and will force all members to leave. If you are sure you want to delete this campsite, type the name of the campsite and press 'Confirm deletion'.
                </Alert>
            }
            sections={[
                {
                    id: "confirm",
                    fields: [
                        {
                            id: "name",
                            header: "The name of the campsite",
                            type: "text",
                            required: true,
                            placeholder: campsite.name,
                            allowedValue: campsite.name,
                        }
                    ]
                }
            ]}
            submitText="Confirm deletion"
            submitColor="danger"
            onSubmit={onDelete}
        />
    )
}
