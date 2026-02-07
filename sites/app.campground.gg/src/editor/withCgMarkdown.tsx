import { Editor, Element, Point, Range, Transforms } from "slate";
import { type RichEditor, EditorBlockElementType, EditorItemElementType } from "./editor";
import { EditorItemParents, type EditorElementType } from "./element";

const unorderedList = {
    type: "list-item",
    wrapper: "unordered-list",
} as const;

type PrefixedElement = {
    type: EditorBlockElementType | EditorItemElementType;
    data?: any;
    wrapper?: EditorBlockElementType;
    wrapperData?: any;
}

const nodePrefixes: Record<string, PrefixedElement> = {
    "> ": { type: "paragraph", wrapper: "block-quote" },
    "```": { wrapper: "code-block", type: "code-line" },
    "- ": unorderedList,
    "+ ": unorderedList,
    "* ": unorderedList,
    "# ": { type: "heading", data: { depth: 1 } },
    "## ": { type: "heading", data: { depth: 2 } },
    "### ": { type: "heading", data: { depth: 3 } },
    "#### ": { type: "heading", data: { depth: 4 } },
    "##### ": { type: "heading", data: { depth: 5 } },
    "###### ": { type: "heading", data: { depth: 6 } },
};

// Doesn't help a lot, but probably for some performance to do less calculations
const endingCharacters = [" ", "`"];

function getPossibleOrderedList(text: string): PrefixedElement | null {
    const split = text.split(".");

    if (split.length < 2)
        return null;

    // Allow starting from any other ordering
    const num = parseInt(split[0]);

    // "2. "
    if (Number.isNaN(num) || num < 0 || split[1] !== " ")
        return null;

    return { type: "list-item", wrapper: "ordered-list", wrapperData: { start: num } };
}

function createListFromPrefix(editor: RichEditor, elem: PrefixedElement) {
    Transforms.wrapNodes(editor,
        {
            type: elem.type,
            children: [],
        },
        {
            match: n =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                n.type === "paragraph",
    });
    Transforms.wrapNodes(editor,
        {
            type: elem.wrapper,
            children: [],
            ...elem.wrapperData,
        },
        {
            match: n =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                n.type === elem.type,
    });

    return true;
}

function modifiedInsertText(editor: RichEditor, text: string): boolean {
    const { selection } = editor;

    if (!endingCharacters.some((x) => text.endsWith(x)) || !(selection && Range.isCollapsed(selection)))
        return false;

    const { anchor } = (selection as Range);

    const block = Editor.above(editor, {
        match: n => Element.isElement(n) && Editor.isBlock(editor, n),
    });

    const blockType = (block?.[0] as Element | null)?.type as EditorElementType | undefined;
    if (blockType !== "paragraph")
        return false;

    const path = block ? block[1] : [];
    const start = Editor.start(editor, path);
    const range = { anchor, focus: start };
    const beforeText = Editor.string(editor, range);

    const whole = beforeText + text;

    const elem = nodePrefixes[whole] || getPossibleOrderedList(whole);

    if (!elem)
        return false;
    
    Transforms.select(editor, range);
    
    if (!Range.isCollapsed(range))
        Transforms.delete(editor);
    
    if (elem.type === "list-item")
        return createListFromPrefix(editor, elem);

    const props: Partial<Element> = {
        ...elem.data,
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
                ...elem.wrapperData,
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

    if (!selection)
        return false;

    const match = Editor.above(editor, {
        match: n => Element.isElement(n) && Editor.isBlock(editor, n) && n.type !== "paragraph",
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
    else if ((block as Element).type === "block-quote")
        return (Transforms.unwrapNodes(editor, {
            at: path,
        }), true);

    const grandparent = editor.above({ at: path.slice(0, -1) });

    if (!Element.isElement(grandparent?.[0]) || !EditorItemParents[block.type as EditorItemElementType].includes((grandparent[0] as Element).type as EditorBlockElementType))
        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                n.type === block.type,
            split: true
        });

    if (EditorItemParents[(block as Element).type as EditorItemElementType])
        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                EditorItemParents[block.type as EditorItemElementType].includes(n.type as EditorBlockElementType),
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