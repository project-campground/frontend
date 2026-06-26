import {
	type BaseSelection,
	Editor,
	Element,
	Node,
	type NodeEntry,
	type Path,
	Point,
	Text,
} from 'slate';
import { EditorItemElementType, type RichEditor } from './editor';
import { getNeighborPath, getNewlineOffsets, getParentPath, paragraph } from './utils';
import React from 'react';
import { type EditorElement, type EditorItemElement } from './element';
import CampgroundEditor from '~/components/editor/CampgroundEditor';

function selectWithOptionalShift(
	editor: RichEditor,
	currentSelection: BaseSelection,
	shift: boolean,
	newPosition: Point,
) {
	return editor.select({
		anchor: shift ? currentSelection!.anchor : newPosition,
		focus: newPosition,
	});
}

function ArrowVertical(editor: RichEditor, up: boolean, shift: boolean) {
	const above = editor.above();
	const elementAbove = above?.[0];
	const isElement = Element.isElement(elementAbove);

	if (!isElement) return;

	const elementString = Node.string(elementAbove);
	// a\nb means newline offsets will be [2], because second line starts at offset 2
	// if string is "a\nb", then offsets will be [0]a[1]\n[2]b[3], [2] being after \n
	const newlines = getNewlineOffsets(elementString);

	const currentSelection = editor.selection;
	const selectionOffset = currentSelection?.focus?.offset ?? 0;

	const passedLines = newlines.filter((x) => x <= selectionOffset);
	const linesAfter = newlines.filter((x) => x > selectionOffset);

	// Move between lines in a single block
	if ((!up && linesAfter.length) || (up && passedLines.length)) {
		// Where the newline is found as offset to move to
		const lineThere = up ? (passedLines.slice(-2, -1)[0] ?? 0) : linesAfter[0]!;

		const currentLine = passedLines.slice(-1)[0] ?? 0;
		const currentLineOffset = selectionOffset - currentLine;
		// Perhaps the line offset was saved

		const finalLineOffset = editor.selection?.focus.lineOffset ?? currentLineOffset;
		const lineThereMaxOffset =
			up ? currentLine - lineThere - 1 : (linesAfter[1] ?? elementString.length + 1) - 1 - lineThere;

		return selectWithOptionalShift(editor, currentSelection!, shift, {
			lineOffset: finalLineOffset,
			path: currentSelection!.focus.path,
			// To not allow going beyond the string
			offset: lineThere + Math.min(finalLineOffset, lineThereMaxOffset),
		});
	}

	// Will be used to get neighbours
	const abovePath = above![1];
	const aboveParent = getParentPath(abovePath);

	const sequentialItemSettings = { at: abovePath, match: (node: Node) => !Editor.isEditor(node) };

	// Positional calc
	const itemNext = editor.next(sequentialItemSettings);
	const itemPrevious = editor.previous(sequentialItemSettings);
	const itemThere = up ? itemPrevious : itemNext;
	const itemOppositeOfThere = up ? itemNext : itemPrevious;

	// Don't keep empty paragraph if person moved down or up accidentally, similar the way Guilded does
	if (
		itemThere
		&& !itemOppositeOfThere
		&& elementAbove.type === 'paragraph'
		&& Node.string(elementAbove) === ''
	) {
		editor.select({ path: itemThere[1], offset: 0 });
		return editor.delete({ at: abovePath });
	}
	// Just move there
	else if (itemThere) {
		const stringifiedThere = Node.string(itemThere[0]);
		// Retain the offset from the line cursor is at
		const newOffset =
			editor.selection?.focus.lineOffset
			?? (editor.selection?.focus?.offset ?? 0) - (newlines.slice(-1)[0] ?? 0);
		const newlinesThere = getNewlineOffsets(stringifiedThere);

		// Retain offset in the last line of the node 'there'
		return selectWithOptionalShift(editor, currentSelection!, shift, {
			path: itemThere[1],
			lineOffset: newOffset,
			offset: Math.min((newlinesThere.slice(-1)[0] ?? 0) + newOffset, stringifiedThere.length),
		});
	}
	// The end of editor and no point trying to escape blocks
	else if (elementAbove.type === 'paragraph' && abovePath.length < 2) return;

	const parent = editor.above({ at: abovePath });
	// 1 or -1
	const whichNeighbor = Number(up) * -2 + 1;
	const newNodePath =
		elementAbove.type === 'table-cell' || (parent?.[0] as Element).type === 'list-item' ?
			getNeighborPath(getParentPath(aboveParent), whichNeighbor)
			// ternary to prevent NaN when it's the table
		:	getNeighborPath(parent?.[1].length ? aboveParent : abovePath, whichNeighbor);

	// Insert and set cursor to it. Made to escape blocks.
	editor.insertNode({ type: 'paragraph', children: [] }, { at: newNodePath });
	return selectWithOptionalShift(editor, currentSelection!, shift, {
		path: [...newNodePath, 0],
		offset: 0,
		lineOffset: 0,
	});
}

