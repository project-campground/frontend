import { setSelectionAround } from 'prosekit/core';
import { chainCommands, createParagraphNear } from 'prosekit/pm/commands';
import type { Command } from 'prosekit/pm/state';
import { splitSplittableBlock } from 'prosemirror-splittable';

export function editorEnter() {
	return chainCommands(editorEnterCodeLine, createParagraphNear, splitSplittableBlock);
}

export const editorEnterCodeLine: Command = (state, dispatch) => {
	const parent = state.selection.$to.node(-1);

	console.log('Enter', parent);

	if (parent.type.name !== 'code') return false;

	const deleteFrom = state.selection.empty ? state.selection.from : state.selection.from;
	const transaction = state.tr
		.delete(deleteFrom, state.selection.to)
		.insert(deleteFrom, state.schema.node('codeLine'));

	// Since it goes to previous character
	setSelectionAround(transaction, deleteFrom + 1);

	dispatch?.(transaction);
	return true;
};
