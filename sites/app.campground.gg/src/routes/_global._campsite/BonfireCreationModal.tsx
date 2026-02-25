import { DialogContent, DialogTitle, ModalClose, ModalDialog } from "@mui/joy";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";

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
            ?.createBonfire(campsiteId, { ...body, priority: lowestPriorityBonfire + 1 } as { name: string; description: string; priority: number; })
            .then((resp) => {
                if (!resp.ok)
                    return snackbars.notifyApiError(resp);

                return onClose();
            });

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>Create bonfire</DialogTitle>
            <DialogContent>Create a new bonfire in this campsite</DialogContent>
            <Form
                sections={[
                    {
                        id: "info",
                        fields: [
                            {
                                id: "name",
                                type: "text",
                                header: "Bonfire name",
                                required: true,
                            },
                            {
                                id: "description",
                                type: "text",
                                header: "Bonfire description",
                                defaultValue: "",
                            },
                        ]
                    },
                ]}
                onSubmit={(_, values) => onBonfireCreate(values)}
                submitText="Create"
            />
        </ModalDialog>
    )
}