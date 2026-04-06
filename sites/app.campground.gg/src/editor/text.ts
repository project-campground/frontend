/**
 * Rich text editor text node's available formatting that changes the appearance of the leaves.
 */
export interface EditorTextFormatting {
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
export interface EditorTextUnformatted {
    text: string;
}
/**
 * Rich text editor's text node with all of its contents.
 */
export interface EditorText extends EditorTextFormatting, EditorTextUnformatted { }