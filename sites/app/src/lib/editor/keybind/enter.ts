import { setSelectionAround } from 'prosekit/core';
import { chainCommands, createParagraphNear, splitBlock } from 'prosekit/pm/commands';
import type { Command } from 'prosekit/pm/state';
import { splitBlockAs, splitSplittableBlock } from 'prosemirror-splittable';

export function editorEnter() {
	return chainCommands(
		editorEnterCodeLine,
		editorEnterList,
		createParagraphNear,
		splitSplittableBlock,
	);
}

export const editorEnterCodeLine: Command = (state, dispatch) => {
	const parent = state.selection.$to.node(-1);

	if (parent.type.name !== 'code') return false;

	const deleteFrom = state.selection.empty ? state.selection.from : state.selection.from;
	const transaction = state.tr.delete(deleteFrom, state.selection.to).split(deleteFrom, 1);

	// Since it goes to previous character
	setSelectionAround(transaction, deleteFrom + 1);

	dispatch?.(transaction);
	return true;
};

export const editorEnterList: Command = (state, dispatch, view) => {
	const parent = state.selection.$to.node(-1);

	console.log('Parent...', parent);

	if (parent.type.name !== 'listItem') return false;

	const deleteFrom = state.selection.empty ? state.selection.from : state.selection.from;
	const transaction = state.tr.delete(deleteFrom, state.selection.to).split(deleteFrom, 2);

	// Since it goes to previous character
	setSelectionAround(transaction, deleteFrom + 1);

	dispatch?.(transaction);
	return true;
};
