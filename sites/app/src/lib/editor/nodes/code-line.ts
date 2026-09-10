import { CodeView } from '$lib/components/markdown/index.js';
import { defineNodeSpec, union } from '@prosekit/core';
import { defineSvelteNodeView } from 'prosekit/svelte';

export function defineCodeLine() {
	return union(defineCodeLineSpec(), defineCodeLineView());
}

export function defineCodeLineSpec() {
	return defineNodeSpec({
		name: 'codeLine',
		content: 'text*',
		group: 'block',
		defining: true,
		toDOM() {
			return ['p', 0];
		},
	});
}

export function defineCodeLineView() {
	return defineSvelteNodeView({ name: 'codeLine', component: CodeView.Line });
}
