import type { Attachment } from 'svelte/attachments';

export const rightClickAction: <T extends HTMLElement>(
	action: (event: PointerEvent) => unknown,
) => Attachment<T> = (onRightClick) => (element: HTMLElement) => {
	element.addEventListener('contextmenu', (ev) => {
		ev.preventDefault();
		return onRightClick(ev);
	});

	return () => element.removeEventListener('contextmenu', onRightClick);
};

export function mouseHoldAction<
	TElement extends HTMLElement,
	TEvent extends MouseEvent = MouseEvent,
>(
	onMouseHolding: (ev: TEvent) => unknown,
	onMouseDown?: (ev: TEvent) => unknown,
	onMouseUp?: (ev: TEvent) => unknown,
): Attachment<TElement> {
	return (element: TElement) => {
		let beingDragged = false;

		const onMouseMoveFn = (ev: MouseEvent) => {
			if (!beingDragged) return;

			return onMouseHolding(ev as TEvent);
		};
		const onMouseUpFn = (ev: MouseEvent) => {
			beingDragged = false;
			return onMouseUp?.(ev as TEvent);
		};
		const onMouseDownFn = (ev: MouseEvent) => {
			beingDragged = true;
			return onMouseDown?.(ev as TEvent);
		};

		element.addEventListener('mousemove', onMouseMoveFn);
		element.addEventListener('mouseup', onMouseUpFn);
		element.addEventListener('mousedown', onMouseDownFn);
		element.addEventListener('mouseleave', onMouseUpFn);

		return () => {
			element.removeEventListener('mousemove', onMouseMoveFn);
			element.removeEventListener('mouseup', onMouseUpFn);
			element.removeEventListener('mouseleave', onMouseUpFn);
			element.removeEventListener('mousedown', onMouseDownFn);
		};
	};
}

export function mouseHoldWithOverflowAction<
	TElement extends HTMLElement,
	TEvent extends MouseEvent = MouseEvent,
>(
	onMouseHolding: (ev: TEvent) => unknown,
	onMouseDown?: (ev: MouseEvent) => unknown,
	onMouseUp?: (ev: MouseEvent) => unknown,
): Attachment<TElement> {
	return (element: TElement) => {
		let beingDragged = false;

		const onMouseMoveFn = (ev: MouseEvent) => {
			if (!beingDragged) return;

			return onMouseHolding(ev as TEvent);
		};
		const onMouseUpFn = (ev: MouseEvent) => {
			beingDragged = false;
			return onMouseUp?.(ev);
		};
		const onMouseDownFn = (ev: MouseEvent) => {
			beingDragged = true;
			return onMouseDown?.(ev);
		};

		document.addEventListener('mousemove', onMouseMoveFn);
		document.addEventListener('mouseup', onMouseUpFn);
		element.addEventListener('mousedown', onMouseDownFn);

		return () => {
			document.removeEventListener('mousemove', onMouseMoveFn);
			document.removeEventListener('mouseup', onMouseUpFn);
			element.removeEventListener('mousedown', onMouseDownFn);
		};
	};
}
