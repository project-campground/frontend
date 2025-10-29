import { Editor, Element, Text, Transforms } from "slate";
import { RichEditorInlineElementType, type RichEditor, type RichEditorAnyElement, type RichEditorAnyElementType, type RichEditorBlockElementType, type RichEditorItemElementType, type RichEditorTextFormatting } from "./editor";

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
    static isTextFormatted(editor: RichEditor, type: keyof RichEditorTextFormatting) {
        const marks = Editor.marks(editor);
        return (marks?.[type] as boolean | null) ?? false;
    }
    static toggleBlockFormatting(editor: RichEditor, type: RichEditorBlockElementType) {
        const active = this.isNodeFormatted(editor, type);

        // Simple type change
        Transforms.setNodes<Element>(editor, {
            type: active ? `paragraph` : type,
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

        if (active) { }
        else
            Transforms.wrapNodes(
                editor,
                {
                    type,
                    children: [],
                    language: "js"
                } as unknown as RichEditorAnyElement,
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