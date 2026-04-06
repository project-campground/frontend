import { DialogContent, DialogTitle, ModalClose, ModalDialog, Stack } from "@mui/joy";
import { useIntl } from "react-intl";
import CopyInput from "~/components/CopyInput";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { globalIntlDeclarations } from "~/i18n";

type Props = {
    campsiteId: string;
};

type FormValue = { allowedAmount: number | null; };

export default function InviteCreationModal({ campsiteId }: Props) {
    const session = useSession();
    const intl = useIntl();
    const snackbars = useSnackbars();
    let values: FormValue = { allowedAmount: null };

    const onInviteCreate = (): Promise<string> =>
        session.http
            .invites
            .create(campsiteId, values)
            .then((resp) => {
                if (!resp.ok)
                    return (snackbars.notifyApiError(resp), "");

                return `${window.location.origin}/i/${resp.content.id}`;
            });

    return (
        <ModalDialog>
            <ModalClose />
            <Stack gap={1}>
                <DialogTitle>
                    {intl.formatMessage({
                        id: "app.invites.create",
                    })}
                </DialogTitle>
                <DialogContent>
                    {intl.formatMessage({
                        id: "app.invites.create.description",
                        defaultMessage: "Create invite links to this campsite",
                        description: "The description of invite creation modal",
                    })}
                </DialogContent>
                <CopyInput
                    onCopy={onInviteCreate}
                    placeholder={intl.formatMessage(globalIntlDeclarations["app.invites.code"])}
                />
                <Form
                    sections={[
                        {
                            id: "info",
                            fields: [
                                {
                                    id: "allowedAmount",
                                    type: "number",
                                    header: intl.formatMessage(globalIntlDeclarations["app.invites.allowedAmount"]),
                                    placeholder: intl.formatMessage(globalIntlDeclarations["common.infinite"]),
                                    max: 1000,
                                    min: 1,
                                },
                            ]
                        },
                    ]}
                    onChange={(isValid, newValues) => isValid && (values = newValues as FormValue)}
                />
            </Stack>
        </ModalDialog>
    )
}