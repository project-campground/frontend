import {
    DialogContent,
    DialogTitle,
    ModalClose,
    ModalDialog,
    Stack,
    Button,
    FormControl,
    FormLabel,
} from "@mui/joy";
import Form from "../components/form/Form";
import { Image } from "campground-ui";
import { FormattedMessage } from "react-intl";
import FormSection from "~/components/form/FormSection";
import FormSubmit from "~/components/form/FormSubmit";
import { FormattedMessageGlobal } from "~/i18n";
import FormFieldText from "~/components/form/FormFieldText";

type Props = {
    allowTitle?: boolean;
    onClose: () => unknown;
    onSubmit: (url: string, title?: string | null) => unknown;
    onRemove?: () => unknown;
    currentValue?: string | null;
    currentTitle?: string | null;
};

export default function ImageInputModal({
    allowTitle,
    currentValue,
    currentTitle,
    onClose,
    onSubmit,
    onRemove,
}: Props) {
    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>
                <FormattedMessageGlobal id="form.uploadImage" />
            </DialogTitle>
            <DialogContent>
                <FormattedMessage
                    id="form.uploadImage.desc"
                    defaultMessage="Upload an image or paste the URL of it"
                    description="Description of modal instructing to upload an image or submit its URL"
                />
            </DialogContent>
            <Stack alignItems="center">
                {currentValue && <Image src={currentValue} mh={200} mw={400} />}
            </Stack>
            <Form
                onSubmit={(_, values) => (
                    onClose(),
                    onSubmit(values.url, values.title)
                )}
            >
                <FormSection hide={!allowTitle}>
                    <FormControl>
                        <FormLabel>
                            <FormattedMessage
                                id="form.uploadImage.title"
                                defaultMessage="Image title"
                                description="Prompt for the title of the image in image uploading modal"
                            />
                        </FormLabel>
                        <FormFieldText
                            id="title"
                            placeholder="a.png"
                            defaultValue={currentTitle ?? undefined}
                        />
                    </FormControl>
                </FormSection>
                <FormSection>
                    <FormControl>
                        <FormLabel>
                            <FormattedMessage
                                id="form.uploadImage.url"
                                defaultMessage="Image URL"
                                description="Prompt for the URL of the image in image uploading modal"
                            />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="url"
                            placeholder="https://example.com"
                            defaultValue={currentValue ?? undefined}
                        />
                    </FormControl>
                </FormSection>
                <FormSection layout="footer">
                    <FormSubmit>
                        <FormattedMessageGlobal id="form.uploadImage" />
                    </FormSubmit>
                    <Button
                        variant="plain"
                        color="neutral"
                        onClick={() => (onClose(), onRemove?.())}
                    >
                        <FormattedMessageGlobal id="common.cancel" />
                    </Button>
                </FormSection>
            </Form>
        </ModalDialog>
    );
}
