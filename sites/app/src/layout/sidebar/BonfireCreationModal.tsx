import { DialogContent, DialogTitle, ModalClose, ModalDialog, FormControl, FormLabel, Button } from "@mui/joy";
import CloseModalContext from "@mui/joy/Modal/CloseModalContext";
import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import Form from "~/components/form/Form";
import FormFieldText from "~/components/form/FormFieldText";
import FormFieldTextArea from "~/components/form/FormFieldTextArea";
import FormSection from "~/components/form/FormSection";
import FormSubmit from "~/components/form/FormSubmit";
import { useSnackbars } from "~/context/snackbar";
import { FormattedMessageGlobal } from "~/i18n";
import { useCampsiteContext } from "~/routes/_global._campsite/context";

type Props = {
    campsiteId: string;
    lowestPriorityBonfire: number;
};

export default function BonfireCreationModal({ campsiteId, lowestPriorityBonfire }: Props) {
    const { api } = useCampsiteContext();
    const snackbars = useSnackbars();
    const modalClose = useContext(CloseModalContext);

    const onBonfireCreate = (body: Record<string, any>): unknown =>
        api
            .bonfires
            .create(campsiteId, { ...body, position: lowestPriorityBonfire + 1 } as { name: string; description: string; position: number; })
            .then((resp) => {
                if (!resp.ok)
                    return snackbars.notifyApiError(resp);

                return modalClose?.({}, "closeClick");
            });

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle><FormattedMessageGlobal id="app.bonfires.create" /></DialogTitle>
            <DialogContent>
                <FormattedMessage
                    id="tent.bonfires.create.desc"
                    defaultMessage="Create a new bonfire in this campsite"
                    description="Description for bonfire creation modal"
                />
            </DialogContent>
            <Form onSubmit={(_, values) => onBonfireCreate(values)}>
                <FormSection>
                    <FormControl required>
                        <FormLabel>
                            <FormattedMessageGlobal id="app.bonfires.settings.name" />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="name"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            <FormattedMessageGlobal id="app.bonfires.settings.name" />
                        </FormLabel>
                        <FormFieldTextArea
                            id="description"
                            defaultValue=""
                        />
                    </FormControl>
                </FormSection>
                <FormSection layout="footer">
                    <FormSubmit>
                        <FormattedMessageGlobal id="app.bonfires.create" />
                    </FormSubmit>
                    <Button variant="plain" color="neutral" onClick={() => modalClose?.({}, "closeClick")}>
                        <FormattedMessageGlobal id="common.cancel" />
                    </Button>
                </FormSection>
            </Form>
        </ModalDialog>
    )
}