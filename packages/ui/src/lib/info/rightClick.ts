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
