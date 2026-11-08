import type { HasPosition } from '#lib/types/campground/interfaces.js';

export const sortPositioned = <T extends HasPosition>(items: T[]) =>
	items.sort((a, b) => a.position - b.position);
