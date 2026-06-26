export type OverflowFix = 'cannot' | 'before' | 'after' | 'none';

export function getOverflowFixFromRect(parentRect: DOMRect, elementRect: DOMRect) {
	return {
		horizontal: getOverflowFix(parentRect.width, elementRect.width, elementRect.left),
		vertical: getOverflowFix(parentRect.height, elementRect.height, elementRect.top),
	};
}

export function getOverflowFix(parent: number, element: number, offset: number): OverflowFix {
	// quasi-bit-flag
	const canBeAfter = parent - element - offset >= 0;
	const canBeBefore = offset - element >= 0;

	return (
		canBeAfter && canBeBefore ? 'none'
		: canBeAfter ? 'after'
		: canBeBefore ? 'before'
		: 'cannot'
	);
}
