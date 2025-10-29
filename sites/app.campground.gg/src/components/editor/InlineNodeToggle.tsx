import { IconButton } from "@mui/joy";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import type { RichEditorInlineElementType } from "./editor";
import CampgroundEditor from "./CampgroundEditor";

type Props = {
    format: RichEditorInlineElementType;
    children: ReactNode[] | ReactNode;
};

export default function InlineNodeToggle({ children, format: formatting }: Props) {
    const editor = useSlate();

    const active = CampgroundEditor.isNodeFormatted(editor, formatting);

    const toggleFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();
        CampgroundEditor.toggleInlineFormatting(editor, formatting);
    };
    return (
        <IconButton variant={active ? "solid" : "plain"} onClick={toggleFormatting}>
            {children}
        </IconButton>
    );
}