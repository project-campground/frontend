import { defineKeymap } from 'prosekit/core';
import { editorEnter, editorEnterCodeLine, editorEnterList } from './enter.ts';
import { editorShiftEnter } from './shift-enter.ts';
import { editorBackspace } from './backspace.ts';
import { chainCommands } from 'prosekit/pm/commands';
import { arrowDownCommand, arrowUpCommand } from './arrow.ts';
import type { Command } from 'prosekit/pm/state';

export function defineBlockKeymap() {
	return defineKeymap({ 'Shift-Enter': editorShiftEnter(), Backspace: editorBackspace() });
}
export function definePostKeymap() {
	return defineKeymap({ Enter: editorEnter() });
}
export function defineMessageKeymap(
	onSubmit: () => unknown,
	onCancel?: () => unknown,
	onUp?: () => unknown,
	onDown?: () => unknown,
) {
	return defineKeymap({
		ArrowUp: onUp ? arrowUpCommand(onUp) : (undefined as unknown as Command),
		ArrowDown: onDown ? arrowDownCommand(onDown) : (undefined as unknown as Command),
		Enter: chainCommands(editorEnterCodeLine, editorEnterList, () => (onSubmit(), true)),
		Escape: () => (onCancel?.(), true),
	});
}
