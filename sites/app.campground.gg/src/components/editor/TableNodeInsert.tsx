import { IconButton } from "@mui/joy";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import CampgroundEditor from "./CampgroundEditor";

type Props = {
    children: ReactNode[] | ReactNode;
};

export default function TableNodeInsert({ children }: Props) {
    const editor = useSlate();

    const active = CampgroundEditor.isNodeFormatted(editor, "table-cell");

    const toggleFormatting = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();
        CampgroundEditor.insertTableFormatting(editor);
    };
    return (
        <IconButton variant={active ? "solid" : "soft"} disabled={active} onClick={toggleFormatting}>
            {children}
        </IconButton>
    );
}