import { Editor, Element, Node, Path } from "slate";
import { RichEditorItemElementType, type RichEditor } from "./editor";
import { getNeighborPath, getNewlineIndexes, getParentPath, paragraph } from "./utils";
import React from "react";

function ArrowVertical(editor: RichEditor, up: boolean) {
    const above = editor.above();
    const elementAbove = above?.[0];
    const isElement = Element.isElement(elementAbove);

    if (!isElement)
        return;

    const elementString = Node.string(elementAbove);
    const newlines = getNewlineIndexes(elementString).map((x) => x + 1);

    const selectionOffset = editor.selection?.focus?.offset ?? 0;

    const passedLines = newlines.filter((x) => x <= selectionOffset);
    const nextNewlineOffset = newlines.find((x) => x > selectionOffset);

    // Move between lines in a single block
    if (!up && nextNewlineOffset || up && passedLines.length) {
        // Where the newline is found as offset to move to
        const lineThere = up ? passedLines.slice(-2, -1)[0] ?? 0 : nextNewlineOffset!;

        const currentLine = passedLines.slice(-1)[0] ?? 0;
        const currentLineOffset = selectionOffset - currentLine;
        // Perhaps the line offset was saved
        const finalLineOffset = editor.selection?.focus.lineOffset ?? currentLineOffset;

        return editor.select({ lineOffset: finalLineOffset, path: editor.selection!.focus.path, offset: Math.min(lineThere + finalLineOffset, up ? currentLine - lineThere - 1: elementString.length) });
    }

    // Will be used to get neighbours
    const abovePath = above![1];
    const aboveParent = getParentPath(abovePath);

    const sequentialItemSettings = { at: abovePath, match: (node: Node, path: Path) => (console.log({ node, path }), !Editor.isEditor(node)) }

    // Positional calc
    const itemNext = editor.next(sequentialItemSettings);
    const itemPrevious = editor.previous(sequentialItemSettings);
    const itemThere = up ? itemPrevious : itemNext;
    const itemOppositeOfThere = up ? itemNext : itemPrevious;

    // Don't keep empty paragraph if person moved down or up accidentally, similar the way Guilded does
    if (itemThere && !itemOppositeOfThere && elementAbove.type === "paragraph" && Node.string(elementAbove) === "") {
        editor.select({ path: itemThere[1], offset: 0 });
        return editor.delete({ at: abovePath });
    }
    // Just move there
    else if (itemThere) {
        const stringifiedThere = Node.string(itemThere[0]);
        // Retain the offset from the line cursor is at
        const newOffset = editor.selection?.focus.lineOffset ?? (editor.selection?.focus?.offset ?? 0) - (newlines.slice(-1)[0] ?? 0);
        const newlinesThere = getNewlineIndexes(stringifiedThere).map((x) => x + 1);

        // Retain offset in the last line of the node 'there'
        return editor.select({
            path: itemThere[1],
            lineOffset: newOffset,
            offset: Math.min((newlinesThere.slice(-1)[0] ?? 0) + newOffset, stringifiedThere.length),
        });
    }
    // The end of editor and no point trying to escape blocks
    else if (elementAbove.type === "paragraph" && abovePath.length < 2)
        return;

    const newNodePath = getNeighborPath(aboveParent, (Number(up) * -2) + 1);

    // Insert and set cursor to it. Made to escape blocks.
    editor.insertNode(
        {
            type: "paragraph",
            children: [],
        },
        {
            at: newNodePath,
        },
    );
    return editor.select({ path: [...newNodePath, 0], offset: 0, lineOffset: 0 });
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

        // Override others for code blocks and list
        if (above && Element.isElement(above[0]) && RichEditorItemElementType.includes(above[0].type as RichEditorItemElementType) && (!event.shiftKey || above[0].type === "code-line")) {
            editor.insertNode({ type: above[0].type, children: [] }, { at: getNeighborPath(above[1]) });

            return editor.move({
                unit: "line",
                distance: 1,
            });
        }

        // Soft break
        if (event.shiftKey)
            return editor.insertText("\n");

        editor.insertNode(paragraph());
    }
}