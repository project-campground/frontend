import { styled, Tooltip } from "@mui/joy";
import { useEffect, useRef, type RefObject } from "react";
import { useFocused, useSlate } from "slate-react";
import RichEditorToolbar, { RichEditorToolbarInlineFormatting } from "./RichEditorToolbar";
import { Editor, Range } from "slate";

const TooltipAnchor = styled("div", {
    name: "TooltipAnchor",
    slot: "root"
})(() => ({
    position: "absolute",
    width: 0,
    height: 2,
}))

export default function RichEditorFloater({ useRelativeRef }: { useRelativeRef: RefObject<HTMLDivElement | null> }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const editor = useSlate();
    const focused = useFocused();

    useEffect(() => {
        if (!ref.current || !useRelativeRef.current)
            return;
        else if (!focused || !editor.selection || Range.isCollapsed(editor.selection) || Editor.string(editor, editor.selection) === "")
            return ref.current.removeAttribute("style");

        const refElement = ref.current;
        const rect = window.getSelection()!.getRangeAt(0).getBoundingClientRect();
        const relativeRect = useRelativeRef.current.getBoundingClientRect();
        Object.assign(ref.current.style, {
            display: "block",
            top: `${rect.top + window.pageYOffset - refElement.offsetHeight - relativeRect.y}px`,
            left: `${rect.left + window.pageXOffset - (refElement.offsetWidth / 2) + (rect.width / 2) - relativeRect.x}px`,
        });
    });

    return (
        <Tooltip open arrow ref={ref} variant="outlined" title={
            <RichEditorToolbar>
                <RichEditorToolbarInlineFormatting />
            </RichEditorToolbar>
        } sx={{ transform: "none" }} placement="top" disablePortal>
            <TooltipAnchor sx={{ display: "none" }} />
        </Tooltip>
    );
}