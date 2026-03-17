import { Button, Input } from "@mui/joy";
import { useState } from "react";
import { useSnackbars } from "~/context/snackbar";

type Props = {
    text?: string;
    placeholder?: string;
    onCopy?: () => string | Promise<string>;
};

export default function CopyInput({ text: copyText, placeholder, onCopy }: Props) {
    if (!(copyText || onCopy))
        throw new Error("Expected text or onCopy in the props");

    const floating = useSnackbars();
    const [text, setText] = useState(copyText || placeholder);

    const onClick = async () => {
        const fetched = copyText ?? await onCopy!();
        navigator.clipboard.writeText(fetched);
        console.log("Fetched", { fetched });
        setText(fetched);
        floating.notifySuccess("Successfully copied!");
    }
    console.log("Text", { text });

    return (
        <Input
            value={text}
            endDecorator={<Button variant="glow" onClick={onClick}>Copy</Button>}
        />
    );
}