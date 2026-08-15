import { defineNodeSpec, Priority, union, withPriority } from '@prosekit/core';
import { defineParagraphCommands } from 'prosekit/extensions/paragraph';

export function defineParagraphSpec() {
	return union(
		withPriority(
			defineNodeSpec({
				name: 'paragraph',
				content: 'inline*',
				group: 'block',
				parseDOM: [{ tag: 'p' }],
				toDOM() {
					return ['p', 0];
				},
			}),
			Priority.highest,
		),
		defineParagraphCommands(),
	);
}
