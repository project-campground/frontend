import { Editor, Element, Point, Range, Transforms, type NodeEntry, type Path, type TextUnit } from "slate";
import { type RichEditor, EditorBlockElementType, EditorItemElementType } from "./editor";
import { EditorItemParents, EditorListElementType, type EditorElementType, type EditorTable } from "./element";
import { getParentPath, paragraph } from "./utils";
import CampgroundEditor from "~/components/editor/CampgroundEditor";

const unorderedList: PrefixedElement = {
    type: "list-item",
    wrapper: "unordered-list",
} as const;

type PrefixedElement = {
    type: EditorBlockElementType | EditorItemElementType;
    data?: any;
    wrapper?: EditorBlockElementType | EditorItemElementType;
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
    "--- ": { type: "divider" },
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
                // ...elem.wrapperData,
            },
            {
                match: n =>
                    !Editor.isEditor(n) &&
                    Element.isElement(n) &&
                    n.type === elem.type,
            })

    return true;
}

const blockContainers: (EditorBlockElementType | EditorItemElementType)[] = ["block-quote"];

function modifiedDeleteBackward(editor: RichEditor, type: TextUnit): boolean {
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
        !Element.isElement(block) ||
        !Point.equals(selection.anchor, start)
    )
        return false;
    else if (type === "word")
        return fullUnwrap(editor, block);
    else if (
        (block as Element).type === "list-item"
    )
        return unwrapList(editor, path);
    else if (
        (block as Element).type === "table-cell"
    )
        return removeColumn(editor, path);
    else if (
        blockContainers.includes((block as Element).type as EditorBlockElementType)
    )
        Transforms.unwrapNodes(editor, {
            at: path,
        });

    // List items and such have double nested blocks
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

function fullUnwrap(editor: RichEditor, block: Element) {
    Transforms.unwrapNodes(editor, {
        split: true,
        mode: "all",
        match: (node) =>
            Element.isElement(node) &&
            node.type !== "paragraph" &&
            node.type !== "code-line",
    });

    if (block.type === "code-line")
        Transforms.setNodes(editor, {
            type: "paragraph",
        });

    return true;
}

function unwrapList(editor: RichEditor, path: Path): boolean {
    const parent = getParentPath(path);
    const grandparent = editor.above({ at: getParentPath(path) });
    const grandparentIsList = Element.isElement(grandparent?.[0]) && EditorListElementType.includes(grandparent[0].type as EditorListElementType);

    if (!grandparentIsList)
        Transforms.unwrapNodes(editor, {
            at: path,
            split: true,
        });

    Transforms.unwrapNodes(editor, {
        at: parent,
        split: true,
    });

    return true;
}
function removeColumn(editor: RichEditor, path: Path): boolean {
    const table = CampgroundEditor.getNearestAncestor(editor, "table") as NodeEntry<EditorTable>;

    const [column] = path.slice(-1);

    // If there is single column, then remove entire table
    if (table![0].children[0]!.children.length === 1) {
        editor.removeNodes({
            at: table[1],
        });

        // Make sure a node at least exists
        if (!editor.children.length)
            editor.insertNode(paragraph());

        return true;
    }

    CampgroundEditor.removeTableColumn(editor, table![1], column);

    return true;
}

export default function withCgMarkdown(editor: RichEditor) {
    const { insertText, deleteBackward } = editor;

    editor.insertText = (text) => {
        if (!modifiedInsertText(editor, text))
            insertText(text);
    };

    editor.deleteBackward = (type) => {
        const modified = modifiedDeleteBackward(editor, type); 

        if (!modified)
            deleteBackward(type);
    }

    return editor;
}