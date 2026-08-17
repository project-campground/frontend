import { defineKeymap } from 'prosekit/core';
import { editorEnter } from './enter.ts';
import { editorShiftEnter } from './shift-enter.ts';
import { editorBackspace } from './backspace.ts';

export function defineBlockKeymap() {
	return defineKeymap({
		'Shift-Enter': editorShiftEnter(),
		Enter: editorEnter(),
		Backspace: editorBackspace(),
	});
}
