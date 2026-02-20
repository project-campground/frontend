import { Button, Input } from "@mui/joy";
import { useSnackbars } from "~/context/snackbar";

type Props = {
    text?: string;
    placeholder?: string;
    onCopy?: () => string | Promise<string>;
};

export default function CopyInput({ text, placeholder, onCopy }: Props) {
    if (!(text || onCopy))
        throw new Error("Expected text or onCopy in the props");

    const floating = useSnackbars();

    const onClick = async () => {
        navigator.clipboard.writeText(text ?? await onCopy!());
        floating.notifySuccess("Successfully copied!");
    }

    return (
        <Input
            value={text ?? placeholder}
            endDecorator={<Button variant="glow" onClick={onClick}>Copy</Button>}
        />
    );
}