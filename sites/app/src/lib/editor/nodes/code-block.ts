import { CodeView } from '$lib/components/markdown/index.js';
import { defineNodeSpec, union } from '@prosekit/core';
import { defineInputRule } from 'prosekit/extensions/input-rule';
import { InputRule } from 'prosekit/pm/inputrules';
import { defineSvelteNodeView } from 'prosekit/svelte';

export function defineCodeBlock() {
	return union(defineCodeBlockSpec(), defineCodeBlockView(), defineCodeBlockInputRule());
}

export function defineCodeBlockSpec() {
	return defineNodeSpec({
		name: 'code',
		content: 'codeLine*',
		group: 'block',
		// parseDOM: [{ tag: 'pre' }],
		defining: true,
		attrs: { lang: { default: '', validate: 'string' } },
		toDOM() {
			return ['pre', 0];
		},
	});
}

export function defineCodeBlockView() {
	return defineSvelteNodeView({ name: 'code', component: CodeView.Block });
}

export function defineCodeBlockInputRule() {
	return defineInputRule(
		new InputRule(
			/^[`]{3}\s$/,
			(state, _match, start, end) => {
				const transaction = state.tr
					.deleteRange(start, end)
					.insert(start, state.schema.node('code', {}, state.schema.node('codeLine')));

				return transaction;
			},
			{ inCode: true },
		),
	);
}
