import type { Text } from "slate";
import type { EditorText, EditorTextUnformatted } from "./text";

const _EditorListElementType = ["unordered-list", "ordered-list"] as const;
const _EditorBlockElementType = ["paragraph", "block-quote", "code-block", "divider", "unordered-list", "ordered-list", "heading", "table", ..._EditorListElementType] as const;
/**
 * Rich text editor node elements that don't necessarily depend on the ancestor element and spans at least a line.
*/
export type EditorBlockElementType = typeof _EditorBlockElementType[number];
/**
 * Rich text editor node elements that don't necessarily depend on the ancestor element and spans at least a line.
*/
export const EditorBlockElementType = _EditorBlockElementType;
/**
 * Rich text editor node elements that don't necessarily depend on the ancestor element and spans at least a line.
*/
export type EditorListElementType = typeof _EditorListElementType[number];
/**
 * Rich text editor node elements that don't necessarily depend on the ancestor element and spans at least a line.
*/
export const EditorListElementType = _EditorListElementType;

/**
 * Rich text editor node elements that depends on the ancestor block element and spans at least a line.
*/
const _EditorItemElementType = ["code-line", "list-item", "table-row", "table-cell"] as const;
/**
 * Rich text editor node elements that depends on the ancestor block element and spans at least a line.
*/
export type EditorItemElementType = typeof _EditorItemElementType[number];
/**
 * Rich text editor node elements that depends on the ancestor block element and spans at least a line.
*/
export const EditorItemElementType = _EditorItemElementType;

export const EditorItemToParent: Record<EditorItemElementType, EditorBlockElementType | EditorInlineElementType | EditorItemElementType> = {
    "code-line": "code-block",
    "list-item": "unordered-list",
    "table-cell": "table-row",
    "table-row": "table",
};
export const EditorItemParents: Record<EditorItemElementType, (EditorBlockElementType | EditorInlineElementType | EditorItemElementType)[]> = {
    "code-line": ["code-block"],
    "list-item": ["unordered-list", "ordered-list"],
    "table-cell": ["table-row"],
    "table-row": ["table"],
}

// Test inline
/**
 * Rich text editor node elements that depends on the ancestor block element and does not necessarily span a line
 */
const _RichEditorInlineElementType = ["link", "image"] as const;
/**
 * Rich text editor node elements that depends on the ancestor block element and does not necessarily span a line.
 */
export type EditorInlineElementType = typeof _RichEditorInlineElementType[number];
/**
 * Rich text editor node elements that depends on the ancestor block element and does not necessarily span a line
 */
export const EditorInlineElementType = _RichEditorInlineElementType;

export type EditorElementType = EditorBlockElementType | EditorItemElementType | EditorInlineElementType;
export const EditorElementType = (_EditorItemElementType as readonly EditorElementType[])
    .concat(_RichEditorInlineElementType)
    .concat(_EditorBlockElementType);

/**
 * Type representing a base for block and item elements.
 */
export interface EditorBlockElementBase<TType extends EditorBlockElementType | EditorItemElementType, TDescendant> {
    type: TType;
    children: TDescendant[];
}
export interface EditorInlineElementBase<TType extends EditorInlineElementType, TDescendant> {
    type: TType;
    children: TDescendant[];
}

export type EditorParagraph = EditorBlockElementBase<"paragraph", Text | EditorInlineElement>;
export type EditorBlockQuote = EditorBlockElementBase<"block-quote", EditorBlockElement>;
export type EditorDivider = EditorBlockElementBase<"divider", EditorText>;
export type EditorUnorderedList = EditorBlockElementBase<"unordered-list", EditorListItem>;
export interface EditorCodeBlock extends EditorBlockElementBase<"code-block", EditorCodeLine> {
    lang?: null | undefined | string;
    meta?: null | undefined | string;
}

export interface EditorHeading extends EditorBlockElementBase<"heading", Text> {
    depth?: null | undefined | number;
}

export interface EditorOrderedList extends EditorBlockElementBase<"ordered-list", EditorListItem> {
    start?: null | undefined | number;
}
export type BlockAlignment = "left" | "center" | "right";
export interface EditorTable extends EditorBlockElementBase<"table", EditorTableRow> {
    align?: BlockAlignment[] | undefined | null;
}
    
export type EditorBlockElement =
    EditorParagraph |
    EditorHeading |
    EditorBlockQuote |
    EditorDivider |
    EditorCodeBlock |
    EditorUnorderedList | 
    EditorOrderedList |
    EditorTable;

export type EditorCodeLine = EditorBlockElementBase<"code-line", EditorTextUnformatted>;
export type EditorListItem = EditorBlockElementBase<"list-item", EditorBlockElement | EditorText>;
export type EditorTableRow = EditorBlockElementBase<"table-row", EditorTableCell>;
export type EditorTableCell = EditorBlockElementBase<"table-cell", Text>;

export type EditorItemElement =
    EditorCodeLine |
    EditorListItem |
    EditorTableRow |
    EditorTableCell;

export interface EditorLink extends EditorInlineElementBase<"link", Text> {
    url: string;
    title?: string | undefined | null;
}
export interface EditorImage extends EditorInlineElementBase<"image", Text> {
    url: string;
    title?: string | undefined | null;
}
export type EditorInlineElement = EditorLink | EditorImage;
export type EditorElement = EditorInlineElement | EditorBlockElement | EditorItemElement;