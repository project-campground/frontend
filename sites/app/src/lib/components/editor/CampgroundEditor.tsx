import {
	type Ancestor,
	Editor,
	Element,
	Node,
	type NodeEntry,
	type Path,
	Text,
	Transforms,
} from 'slate';
import {
	EditorInlineElementType,
	type RichEditor,
	type EditorElementType,
	type EditorBlockElementType,
	type EditorItemElementType,
} from '../../editor/editor';
import type { EditorTextFormatting } from '~/editor/text';
import { EditorItemParents, EditorListElementType } from '~/editor/element';
import { paragraph } from '~/editor/utils';

export default class CampgroundEditor {
	static clearEditor(editor: RichEditor) {
		editor.delete({ at: { anchor: editor.start([]), focus: editor.end([]) } });
		editor.unwrapNodes({ mode: 'all', match: (node) => !Editor.isEditor(node) });

		editor.insertNode(paragraph());
	}
	static isNodeFormatted(editor: RichEditor, type: EditorElementType) {
		const { selection } = editor;

		// Can't detect nodes; out of focus of editor
		if (!selection) return false;

		const [match] = Array.from(
			Editor.nodes(editor, {
				at: Editor.unhangRange(editor, selection),
				match: (n) => {
					if (!Editor.isEditor(n) && Element.isElement(n)) return n.type === type;

					return false;
				},
			}),
		);

		// Returned at least one element, which means it is formatted
		return Boolean(match);
	}
	static getSelectedNodes(editor: RichEditor, type?: EditorElementType): NodeEntry<Node>[] | null {
		const { selection } = editor;

		// Can't detect nodes; out of focus of editor
		if (!selection) return null;

		return Array.from(
			Editor.nodes(editor, {
				at: Editor.unhangRange(editor, selection),
				match: (n) => !Editor.isEditor(n) && Element.isElement(n) && (!type || n.type === type),
			}),
		);
	}
	static getNearestAncestor(
		editor: RichEditor,
		type?: EditorElementType,
	): NodeEntry<Ancestor> | undefined | null {
		const { selection } = editor;

		// Can't detect nodes; out of focus of editor
		if (!selection) return null;

		return Editor.above(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) => !Editor.isEditor(n) && Element.isElement(n) && (!type || n.type === type),
		});
	}
	static isTextFormatted(editor: RichEditor, type: keyof EditorTextFormatting) {
		const marks = Editor.marks(editor);
		return (marks?.[type] as boolean | null) ?? false;
	}
	static toggleTextFormatting(editor: RichEditor, type: keyof EditorTextFormatting) {
		const isMarked = this.isTextFormatted(editor, type);

		return isMarked ? Editor.removeMark(editor, type) : Editor.addMark(editor, type, true);
	}
	static isListElement(element: any) {
		return (
			Element.isElement(element)
			&& EditorItemParents['list-item'].includes(element.type as EditorBlockElementType)
		);
	}
	static toggleBlockFormatting(
		editor: RichEditor,
		type: EditorBlockElementType,
		additionalProps?: any,
	) {
		const active = CampgroundEditor.isNodeFormatted(editor, type);

		// Simple type change
		const props =
			active ?
				additionalProps
				&& Object.keys(additionalProps).reduce(
					(obj, prop) => ((obj[prop] = null), obj),
					{} as Record<string, null>,
				)
			:	additionalProps;

		Transforms.setNodes<Element>(editor, { type: active ? `paragraph` : type, ...props });
	}
	static insertTableRow(editor: RichEditor, columns: number, tablePath: Path, row: number) {
		const rowPath = [...tablePath, row];
		console.log({ tablePath });
		editor.insertNode(
			{
				type: 'table-row',
				children: Array(columns)
					.fill(null)
					.map(() => ({ type: 'table-cell', children: [{ text: '' }] })),
			},
			{ at: rowPath },
		);
		editor.select({ path: [...rowPath, 0, 0], offset: 1 });
	}
	static insertTableColumn(editor: RichEditor, rows: number, tablePath: Path, column: number) {
		for (let row = 0; row < rows; row++) {
			const columnPath = [...tablePath, row, column];

			editor.insertNode({ type: 'table-cell', children: [{ text: '' }] }, { at: columnPath });
		}
		// editor.select({ path: [...insertedPath, 0, 0], offset: 1 });
	}
	static removeTableColumn(editor: RichEditor, tablePath: Path, column: number) {
		editor.removeNodes({
			at: tablePath,
			match: (node, path) =>
				Element.isElement(node) && node.type === 'table-cell' && path.slice(-1)[0] === column,
		});
	}
	static setBlockFormatting(
		editor: RichEditor,
		type: EditorBlockElementType,
		additionalProps?: any,
	) {
		// Simple type change
		Transforms.setNodes<Element>(editor, { type: type, ...additionalProps });
	}
	static toggleInlineFormatting(editor: RichEditor, type: EditorInlineElementType) {
		const active = CampgroundEditor.isNodeFormatted(editor, type);

		if (active)
			return Transforms.unwrapNodes(editor, {
				match: (n) =>
					!Editor.isEditor(n)
					&& Element.isElement(n)
					&& (EditorInlineElementType as readonly string[]).includes(n.type),
			});

		Transforms.wrapNodes(
			editor,
			{ type: 'link', url: '#', children: [] },
			{
				match: (n) =>
					!Editor.isEditor(n)
					&& ((Element.isElement(n) && (EditorInlineElementType as readonly string[]).includes(n.type))
						|| Text.isText(n)),
			},
		);
	}
	static toggleListFormatting(editor: RichEditor, type: EditorBlockElementType) {
		if (!editor.selection) return;

		const nearestList = Editor.above(editor, {
			match: (node) =>
				Element.isElement(node) && EditorListElementType.includes(node.type as EditorListElementType),
		});

		// Wrap into a list
		if (!nearestList) {
			Transforms.wrapNodes(
				editor,
				{ type: 'list-item', children: [] },
				{ at: editor.selection, match: (n) => Element.isElement(n) },
			);
			Transforms.wrapNodes(
				editor,
				{ type, children: [] },
				{ match: (n) => Element.isElement(n) && n.type === 'list-item' },
			);

			return;
		}
		// Change list type
		else if (Element.isElement(nearestList[0]) && nearestList[0].type !== type)
			return Transforms.setNodes(editor, { type }, { at: nearestList[1] });

		// unwrap all the lists
		Transforms.unwrapNodes(editor, {
			match: (n) => Element.isElement(n) && n.type === 'list-item',
			at: editor.selection,
			split: true,
		});
		Transforms.unwrapNodes(editor, {
			match: (n) => Element.isElement(n) && n.type === type,
			split: true,
			at: editor.selection,
			mode: 'all',
		});
	}
	static toggleCodeFormatting(
		editor: RichEditor,
		type: EditorBlockElementType,
		itemType: EditorItemElementType,
	) {
		const active = CampgroundEditor.isNodeFormatted(editor, type);

		// Simple type change
		Transforms.setNodes<Element>(
			editor,
			{ type: active ? `paragraph` : itemType },
			{ match: (n) => Element.isElement(n), split: true },
		);

		if (active)
			Transforms.unwrapNodes(editor, { match: (n) => Element.isElement(n) && n.type === type });
		else
			Transforms.wrapNodes(
				editor,
				{ type, children: [], lang: 'js' },
				{ match: (n) => Element.isElement(n) && n.type === itemType },
			);
	}
	static insertTableFormatting(editor: RichEditor) {
		editor.insertNode({
			type: 'table',
			children: [
				{
					type: 'table-row',
					children: [
						{ type: 'table-cell', children: [{ text: 'Cell #1' }] },
						{ type: 'table-cell', children: [{ text: 'Cell #2' }] },
					],
				},
				{
					type: 'table-row',
					children: [
						{ type: 'table-cell', children: [{ text: 'Cell #3' }] },
						{ type: 'table-cell', children: [{ text: 'Cell #4' }] },
					],
				},
			],
		});
	}
	static insertImageFormatting(editor: RichEditor, url: string, title?: string | null | undefined) {
		editor.insertNode(
			{ type: 'paragraph', children: [{ type: 'image', url, title, children: [{ text: '' }] }] },
			{ at: editor.selection?.focus },
		);
	}
}
