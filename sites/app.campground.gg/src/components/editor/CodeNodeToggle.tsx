import { IconButton } from "@mui/joy";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import type { EditorBlockElementType, EditorItemElementType } from "../../editor/editor";
import CampgroundEditor from "./CampgroundEditor";

type Props = {
    format: EditorBlockElementType;
    itemFormat: EditorItemElementType;
    children: ReactNode[] | ReactNode;
};

export default function CodeNodeToggle({ children, format: formatting, itemFormat }: Props) {
    const editor = useSlate();

    const active = CampgroundEditor.isNodeFormatted(editor, itemFormat);

    const toggleFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();
        CampgroundEditor.toggleCodeFormatting(editor, formatting, itemFormat);
    };
    return (
        <IconButton variant={active ? "solid" : "soft"} onClick={toggleFormatting}>
            {children}
        </IconButton>
    );
}