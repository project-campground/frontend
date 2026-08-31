import { defineBaseCommands, defineBaseKeymap, defineHistory, union } from 'prosekit/core';
import { defineRoot } from './nodes/root.ts';
import { defineText } from './nodes/text.ts';
import { defineParagraph } from 'prosekit/extensions/paragraph';
import { defineBlockquote } from 'prosekit/extensions/blockquote';
import { definePlaceholder } from 'prosekit/extensions/placeholder';
import { defineBlockKeymap, defineMessageKeymap, definePostKeymap } from './keybind/index.ts';
import {
	defineHardBreakCommands,
	defineHardBreakKeymap,
	defineHardBreakSpec,
} from 'prosekit/extensions/hard-break';

export function definePostExtension(placeholder?: string) {
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
		definePostKeymap(),
		defineBaseKeymap(),
		// Additional
		defineBaseCommands(),
		defineHistory(),
		definePlaceholder({ strategy: 'doc', placeholder: placeholder ?? '' }),
	);
}
export function defineMessageExtension(onSubmit: () => unknown, placeholder?: string) {
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
		defineMessageKeymap(onSubmit),
		defineBaseKeymap(),
		// Additional
		defineBaseCommands(),
		defineHistory(),
		definePlaceholder({ strategy: 'doc', placeholder: placeholder ?? '' }),
	);
}
