import { DialogContent, DialogTitle, ModalClose, ModalDialog, Stack, FormControl, FormLabel } from "@mui/joy";
import { useIntl } from "react-intl";
import CopyInput from "~/components/CopyInput";
import Form from "~/components/form/Form";
import FormFieldNumber from "~/components/form/FormFieldNumber";
import FormSection from "~/components/form/FormSection";
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
        session.atproto
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
                        ...globalIntlDeclarations["app.invites.create"]
                    })}
                </DialogTitle>
                <DialogContent>
                    {intl.formatMessage({
                        id: "app.invites.create.desc",
                        defaultMessage: "Create invite links to this campsite",
                        description: "The description of invite creation modal",
                    })}
                </DialogContent>
                <CopyInput
                    onCopy={onInviteCreate}
                    placeholder={intl.formatMessage(globalIntlDeclarations["app.invites.code"])}
                />
                <Form onChange={(isValid, newValues) => isValid && (values = newValues as FormValue)}>
                    <FormSection>
                        <FormControl>
                            <FormLabel>
                                {intl.formatMessage(globalIntlDeclarations["app.invites.allowedAmount"])}
                            </FormLabel>
                            <FormFieldNumber
                                id="allowedAmount"
                                max={1000}
                                min={1}
                                placeholder={
                                    intl.formatMessage(globalIntlDeclarations["common.infinite"])
                                }
                            />
                        </FormControl>
                    </FormSection>
                </Form>
            </Stack>
        </ModalDialog>
    )
}