import { Editor, Element, Node, type NodeEntry, Text, Transforms } from "slate";
import { RichEditorInlineElementType, type RichEditor, type RichEditorAnyElementType, type RichEditorBlockElementType, type RichEditorItemElementType, type RichEditorTextFormatting } from "../../editor/editor";

export default class CampgroundEditor {
    static isNodeFormatted(editor: RichEditor, type: RichEditorAnyElementType) {
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
    static getSelectedNodes(editor: RichEditor): NodeEntry<Node>[] | null {
        const { selection } = editor;

        // Can't detect nodes; out of focus of editor
        if (!selection)
            return null;

        return Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: n => !Editor.isEditor(n) && Element.isElement(n),
            })
        );
    }
    static isTextFormatted(editor: RichEditor, type: keyof RichEditorTextFormatting) {
        const marks = Editor.marks(editor);
        return (marks?.[type] as boolean | null) ?? false;
    }
    static toggleBlockFormatting(editor: RichEditor, type: RichEditorBlockElementType, additionalProps?: any) {
        const active = this.isNodeFormatted(editor, type);

        // Simple type change
        const props = active ? additionalProps && Object.keys(additionalProps).reduce((obj, prop) => (obj[prop] = null, obj), {} as Record<string, null>) : additionalProps;

        Transforms.setNodes<Element>(editor, {
            type: active ? `paragraph` : type,
            ...props,
        });
    }
    static setBlockFormatting(editor: RichEditor, type: RichEditorBlockElementType, additionalProps?: any) {
        // Simple type change
        Transforms.setNodes<Element>(editor, {
            type: type,
            ...additionalProps,
        });
    }
    static toggleInlineFormatting(editor: RichEditor, type: RichEditorInlineElementType) {
        const active = this.isNodeFormatted(editor, type);

        if (active)
            return Transforms.unwrapNodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    Element.isElement(n) &&
                    (RichEditorInlineElementType as readonly string[]).includes(n.type)
            });

        Transforms.wrapNodes(
            editor,
            { 
                type: "inline-quote",
                children: []
            },
            {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    ((Element.isElement(n) && (RichEditorInlineElementType as readonly string[]).includes(n.type)) || Text.isText(n))
            }
        );
    }
    static toggleListFormatting(editor: RichEditor, type: RichEditorBlockElementType, itemType: RichEditorItemElementType) {
        const active = this.isNodeFormatted(editor, type);

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
    static toggleCodeFormatting(editor: RichEditor, type: RichEditorBlockElementType, itemType: RichEditorItemElementType) {
        const active = this.isNodeFormatted(editor, type);
        const activeElems = this.getSelectedNodes(editor);

        console.log(activeElems);

        // Simple type change
        Transforms.setNodes<Element>(
            editor,
            {
                type: active ? `paragraph` : itemType,
            },
            {
                match: n => Element.isElement(n) && n.type === "paragraph",
                split: true,
            }
        );

        editor.selection

        if (active) { }
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
    static toggleTextFormatting(editor: RichEditor, type: keyof RichEditorTextFormatting) {
        const active = this.isTextFormatted(editor, type);

        if (active)
            Editor.removeMark(editor, type);
        else
            Editor.addMark(editor, type, true);
    }
}