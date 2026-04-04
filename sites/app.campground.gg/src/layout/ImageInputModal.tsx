import { DialogContent, DialogTitle, ModalClose, ModalDialog, Stack } from "@mui/joy";
import Form from "../components/form/Form";
import { Image } from "components";
import { FormattedMessage } from "react-intl";

type Props = {
    allowTitle?: boolean;
    onClose: () => unknown;
    onSubmit: (url: string, title?: string | null) => unknown;
    onRemove?: () => unknown;
    currentValue?: string | null;
    currentTitle?: string | null;
};

export default function ImageInputModal({ allowTitle, currentValue, currentTitle, onClose, onSubmit, onRemove }: Props) {
    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle><FormattedMessage id="form.uploadImage" /></DialogTitle>
            <DialogContent>
                <FormattedMessage
                    id="form.uploadImage.description"
                    defaultMessage="Upload an image or paste the URL of it"
                    description="Description of modal instructing to upload an image or submit its URL"
                />
            </DialogContent>
            <Stack alignItems="center">
                {currentValue && <Image src={currentValue} mh={200} mw={400} />}
            </Stack>
            <Form
                sections={[
                    {
                        id: "title",
                        hide: !allowTitle,
                        fields: [
                            {
                                id: "title",
                                type: "text",
                                header: <FormattedMessage
                                    id="form.uploadImage.title"
                                    defaultMessage="Image title"
                                    description="Prompt for the title of the image in image uploading modal"
                                />,
                                placeholder: "a.png",
                                defaultValue: currentTitle ?? undefined,
                            }
                        ],
                    },
                    {
                        id: "url",
                        fields: [
                            {
                                id: "url",
                                type: "text",
                                header: <FormattedMessage
                                    id="form.uploadImage.url"
                                    defaultMessage="Image URL"
                                    description="Prompt for the URL of the image in image uploading modal"
                                />,
                                placeholder: "https://example.com",
                                defaultValue: currentValue ?? undefined,
                                required: true,
                            }
                        ]
                    }
                ]}
                onSubmit={(_, values) => (onClose(), onSubmit(values.url, values.title))}
                onCancel={() => (onClose(), onRemove?.())}
                submitText={
                    <FormattedMessage id="form.uploadImage" />
                }
            />
        </ModalDialog>
    )
}