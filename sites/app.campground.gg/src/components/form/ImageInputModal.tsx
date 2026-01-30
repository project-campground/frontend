import { DialogContent, DialogTitle, ModalClose, ModalDialog, Stack } from "@mui/joy";
import Form from "./Form";
import { Image } from "components";

type Props = {
    onClose: () => unknown;
    onSubmit: (url: string) => unknown;
    onRemove?: () => unknown;
    currentValue?: string | null;
};

export default function ImageInputModal({ currentValue, onClose, onSubmit, onRemove }: Props) {
    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>Upload image</DialogTitle>
            <DialogContent>Upload an image or submit URL of the image.</DialogContent>
            <Stack alignItems="center">
                {currentValue && <Image src={currentValue} mh={200} />}
            </Stack>
            <Form
                sections={[
                    {
                        id: "url",
                        fields: [
                            {
                                id: "url",
                                type: "text",
                                header: "Image URL",
                                placeholder: "https://example.com",
                                required: true
                            }
                        ]
                    }
                ]}
                onSubmit={(_, values) => (onClose(), onSubmit(values.url))}
                onCancel={() => (onClose(), onRemove?.())}
                cancelText="Remove image"
                submitText="Upload image"
            />
        </ModalDialog>
    )
}