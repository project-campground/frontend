import { IconButton } from "@mui/joy";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import type { RichEditor, RichEditorBlockElementType } from "../../editor/editor";
import CampgroundEditor from "./CampgroundEditor";

type Props<T extends RichEditorBlockElementType> = {
    format: T;
    children: ReactNode[] | ReactNode;
    onClick?: (editor: RichEditor, format: T) => void;
};

export default function BlockNodeToggle<T extends RichEditorBlockElementType>({ children, format: formatting, onClick }: Props<T>) {
    const editor = useSlate();

    const active = CampgroundEditor.isNodeFormatted(editor, formatting);

    const toggleFormattingFn = onClick ?? CampgroundEditor.toggleBlockFormatting;

    const toggleFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();
        toggleFormattingFn(editor, formatting);
    };

    return (
        <IconButton variant={active ? "solid" : undefined} onClick={toggleFormatting}>
            {children}
        </IconButton>
    );
}