export type KeyboardSettings = { enterCallback?: () => unknown; escapeCallback?: () => unknown };

function unnestListItem(editor: RichEditor, path: Path) {
	const parent = path.slice(0, -1);
	const grandparent = editor.above({ at: parent });

	if (!CampgroundEditor.isListElement(grandparent?.[0])) return;

	editor.unwrapNodes({ at: parent });
}

function enterInsertItem(editor: RichEditor, above: NodeEntry<Element>) {
	const neighborPath = getNeighborPath(above[1]);

	editor.insertNode(
		{ type: above[0].type as EditorItemElementType, children: [] } as EditorItemElement,
		{ at: neighborPath },
	);

	if (above[0].type === 'list-item') editor.insertNode(paragraph(), { at: [...neighborPath, 0] });

	return editor.move({ unit: 'line', distance: 1 });
}

export const editorKeyboardLogic: Record<
	string,
	(
		editor: RichEditor,
		event: React.KeyboardEvent<HTMLDivElement>,
		settings: KeyboardSettings,
	) => void
> = {
	ArrowUp(editor: RichEditor, event: React.KeyboardEvent<HTMLDivElement>) {
		return ArrowVertical(editor, true, event.shiftKey);
	},
	ArrowDown(editor: RichEditor, event: React.KeyboardEvent<HTMLDivElement>) {
		return ArrowVertical(editor, false, event.shiftKey);
	},
	Tab(editor: RichEditor, event: React.KeyboardEvent<HTMLDivElement>) {
		const above = editor.above({
			match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) && n.type !== 'paragraph',
		});

		if (!above) return;

		const [block, path] = above;

		if ((block as EditorElement).type !== 'list-item') return;
		else if (event.shiftKey && !event.ctrlKey) return unnestListItem(editor, path);

		const nearestList = editor.above({
			match: (n) =>
				Element.isElement(n)
				&& Editor.isBlock(editor, n)
				&& n.type !== 'list-item'
				&& n.type !== 'paragraph',
		});

		editor.wrapNodes(
			{
				type: (nearestList?.[0] as EditorElement).type ?? 'unordered-list',
				children: [],
			} as EditorElement,
			{ at: path },
		);
	},
	Enter(editor: RichEditor, event: React.KeyboardEvent<HTMLDivElement>, settings: KeyboardSettings) {
		const above = editor.above({ match: (n) => Element.isElement(n) && n.type !== 'paragraph' });

		// Can't create newlines in image alt
		if (above && above[0].type === 'image') return;
		// Override others for code blocks and list
		else if (
			above
			&& EditorItemElementType.includes(above[0].type as EditorItemElementType)
			&& (!event.shiftKey || above[0].type === 'code-line')
		)
			return enterInsertItem(editor, above);

		const currentSelection = editor.selection;
		if (!currentSelection) return;

		const textNode = editor.node(currentSelection.focus.path)[0];

		if (!Text.isText(textNode)) return;

		const previousCharacter = textNode.text[currentSelection.focus.offset - 1];

		// Soft break
		if (event.shiftKey && previousCharacter !== '\n') return editor.insertText('\n');
		else if (event.shiftKey) {
			editor.deleteBackward('character');
			return editor.insertNode(paragraph());
		}

		if (settings.enterCallback) return settings.enterCallback?.();

		editor.insertNode(paragraph());
	},
	Escape(_editor, _event, settings) {
		settings.escapeCallback?.();
	},
	Home(editor) {
		editor.select(editor.start([]));
	},
	End(editor) {
		editor.select(editor.end([]));
	},
};
