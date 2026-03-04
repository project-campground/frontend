import { DialogContent, DialogTitle, ModalClose, ModalDialog } from "@mui/joy";
import CopyInput from "~/components/CopyInput";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";

type Props = {
    campsiteId: string;
};

type FormValue = { allowedAmount: number | null; };

export default function InviteCreationModal({ campsiteId }: Props) {
    const session = useSession();
    const snackbars = useSnackbars();
    let values: FormValue = { allowedAmount: null };

    const onInviteCreate = (): Promise<string> =>
        session.http
            .invites
            .create(campsiteId, values)
            .then((resp) => {
                if (!resp.ok)
                    return (snackbars.notifyApiError(resp), "");

                return resp.content.id;
            });

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>Create invite</DialogTitle>
            <DialogContent>Create a new invite for this campsite</DialogContent>
            <CopyInput onCopy={onInviteCreate} placeholder="Invite code" />
            <Form
                sections={[
                    {
                        id: "info",
                        fields: [
                            {
                                id: "allowedAmount",
                                type: "number",
                                header: "Allowed amount",
                                max: 1000,
                                min: 1,
                            },
                        ]
                    },
                ]}
                onChange={(isValid, newValues) => isValid && (values = newValues as FormValue)}
            />
        </ModalDialog>
    )
}