import { IconButton } from "@mui/joy";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import type { RichEditorBlockElementType } from "../../editor/editor";

type Props = {
    format: RichEditorBlockElementType;
    children: ReactNode[] | ReactNode;
};

export default function BlockNodeInsert({ children, format: formatting }: Props) {
    const editor = useSlate();

    const addFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();

        editor.insertNode({
            type: formatting,
            children: [],
        });
    };
    return (
        <IconButton onClick={addFormatting}>
            {children}
        </IconButton>
    );
}