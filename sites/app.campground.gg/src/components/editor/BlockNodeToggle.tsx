import { IconButton } from "@mui/joy";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import type { RichEditorBlockElementType } from "./editor";
import CampgroundEditor from "./CampgroundEditor";

type Props = {
    format: RichEditorBlockElementType;
    children: ReactNode[] | ReactNode;
};

export default function BlockNodeToggle({ children, format: formatting }: Props) {
    const editor = useSlate();

    const active = CampgroundEditor.isNodeFormatted(editor, formatting);

    const toggleFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();
        CampgroundEditor.toggleBlockFormatting(editor, formatting);
    };
    return (
        <IconButton variant={active ? "solid" : "plain"} onClick={toggleFormatting}>
            {children}
        </IconButton>
    );
}