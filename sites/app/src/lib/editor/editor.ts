import type { BaseEditor, BasePoint, BaseRange, Element, Range } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';
import type { EditorText } from './text';

import type { EditorElement } from './element';

export {
	type EditorElement as EditorAnyElement,
	type EditorBlockElement,
	type EditorBlockElementBase,
	EditorBlockElementType,
	type EditorBlockQuote,
	type EditorCodeBlock,
	type EditorCodeLine,
	type EditorDivider,
	EditorElementType,
	type EditorHeading,
	type EditorInlineElement,
	type EditorInlineElementBase,
	EditorInlineElementType,
	type EditorItemElement,
	EditorItemElementType,
	EditorItemToParent,
	type EditorLink,
	type EditorListItem,
	type EditorOrderedList,
	type EditorParagraph,
	type EditorUnorderedList,
} from './element';

export { type EditorText, type EditorTextFormatting, type EditorTextUnformatted } from './text';

export type RichEditor = BaseEditor
	& ReactEditor
	& HistoryEditor & { nodeToDecorations?: Map<Element, Range[]> };

export interface EditorPoint extends BasePoint {
	lineOffset?: number;
}

declare module 'slate' {
	interface CustomTypes {
		Editor: RichEditor;
		Element: EditorElement;
		Text: EditorText;
		Point: EditorPoint;
		Range: BaseRange & { [key: string]: unknown };
	}
}
