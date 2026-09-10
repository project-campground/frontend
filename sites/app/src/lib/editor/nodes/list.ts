import { defineNodeSpec, union } from 'prosekit/core';
import { defineInputRule } from 'prosekit/extensions/input-rule';
import { InputRule } from 'prosekit/pm/inputrules';
import type { EditorState, Transaction } from 'prosekit/pm/state';
import { findWrapping } from 'prosekit/pm/transform';
import { type Attrs } from 'prosekit/pm/model';

export function defineList() {
	return union(defineListSpec(), defineListItemSpec(), defineListInputRule());
}

export function defineListSpec() {
	return defineNodeSpec({
		name: 'list',
		content: 'listElement+',
		group: 'listElement block',
		attrs: {
			ordered: { default: false, validate: 'boolean' },
			start: { default: 0, validate: 'number' },
		},
		defining: true,
		parseDOM: [
			{ tag: 'ul', getAttrs: () => ({ ordered: false }) },
			{
				tag: 'ol',
				getAttrs: (element) => ({
					ordered: true,
					start: element.hasAttribute('start') ? parseInt(element.getAttribute('start')!) : undefined,
				}),
			},
		],
		toDOM(node) {
			return [
				node.attrs.ordered ? 'ol' : 'ul',
				node.attrs.start ? { start: node.attrs.start } : {},
				0,
			];
		},
	});
}
export function defineListItemSpec() {
	return defineNodeSpec({
		name: 'listItem',
		content: 'block+',
		group: 'listElement block',
		defining: true,
		parseDOM: [{ tag: 'li' }],
		toDOM() {
			return ['li', 0];
		},
	});
}
function defineSpecificListInputRule(attrs: (match: RegExpMatchArray) => Attrs) {
	return (
		state: EditorState,
		match: RegExpMatchArray,
		start: number,
		end: number,
	): Transaction | null => {
		const tr = state.tr.delete(start, end);
		const range = tr.doc.resolve(start).blockRange();

		if (!range) return null;

		const attributes = attrs(match);

		const listItemWrapping = findWrapping(range, state.schema.nodes['listItem']);
		const listWrapping = findWrapping(range, state.schema.nodes['list'], attributes);

		if (!listItemWrapping || !listWrapping) return null;

		const transaction = tr.wrap(range, listWrapping);

		return transaction;
	};
}
export function defineListInputRule() {
	return union(
		defineInputRule(
			new InputRule(
				/^[-+*]\s/,
				defineSpecificListInputRule(() => ({ ordered: false })),
				{ inCode: true },
			),
		),
		defineInputRule(
			new InputRule(
				/^([1-9][0-9]*)[.]\s/,
				defineSpecificListInputRule((match) => ({ ordered: true, start: parseInt(match[1]) })),
				{ inCode: true },
			),
		),
	);
}
