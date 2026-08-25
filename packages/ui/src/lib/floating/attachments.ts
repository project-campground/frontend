import type { MenuPortal, MenuPortalInstance } from '$lib/floating/index.js';
import type { Snippet } from 'svelte';
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

export const rightClickMenu = (menuPortal: MenuPortal, menu: Snippet<[MenuPortalInstance]>) =>
	rightClickAction((event) => {
		menuPortal.add(menu, event.currentTarget as HTMLElement);
	});

type HoverCallback = (event: MouseEvent) => unknown;

export function hoverAction<TElement extends HTMLElement>(
	onHover: (event: MouseEvent) => HoverCallback | void,
): Attachment<TElement> {
	return (element: HTMLElement) => {
		let hoverCallback: HoverCallback | null = null;

		element.addEventListener('mouseenter', (ev) => {
			ev.stopPropagation();
			ev.preventDefault();
			return (hoverCallback = onHover(ev) ?? null);
		});

		const mouseLeave = (ev: MouseEvent) => {
			ev.stopPropagation();
			ev.preventDefault();
			return hoverCallback?.(ev);
		};
		element.addEventListener('mouseleave', mouseLeave);

		return () => (
			element.removeEventListener('mouseenter', onHover),
			element.removeEventListener('mouseleave', mouseLeave)
		);
	};
}

export const tooltip = (menuPortal: MenuPortal, tooltip: Snippet<[MenuPortalInstance]>) =>
	hoverAction((event) => {
		const instance = menuPortal.add(tooltip, event.currentTarget as HTMLElement);

		// Destroy when leaving the button and it's not a tooltip
		return (leaveEvent) => {
			const attribute = (leaveEvent.relatedTarget as HTMLElement).attributes?.getNamedItem(
				'data-tooltip',
			);
			if (!attribute) instance.destroy();
		};
	});
