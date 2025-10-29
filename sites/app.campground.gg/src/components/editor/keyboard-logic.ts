import { Element } from "slate";
import { RichEditorItemElementType, type RichEditor } from "./editor";
import { getNeighborPath, getParentPath, paragraph } from "./utils";
import React from "react";

function ArrowVertical(editor: RichEditor, up: boolean) {
    const above = editor.above();
    const elementAbove = above?.[0];
    const isElement = Element.isElement(elementAbove);

    editor.move({ distance: 1, unit: "line", reverse: up });

    const after = editor.above();
    if (!isElement || elementAbove.type === "paragraph" || elementAbove !== after?.[0])
        return;

    const mainBlock = RichEditorItemElementType.includes(elementAbove.type as RichEditorItemElementType) ? getParentPath(above![1]) : above![1];

    editor.insertNode(paragraph(), { at: up ? mainBlock : getNeighborPath(mainBlock) });
    editor.move({ distance: 1, unit: "line", reverse: up });
}

export const editorKeyboardLogic: Record<string, (editor: RichEditor, event: React.KeyboardEvent<HTMLDivElement>) => void> = {
    ArrowUp(editor: RichEditor, _: React.KeyboardEvent<HTMLDivElement>) {
        return ArrowVertical(editor, true);
    },
    ArrowDown(editor: RichEditor, _: React.KeyboardEvent<HTMLDivElement>) {
        return ArrowVertical(editor, false);
    },
    Enter(editor: RichEditor, event: React.KeyboardEvent<HTMLDivElement>) {
        const above = editor.above();

        console.log([above?.[0], Element.isElement(above?.[0])]);

        if (above && Element.isElement(above[0]) && RichEditorItemElementType.includes(above[0].type as RichEditorItemElementType) && (!event.shiftKey || above[0].type === "code-line")) {
            editor.insertNode({ type: above[0].type, children: [] }, { at: getNeighborPath(above[1]) });

            return editor.move({
                unit: "line",
                distance: 1,
            });
        }
        
        if (event.shiftKey)
            editor.insertText("\n");
        else
            editor.insertNode(paragraph());
    }
}