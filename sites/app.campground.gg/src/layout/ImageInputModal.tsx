import { DialogContent, DialogTitle, ModalClose, ModalDialog, Stack } from "@mui/joy";
import Form from "../components/form/Form";
import { Image } from "components";
import CloseModalContext from "@mui/joy/Modal/CloseModalContext";
import { useContext } from "react";

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
            <DialogTitle>Upload image</DialogTitle>
            <DialogContent>Upload an image or submit URL of the image.</DialogContent>
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
                                header: "Image Title",
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
                                header: "Image URL",
                                placeholder: "https://example.com",
                                defaultValue: currentValue ?? undefined,
                                required: true,
                            }
                        ]
                    }
                ]}
                onSubmit={(_, values) => (onClose(), onSubmit(values.url, values.title))}
                onCancel={() => (onClose(), onRemove?.())}
                cancelText="Remove image"
                submitText="Upload image"
            />
        </ModalDialog>
    )
}