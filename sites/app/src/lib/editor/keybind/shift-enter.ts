import { setSelectionAround } from 'prosekit/core';
import { type Command } from 'prosekit/pm/state';
import { chainCommands } from 'prosekit/pm/commands';
import { editorEnterCodeLine } from './enter.ts';

export const editorShiftEnterInsertParagraph: Command = (state, dispatch) => {
	// Replaces double hardBreaks with new paragraph instance
	if (state.selection.$to.nodeBefore?.type.name === 'hardBreak') {
		const deleteFrom = state.selection.empty ? state.selection.from - 1 : state.selection.from;
		const transaction = state.tr
			.delete(deleteFrom, state.selection.to)
			.insert(deleteFrom, state.schema.node('paragraph'));
		// Since it goes to previous character
		setSelectionAround(transaction, deleteFrom + 1);

		dispatch?.(transaction);
		return true;
	}

	return false;
};
export const editorShiftEnterInsertBreak: Command = (state, dispatch) => {
	// If text is actually selected and the cursor is not just placed, it is expected user experience that the selected area gets replaced with line break
	const transaction =
		state.selection.empty ? state.tr : state.tr.delete(state.selection.from, state.selection.to);

	dispatch?.(transaction.insert(state.selection.from, state.schema.node('hardBreak')));
	return true;
};

export function editorShiftEnter() {
	return chainCommands(
		editorEnterCodeLine,
		editorShiftEnterInsertParagraph,
		editorShiftEnterInsertBreak,
	);
}
