import { union } from 'prosekit/core';
import { defineRoot } from './nodes/root.ts';
import { defineText } from './nodes/text.ts';
import { defineParagraph } from 'prosekit/extensions/paragraph';
import { defineBlockquote } from 'prosekit/extensions/blockquote';
import { defineBlockKeymap } from './keybind/index.ts';
import {
	defineHardBreakCommands,
	defineHardBreakKeymap,
	defineHardBreakSpec,
} from 'prosekit/extensions/hard-break';

export function definePostExtension() {
	return union(
		// Special nodes
		defineRoot(),
		// Block nodes
		defineParagraph(),
		defineBlockquote(),
		// Inline nodes
		defineHardBreakSpec(),
		defineHardBreakCommands(),
		defineHardBreakKeymap(),
		defineText(),
		// Key maps
		defineBlockKeymap(),
	);
}
