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

export default function ListNodeToggle({ children, format: formatting }: Props) {
    const editor = useSlate();

    const active = CampgroundEditor.isNodeFormatted(editor, formatting);

    const toggleFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();
        CampgroundEditor.toggleListFormatting(editor, formatting);
    };
    return (
        <IconButton variant={active ? "solid" : undefined} onClick={toggleFormatting}>
            {children}
        </IconButton>
    );
}