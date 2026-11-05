import type { Command } from 'prosekit/pm/state';

export const arrowDownCommand: (onDown: () => unknown) => Command = (onDown) => (state) => {
	const editorEnd = state.selection.$to.end(0);

	if (
		state.selection.$from.pos !== state.selection.$to.pos
		|| state.selection.$from.pos !== editorEnd - 1
	)
		return false;

	onDown();
	return true;
};
export const arrowUpCommand: (onUp: () => unknown) => Command = (onUp) => (state) => {
	if (state.selection.$from.pos !== state.selection.$to.pos || state.selection.$from.pos !== 1)
		return false;

	onUp();
	return true;
};
