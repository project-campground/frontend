import { isAtBlockStart } from 'prosekit/core';
import { chainCommands, lift } from 'prosekit/pm/commands';
import type { Command } from 'prosekit/pm/state';

const removeBlockquote: Command = (state, dispatch, view): boolean => {
	const nodeResolved = isAtBlockStart(state, view);
	const nodeParent = nodeResolved?.node(-1);

	if (nodeParent?.type.name === 'blockquote' && nodeResolved?.parent?.type.name === 'paragraph')
		return lift(state, dispatch, view);

	return false;
};

export function editorBackspace() {
	return chainCommands(removeBlockquote);
}
