<script
	lang="ts"
	generics="T extends Event = Event"
>
	import {
		autoPlacement,
		autoUpdate,
		size,
		type Middleware,
		type ReferenceElement,
	} from '@floating-ui/dom';
	import type { RootProps } from './props.ts';
	import { computePosition, offset } from '@floating-ui/dom';
	import { rem } from '$lib/util/component.js';

	const {
		children,
		class: className,
		// Relations
		instance,
		virtual,
		// Middleware
		offset: offsetProp,
		autoPlacement: autoPlacementProp,
		placement,
		// Sizing
		w,
		h,
		maxw,
		maxh,
		minw,
		minh,
		// Rest
		...attributes
	}: RootProps<T> = $props();

	let menuFloating: HTMLElement | null = $state(null);
	let pos: { x: number; y: number } = $state.raw({ x: 0, y: 0 });

	$effect(() => {
		if (!menuFloating) return;

		// For right click events and such to display menus in accurate places
		const virtualOrInvoker: ReferenceElement =
			virtual ?
				{
					getBoundingClientRect() {
						return {
							height: virtual.height ?? 1,
							width: virtual.width ?? 1,
							x: virtual.x,
							y: virtual.y,
							top: virtual.y,
							bottom: virtual.y,
							left: virtual.x,
							right: virtual.x,
						} satisfies Omit<DOMRect, 'toJSON'>;
					},
					contextElement: instance.invoker,
				}
			:	instance.invoker;

		return autoUpdate(virtualOrInvoker, menuFloating, async () =>
			computePosition(virtualOrInvoker, menuFloating!, {
				placement,
				middleware: [
					// Optional stuff that are set by props
					offsetProp && offset(offsetProp),
					autoPlacementProp && autoPlacement(autoPlacementProp),
					// Non-optional forced
					size({
						apply: ({ availableHeight, availableWidth, elements }) => {
							Object.assign(elements.floating.style, {
								maxWidth: `${Math.max(0, availableWidth)}px`,
								maxHeight: `${Math.max(0, availableHeight)}px`,
							});
						},
					}),
				].filter((x) => x) as Middleware[],
			}).then((newPos) => (pos = newPos)),
		);
	});
</script>

<div
	class={['wrapper', className]}
	{...attributes}
	// For correct positioning. Not used by this element, but elements below.
	style:--Menu-x={`${pos.x}px`}
	style:--Menu-y={`${pos.y}px`}
	style:--Menu-maxWidth={rem(maxw) ?? 'auto'}
	style:--Menu-maxHeight={rem(maxh) ?? 'auto'}
	style:--Menu-minWidth={rem(minw) ?? 'auto'}
	style:--Menu-minHeight={rem(minh) ?? 'auto'}
	style:--Menu-width={rem(w) ?? 'fit-content'}
	style:--Menu-height={rem(h) ?? 'auto'}
	// Since this basically is displayed over the whole screen
	onclick={(ev) => (ev.stopPropagation(), instance.destroy())}
	// < 0, because of column-reverse
	onscrollend={(ev) => (ev.currentTarget.scrollTop < 0 ? instance.destroy() : null)}
>
	<div
		bind:this={menuFloating}
		class="floating"
	>
		{@render children?.()}
	</div>
	<div class="mobileScrollableClose"></div>
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	.wrapper {
		display: flex;
		flex-direction: column-reverse;

		overscroll-behavior-y: none;
		width: 100%;
		height: 100%;

		overflow-y: auto;
		scroll-snap-type: y mandatory;
		scrollbar-color: transparent transparent;

		transition: background $transition-time-md;
		background-color: var(--background-overlay);
	}
	.floating {
		display: flex;
		flex-direction: column;
		height: max-content;

		scroll-snap-align: start;
		scroll-snap-stop: always;
		pointer-events: all;
	}
	.mobileScrollableClose {
		flex-grow: 1.1;
		flex-shrink: 0;
		flex-basis: 100%;
		scroll-snap-stop: always;
		scroll-snap-align: start;
		height: 100%;
	}
	@include desktop-sm-up {
		.mobileScrollableClose {
			display: none;
		}
		.wrapper {
			position: relative;
			height: 100%;
			background-color: transparent;
		}
		.floating {
			position: absolute;

			min-height: var(--Menu-minHeight);
			min-width: var(--Menu-minWidth);
			max-height: var(--Menu-maxHeight);
			max-width: var(--Menu-maxWidth);
			height: var(--Menu-height);
			width: var(--Menu-width);

			top: var(--Menu-y);
			left: var(--Menu-x);
		}
	}
</style>
