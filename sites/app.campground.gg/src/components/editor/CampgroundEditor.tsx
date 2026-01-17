import { Editor, Element, Node, type NodeEntry, Text, Transforms } from "slate";
import { EditorInlineElementType, type RichEditor, type EditorElementType, type EditorBlockElementType, type EditorItemElementType } from "../../editor/editor";
import type { EditorTextFormatting } from "~/editor/text";
import { EditorItemParents, type EditorTable } from "~/editor/element";
import { getNeighborPath, paragraph } from "~/editor/utils";

export default class CampgroundEditor {
    static clearEditor(editor: RichEditor) {
        editor.delete({
            at: {
                anchor: editor.start([]),
                focus: editor.end([]),
            }
        });
        editor.unwrapNodes({ mode: "all", match: (node) => !Editor.isEditor(node) });

        editor.insertNode(paragraph());
    }
    static isNodeFormatted(editor: RichEditor, type: EditorElementType) {
        const { selection } = editor;

        // Can't detect nodes; out of focus of editor
        if (!selection)
            return false;

        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: n => {
                    if (!Editor.isEditor(n) && Element.isElement(n))
                        return n.type === type;

                    return false;
                }
            })
        );

        // Returned at least one element, which means it is formatted
        return Boolean(match);
    }
    static getSelectedNodes(editor: RichEditor, type?: EditorElementType): NodeEntry<Node>[] | null {
        const { selection } = editor;

        // Can't detect nodes; out of focus of editor
        if (!selection)
            return null;

        return Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: n => !Editor.isEditor(n) && Element.isElement(n) && (!type || n.type === type),
            })
        );
    }
    static isTextFormatted(editor: RichEditor, type: keyof EditorTextFormatting) {
        const marks = Editor.marks(editor);
        return (marks?.[type] as boolean | null) ?? false;
    }
    static isListElement(element: any) {
        return Element.isElement(element) && EditorItemParents["list-item"].includes(element.type as EditorBlockElementType);
    }
    static toggleBlockFormatting(editor: RichEditor, type: EditorBlockElementType, additionalProps?: any) {
        const active = CampgroundEditor.isNodeFormatted(editor, type);

        // Simple type change
        const props = active ? additionalProps && Object.keys(additionalProps).reduce((obj, prop) => (obj[prop] = null, obj), {} as Record<string, null>) : additionalProps;

        Transforms.setNodes<Element>(editor, {
            type: active ? `paragraph` : type,
            ...props,
        });
    }
    static insertTableRow(editor: RichEditor, table: EditorTable) {
        if (!editor.selection)
            return;

        const currentPath = editor.selection.focus.path;
        const insertedPath = getNeighborPath(currentPath.slice(0, -2));

        editor.insertNode(
            {
                type: "table-row",
                children: table.children[0].children.map((_, i) => ({
                    type: "table-cell",
                    children: [
                        { text: `Cell #${i + 1}` }
                    ]
                }))
            },
            {
                at: insertedPath,
            }
        );
        editor.select({ path: [...insertedPath, 0, 0], offset: 1 });
    }
    static insertTableColumn(editor: RichEditor, table: EditorTable) {
        if (!editor.selection)
            return;

        const currentPath = editor.selection.focus.path;
        const [column] = currentPath.slice(-2);

        for (let row = 0; row < table.children.length; row++) {
            const columnPath = [...currentPath.slice(0, -3), row, column + 1];

            editor.insertNode(
                {
                    type: "table-cell",
                    children: [
                        { text: `Cell #${row + 1}` }
                    ]
                },
                {
                    at: columnPath,
                }
            );
        }
        // editor.select({ path: [...insertedPath, 0, 0], offset: 1 });
    }
    static setBlockFormatting(editor: RichEditor, type: EditorBlockElementType, additionalProps?: any) {
        // Simple type change
        Transforms.setNodes<Element>(editor, {
            type: type,
            ...additionalProps,
        });
    }
    static toggleInlineFormatting(editor: RichEditor, type: EditorInlineElementType) {
        const active = CampgroundEditor.isNodeFormatted(editor, type);

        if (active)
            return Transforms.unwrapNodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    Element.isElement(n) &&
                    (EditorInlineElementType as readonly string[]).includes(n.type)
            });

        Transforms.wrapNodes(
            editor,
            { 
                type: "link",
                url: "#",
                children: []
            },
            {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    ((Element.isElement(n) && (EditorInlineElementType as readonly string[]).includes(n.type)) || Text.isText(n))
            }
        );
    }
    static toggleListFormatting(editor: RichEditor, type: EditorBlockElementType, itemType: EditorItemElementType) {
        const active = CampgroundEditor.isNodeFormatted(editor, type);

        if (active)
            Transforms.unwrapNodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    Element.isElement(n),
                split: true,
            });
        
        // Simple type change
        Transforms.setNodes<Element>(
            editor,
            {
                type: active ? `paragraph` : itemType,
            },
        );

        if (!active)
            Transforms.wrapNodes(
                editor,
                {
                    type,
                    children: [],
                },
            );
    }
    static toggleCodeFormatting(editor: RichEditor, type: EditorBlockElementType, itemType: EditorItemElementType) {
        const active = CampgroundEditor.isNodeFormatted(editor, type);
        const activeElems = CampgroundEditor.getSelectedNodes(editor);

        console.log(activeElems);

        // Simple type change
        Transforms.setNodes<Element>(
            editor,
            {
                type: active ? `paragraph` : itemType,
            },
            {
                match: n => Element.isElement(n),
                split: true,
            }
        );

        if (active)
            Transforms.unwrapNodes(
                editor,
                {
                    match: n => Element.isElement(n) && n.type === type
                }
            )
        else
            Transforms.wrapNodes(
                editor,
                {
                    type,
                    children: [],
                    lang: "js",
                },
                {
                    match: n => Element.isElement(n) && n.type === itemType
                }
            );
    }
    static insertTableFormatting(editor: RichEditor) {
        editor.insertNode({
            type: "table",
            children: [
                {
                    type: "table-row",
                    children: [
                        {
                            type: "table-cell",
                            children: [
                                { text: "Cell #1" }
                            ]
                        },
                        {
                            type: "table-cell",
                            children: [
                                { text: "Cell #2" }
                            ]
                        }
                    ]
                },
                {
                    type: "table-row",
                    children: [
                        {
                            type: "table-cell",
                            children: [
                                { text: "Cell #3" }
                            ]
                        },
                        {
                            type: "table-cell",
                            children: [
                                { text: "Cell #4" }
                            ]
                        }
                    ]
                }
            ]
        });
    }
}