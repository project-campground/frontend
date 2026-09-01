import { defineKeymap } from 'prosekit/core';
import { editorEnter } from './enter.ts';
import { editorShiftEnter } from './shift-enter.ts';
import { editorBackspace } from './backspace.ts';

export function defineBlockKeymap() {
	return defineKeymap({ 'Shift-Enter': editorShiftEnter(), Backspace: editorBackspace() });
}
export function definePostKeymap() {
	return defineKeymap({ Enter: editorEnter() });
}
export function defineMessageKeymap(onSubmit: () => unknown, onCancel?: () => unknown) {
	return defineKeymap({ Enter: () => (onSubmit(), true), Escape: () => (onCancel?.(), true) });
}
