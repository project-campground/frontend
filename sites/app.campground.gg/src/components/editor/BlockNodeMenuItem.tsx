import { MenuItem } from "@mui/joy";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import type { RichEditorBlockElementType } from "../../editor/editor";
import CampgroundEditor from "./CampgroundEditor";

type Props = {
    format: RichEditorBlockElementType;
    additionalProps?: any;
    children: ReactNode[] | ReactNode;
    onClick?: () => void;
};

export default function BlockNodeMenuItem({ children, format: formatting, additionalProps, onClick }: Props) {
    const editor = useSlate();

    const setFormatting = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        ev.preventDefault();
        CampgroundEditor.setBlockFormatting(editor, formatting, additionalProps);
        onClick?.();
    };

    return (
        <MenuItem onClick={setFormatting}>
            {children}
        </MenuItem>
    );
}