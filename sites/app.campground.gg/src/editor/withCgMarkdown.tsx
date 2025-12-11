import { Editor, Element, Point, Range, Transforms } from "slate";
import { type RichEditor, EditorBlockElementType, EditorItemElementType } from "./editor";

const unorderedList = {
    type: "list-item",
    wrapper: "unordered-list"
} as const;

const nodePrefixes: Record<string, { type: EditorBlockElementType | EditorItemElementType, wrapper?: EditorBlockElementType }> = {
    "> ": { type: "paragraph", wrapper: "block-quote" },
    "```": { wrapper: "code-block", type: "code-line" },
    "- ": unorderedList,
    "+ ": unorderedList,
    "* ": unorderedList,
};

// Doesn't help a lot, but probably for some performance to do less calculations
const endingCharacters = [" ", "`"];

function modifiedInsertText(editor: RichEditor, text: string): boolean {
    const { selection } = editor;

    if (!endingCharacters.some((x) => text.endsWith(x)) || !(selection && Range.isCollapsed(selection)))
        return false;

    const { anchor } = (selection as Range);

    const block = Editor.above(editor, {
        match: n => Element.isElement(n) && Editor.isBlock(editor, n),
    });

    if ((block?.[0] as Element | null)?.type !== "paragraph")
        return false;

    const path = block ? block[1] : [];
    const start = Editor.start(editor, path);
    const range = { anchor, focus: start };
    const beforeText = Editor.string(editor, range);


    const elem = nodePrefixes[beforeText + text];

    if (!elem)
        return false;

    Transforms.select(editor, range);

    if (!Range.isCollapsed(range))
        Transforms.delete(editor)

    const props: Partial<Element> = {
        type: elem.type,
        children: []
    };

    Transforms.setNodes<Element>(
        editor,
        props,
        {
            match: n => Element.isElement(n) && Editor.isBlock(editor, n),
        }
    );

    if (elem.wrapper)
        Transforms.wrapNodes(editor,
            {
                type: elem.wrapper,
                children: [],
            },
            {
                match: n =>
                    !Editor.isEditor(n) &&
                    Element.isElement(n) &&
                    n.type === elem.type,
            })

    return true;
}

function modifiedDeleteBackward(editor: RichEditor): boolean {
    const { selection } = editor;

    if (!selection || Range.isCollapsed(selection))
        return false;

    const match = Editor.above(editor, {
        match: n => Element.isElement(n) && Editor.isBlock(editor, n),
    });

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