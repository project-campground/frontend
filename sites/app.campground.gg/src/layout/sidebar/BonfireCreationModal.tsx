import { DialogContent, DialogTitle, ModalClose, ModalDialog } from "@mui/joy";
import { FormattedMessage } from "react-intl";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { FormattedMessageGlobal } from "~/i18n";

type Props = {
    campsiteId: string;
    lowestPriorityBonfire: number;
    onClose: () => Promise<void> | void;
};

export default function BonfireCreationModal({ campsiteId, onClose, lowestPriorityBonfire }: Props) {
    const session = useSession();
    const snackbars = useSnackbars();

    const onBonfireCreate = (body: Record<string, any>): unknown =>
        session.http
            .bonfires
            .create(campsiteId, { ...body, position: lowestPriorityBonfire + 1 } as { name: string; description: string; position: number; })
            .then((resp) => {
                if (!resp.ok)
                    return snackbars.notifyApiError(resp);

                return onClose();
            });

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle><FormattedMessageGlobal id="app.bonfires.create" /></DialogTitle>
            <DialogContent>
                <FormattedMessage
                    id="tent.bonfires.create.description"
                    defaultMessage="Create a new bonfire in this campsite"
                    description="Description for bonfire creation modal"
                />
            </DialogContent>
            <Form
                sections={[
                    {
                        id: "info",
                        fields: [
                            {
                                id: "name",
                                type: "text",
                                header: <FormattedMessageGlobal id="app.bonfires.settings.name" />,
                                required: true,
                            },
                            {
                                id: "description",
                                type: "textarea",
                                header: <FormattedMessageGlobal id="info.description" />,
                                defaultValue: "",
                            },
                        ]
                    },
                ]}
                onSubmit={(_, values) => onBonfireCreate(values)}
                submitText={<FormattedMessageGlobal id="app.bonfires.create" />}
            />
        </ModalDialog>
    )
}