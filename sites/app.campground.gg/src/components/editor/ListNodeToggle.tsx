import { IconButton } from "@mui/joy";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import type { RichEditorBlockElementType, RichEditorItemElementType } from "../../editor/editor";
import CampgroundEditor from "./CampgroundEditor";

type Props = {
    format: RichEditorBlockElementType;
    itemFormat: RichEditorItemElementType;
    children: ReactNode[] | ReactNode;
};

export default function ListNodeToggle({ children, format: formatting, itemFormat }: Props) {
    const editor = useSlate();

    const active = CampgroundEditor.isNodeFormatted(editor, itemFormat);

    const toggleFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();
        CampgroundEditor.toggleListFormatting(editor, formatting, itemFormat);
    };
    return (
        <IconButton variant={active ? "solid" : undefined} onClick={toggleFormatting}>
            {children}
        </IconButton>
    );
}