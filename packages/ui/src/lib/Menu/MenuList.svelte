<script lang="ts" module>
	function getCoordinates(invokerRect: DOMRect, parentRect: DOMRect, menuRect: DOMRect) {
		const overflowFixes = getOverflowFixFromRect(parentRect, menuRect);

		const [top, bottom] =
			overflowFixes.vertical === 'cannot'
				? [0, 0]
				: overflowFixes.vertical === 'before'
					? [null, parentRect.height - invokerRect.top]
					: [invokerRect.top + invokerRect.height, null];
		const [left, right] =
			overflowFixes.horizontal === 'cannot'
				? [0, 0]
				: overflowFixes.horizontal === 'before'
					? [null, parentRect.width - invokerRect.left]
					: [invokerRect.left + invokerRect.width, null];

		return { top, bottom, left, right };
	}
</script>

<script lang="ts">
	import { capitalizePhrase } from '$lib/util/component.js';
	import { getOverflowFixFromRect } from '$lib/util/menu.js';
	import type { MenuListProps } from './props.ts';

	const {
		children,
		invokerRect,
		placement,
		class: className,
		...attributes
	}: MenuListProps = $props();

	let menu: HTMLMenuElement | undefined = $state();

	let parentRect = $derived(menu?.parentElement?.getBoundingClientRect() ?? DOMRect.fromRect());
	// Invoke once
	let rect = $derived(menu?.getBoundingClientRect() ?? DOMRect.fromRect());
	let coordinates = $derived(invokerRect && getCoordinates(invokerRect, parentRect, rect));
</script>

<menu
	bind:this={menu}
	class={[
		'Menu MenuList',
		{ floating: !!invokerRect },
		`placement${capitalizePhrase(placement ?? 'bottom')}`,
		className
	]}
	style={coordinates
		? Object.entries(coordinates)
				.filter(([_, value]) => value !== null)
				.map(([key, value]) => `${key}:${value}px`)
				.join(';')
		: ''}
	{...attributes}
>
	{@render children?.()}
</menu>

<style lang="scss">
	@use '../index.scss' as *;

	.MenuList {
		background-color: var(--background-content);
		border: solid 1px var(--neutral-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);

		padding: 0.5rem;
		list-style: none;
		margin: 0;
		overflow: auto;
	}
	.floating {
		position: absolute;
		width: max-content;
		height: max-content;
	}
</style>
