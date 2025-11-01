import type { BaseEditor, BasePoint, BaseRange, Element, Range, Text } from "slate";
import type { HistoryEditor } from "slate-history";
import type { ReactEditor } from "slate-react";

/**
 * Rich text editor text node's available formatting that changes the appearance of the leaves.
 */
export interface RichEditorTextFormatting {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    scope?: string;
}
/**
 * Rich text editor text node's contents without any formatting. May be used in code blocks and whatnot.
 */
export interface RichEditorTextUnformatted {
    text: string;
}
/**
 * Rich text editor's text node with all of its contents.
 */
export interface RichEditorText extends RichEditorTextFormatting, RichEditorTextUnformatted { }
const _RichEditorBlockElementType = ["paragraph", "block-quote", "code-block", "divider", "unordered-list", "ordered-list", "heading"] as const;
/**
 * Rich text editor node elements that don't necessarily depend on the ancestor element and spans at least a line.
*/
export type RichEditorBlockElementType = typeof _RichEditorBlockElementType[number];
/**
 * Rich text editor node elements that don't necessarily depend on the ancestor element and spans at least a line.
*/
export const RichEditorBlockElementType = _RichEditorBlockElementType;

/**
 * Rich text editor node elements that depends on the ancestor block element and spans at least a line.
*/
const _RichEditorItemElementType = ["code-line", "list-item"] as const;
/**
 * Rich text editor node elements that depends on the ancestor block element and spans at least a line.
*/
export type RichEditorItemElementType = typeof _RichEditorItemElementType[number];
/**
 * Rich text editor node elements that depends on the ancestor block element and spans at least a line.
*/
export const RichEditorItemElementType = _RichEditorItemElementType;

export const RichEditorItemToParent: Record<RichEditorItemElementType, RichEditorBlockElementType> = {
    "code-line": "code-block",
    "list-item": "unordered-list",
};

// Test inline
/**
 * Rich text editor node elements that depends on the ancestor block element and does not necessarily span a line
 */
const _RichEditorInlineElementType = ["inline-quote", "link"] as const;
/**
 * Rich text editor node elements that depends on the ancestor block element and does not necessarily span a line.
 */
export type RichEditorInlineElementType = typeof _RichEditorInlineElementType[number];
/**
 * Rich text editor node elements that depends on the ancestor block element and does not necessarily span a line
 */
export const RichEditorInlineElementType = _RichEditorInlineElementType;

export type RichEditorAnyElementType = RichEditorBlockElementType | RichEditorItemElementType | RichEditorInlineElementType;
export const RichEditorAnyElementType = (_RichEditorItemElementType as readonly RichEditorAnyElementType[])
    .concat(_RichEditorInlineElementType)
    .concat(_RichEditorBlockElementType);

/**
 * Type representing a base for block and item elements.
 */
export interface RichEditorBlockElement<TType extends RichEditorBlockElementType | RichEditorItemElementType, TDescendant> {
    type: TType;
    children: TDescendant[];
}
export interface RichEditorInlineElement<TType extends RichEditorInlineElementType, TDescendant> {
    type: TType;
    children: TDescendant[];
}

export type RichEditorCodeLine = RichEditorBlockElement<"code-line", RichEditorTextUnformatted>;
export type RichEditorListItem = RichEditorBlockElement<"list-item", RichEditorAnyBlockElement | RichEditorText>;

export interface RichEditorCodeBlock extends RichEditorBlockElement<"code-block", RichEditorCodeLine> {
    lang?: null | undefined | string;
    meta?: null | undefined | string;
}

export interface RichEditorHeading extends RichEditorBlockElement<"heading", Text> {
    depth?: null | undefined | number;
}

export interface RichEditorLink extends RichEditorInlineElement<"link", Text> {
    url: string;
}

export interface RichEditorOrderedList extends RichEditorBlockElement<"ordered-list", RichEditorListItem> {
    startingNumber?: null | undefined | number;
}

export type RichEditorAnyBlockElement =
    RichEditorBlockElement<"paragraph", Text> |
    RichEditorHeading |
    RichEditorBlockElement<"block-quote", RichEditorAnyBlockElement> |
    RichEditorBlockElement<"divider", RichEditorText> |
    RichEditorCodeBlock |
    RichEditorBlockElement<"unordered-list", RichEditorListItem> | 
    RichEditorOrderedList;
export type RichEditorAnyItemElement =
    RichEditorCodeLine |
    RichEditorListItem;
export type RichEditorAnyInlineElement =
    RichEditorInlineElement<"inline-quote", RichEditorAnyInlineElement | RichEditorText> |
    RichEditorLink;
export type RichEditorAnyElement = RichEditorAnyInlineElement | RichEditorAnyBlockElement | RichEditorAnyItemElement;

export type RichEditor =
    BaseEditor & ReactEditor & HistoryEditor &
    {
        nodeToDecorations?: Map<Element, Range[]>
    };

export interface RichEditorPoint extends BasePoint {
    lineOffset?: number;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: RichEditor;
    Element: RichEditorAnyElement;
    Text: RichEditorText;
    Point: RichEditorPoint;
    Range: BaseRange & {
        [key: string]: unknown
    }
  }
}