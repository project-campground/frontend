import { rightClickAction } from '../attachments/mouse.js';
import {
	Tooltip,
	type Menu,
	type MenuPortal,
	type MenuPortalInstance,
	type TooltipProps,
} from '#lib/floating/index.js';
import { createRawSnippet, type ComponentInternals, type Snippet } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import { v4 as uuid } from 'uuid';

export const rightClickMenu = (
	menuPortal: MenuPortal,
	menu: Snippet<[MenuPortalInstance<PointerEvent>]>,
) =>
	rightClickAction((event) => {
		menuPortal.add(
			menu as Snippet<[MenuPortalInstance]>,
			event.currentTarget as HTMLElement,
			uuid(),
			event,
		);
	});

export const rightClickMenuProps = (
	instance: MenuPortalInstance<PointerEvent>,
): Pick<Menu.RootProps<PointerEvent>, 'placement' | 'instance' | 'virtual'> => ({
	virtual: instance.payload!,
	instance,
	placement: 'bottom-start',
});

type HoverCallback = (event: MouseEvent) => unknown;

export function hoverAction<TElement extends HTMLElement>(
	onHover: (event: MouseEvent) => HoverCallback | void,
): Attachment<TElement> {
	return (element: HTMLElement) => {
		let hoverCallback: HoverCallback | null = null;

		// So they can be removed
		const mouseEnter = (ev: MouseEvent) => {
			ev.stopPropagation();
			ev.preventDefault();
			return (hoverCallback = onHover(ev) ?? null);
		};
		const mouseLeave = (ev: MouseEvent) => {
			ev.stopPropagation();
			ev.preventDefault();
			return hoverCallback?.(ev);
		};

		element.addEventListener('mouseenter', mouseEnter);
		element.addEventListener('mouseleave', mouseLeave);

		return () => (
			element.removeEventListener('mouseenter', onHover),
			element.removeEventListener('mouseleave', mouseLeave)
		);
	};
}

export function tooltip<TElement extends HTMLElement>(
	menuPortal: MenuPortal,
	value: string,
): Attachment<TElement> {
	return tooltipFromSnippet(menuPortal, ((
		$$anchor: ComponentInternals,
		instance: () => MenuPortalInstance,
	) => {
		Tooltip($$anchor, {
			get instance() {
				return instance();
			},
			children: createRawSnippet(() => ({ render: () => new Option(value).innerHTML })),
			$$slots: { default: true },
		} as unknown as TooltipProps);
	}) as unknown as Snippet<[MenuPortalInstance]>);
}

export function tooltipFromSnippet<TElement extends HTMLElement>(
	menuPortal: MenuPortal,
	tooltip: Snippet<[MenuPortalInstance]>,
): Attachment<TElement> {
	return (element: HTMLElement) => {
		let hoverCallback: HoverCallback | null = null;

		const id = uuid();
		element.setAttribute('aria-describedby', id);

		const mouseEnter = (ev: MouseEvent) => {
			ev.stopPropagation();
			ev.preventDefault();

			const instance = menuPortal.add(tooltip, ev.currentTarget as HTMLElement, id);

			// Destroy when leaving the button and it's not a tooltip
			return (hoverCallback = (leaveEvent) => {
				const attribute = (leaveEvent.relatedTarget as HTMLElement).attributes?.getNamedItem(
					'data-tooltip',
				);
				if (!attribute) instance.destroy();
			});
		};
		element.addEventListener('mouseenter', mouseEnter);

		const mouseLeave = (ev: MouseEvent) => {
			ev.stopPropagation();
			ev.preventDefault();
			return hoverCallback?.(ev);
		};
		element.addEventListener('mouseleave', mouseLeave);

		return () => (
			element.removeEventListener('mouseenter', mouseEnter),
			element.removeEventListener('mouseleave', mouseLeave)
		);
	};
}
