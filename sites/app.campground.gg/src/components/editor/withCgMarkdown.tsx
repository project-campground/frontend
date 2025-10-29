import { Editor, Element, Point, Range, Transforms } from "slate";
import type { RichEditor, RichEditorBlockElementType } from "./editor";

const nodePrefixes: Record<string, RichEditorBlockElementType> = {
    "> ": "block-quote",
    "```": "code-block",
};

// Doesn't help a lot, but probably for some performance to do less calculations
const endingCharacters = [" ", "`"];

function modifiedInsertText(editor: RichEditor, text: string): boolean {
    const { selection } = editor;

    if (!endingCharacters.some((x) => text.endsWith(x)) && !(selection && Range.isCollapsed(selection)))
        return false;

    const { anchor } = selection;

    const block = Editor.above(editor, {
        match: n => Element.isElement(n) && Editor.isBlock(editor, n),
    });

    const path = block ? block[1] : [];
    const start = Editor.start(editor, path);
    const range = { anchor, focus: start };
    const beforeText = Editor.string(editor, range) + text.slice(0, -1);
    const type = nodePrefixes[beforeText];

    if (!type)
        return false;

    Transforms.select(editor, range)

    if (!Range.isCollapsed(range))
        Transforms.delete(editor)

    const props: Partial<Element> = {
        type,
    };

    Transforms.setNodes<Element>(
        editor,
        props,
        {
            match: n => Element.isElement(n) && Editor.isBlock(editor, n),
        }
    );

    // if (type === 'list-item') {
    //     const list: BulletedListElement = {
    //     type: 'bulleted-list',
    //     children: [],
    //     }
    //     Transforms.wrapNodes(editor, list, {
    //     match: n =>
    //         !Editor.isEditor(n) &&
    //         SlateElement.isElement(n) &&
    //         n.type === 'list-item',
    //     })
    // }

    return true;
}

function modifiedDeleteBackward(editor: RichEditor): boolean {
    const { selection } = editor;
    
    console.log("Selection", { selection, collapsed: Range.isCollapsed(selection!) });
    if (!selection || Range.isCollapsed(selection))
        return false;

    const match = Editor.above(editor, {
        match: n => Element.isElement(n) && Editor.isBlock(editor, n),
    });

    console.log("Match", match);

    if (!match)
        return false;

    const [block, path] = match;
    const start = Editor.start(editor, path);

    if (
        Editor.isEditor(block) ||
        !Element.isElement(block) ||
        block.type === "paragraph" ||
        !Point.equals(selection.anchor, start)
    )
        return false;

    const props: Partial<Element> = {
        type: 'paragraph',
    };

    Transforms.setNodes(editor, props);

    if ((block as Element).type === "list-item")
        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                n.type === "ordered-list",
                split: true,
        });

    return true;
}

export default function withCgMarkdown(editor: RichEditor) {
    const { insertText, deleteBackward } = editor;

    editor.insertText = (text) => {
        if (!modifiedInsertText(editor, text))
            insertText(text);
    };

    editor.deleteBackward = (...args) => {
        const modified = modifiedDeleteBackward(editor); 

        if (!modified)
            deleteBackward(...args);
    }
    return editor;
}