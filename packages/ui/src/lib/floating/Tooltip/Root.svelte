<script lang="ts">
	import { arrow, autoUpdate, flip, size, type Middleware } from '@floating-ui/dom';
	import type { TooltipProps } from './props.ts';
	import { computePosition } from '@floating-ui/dom';
	import { rem } from '$lib/util/component.js';
	import type { ComputePositionReturn } from '@floating-ui/dom';
	import { fade, scale } from 'svelte/transition';

	const {
		children,
		class: className,
		instance,
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
	}: TooltipProps = $props();

	let arrowEl: HTMLElement | null = $state(null);
	let menuFloating: HTMLElement | null = $state(null);

	let pos: ComputePositionReturn = $state.raw({
		x: 0,
		y: 0,
		middlewareData: { arrow: { centerOffset: 0 } },
		placement: 'bottom',
		strategy: 'absolute',
	});

	$effect(() => {
		if (!(menuFloating && arrowEl)) return;

		return autoUpdate(instance.invoker, menuFloating, async () =>
			computePosition(instance.invoker, menuFloating!, {
				placement,
				middleware: [
					flip(),
					arrow({ element: arrowEl! }),
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
	bind:this={menuFloating}
	class={['container', className]}
	// Styles
	style:--Tooltip-x={`${pos.x}px`}
	style:--Tooltip-y={`${pos.y}px`}
	style:--Tooltip-arrowX={pos.middlewareData?.arrow?.x !== null ?
		`${pos.middlewareData.arrow!.x}px`
	:	null}
	style:--Tooltip-arrowY={pos.middlewareData?.arrow?.y !== null ?
		`${pos.middlewareData.arrow!.y}px`
	:	null}
	style:--Tooltip-maxWidth={rem(maxw) ?? 'auto'}
	style:--Tooltip-maxHeight={rem(maxh) ?? 'auto'}
	style:--Tooltip-minWidth={rem(minw) ?? 'auto'}
	style:--Tooltip-minHeight={rem(minh) ?? 'auto'}
	style:--Tooltip-width={rem(w) ?? 'fit-content'}
	style:--Tooltip-height={rem(h) ?? 'auto'}
	{...attributes}
	// Attributes
	data-placement={pos.placement.split('-')[0]}
	data-tooltip
	aria-hidden="true"
	// ARIA
	role="tooltip"
	id={instance.key}
	// Transitions
	in:scale={{ duration: 150 }}
	out:fade={{ duration: 150 }}
	// Events
	onmouseleave={() => instance.destroy()}
>
	<span
		data-tooltip
		class="arrow"
		bind:this={arrowEl}
	></span>
	<div
		class="floating"
		data-tooltip
	>
		<div class="content">
			{@render children?.()}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	.container {
		position: absolute;
		display: flex;
		flex-direction: column;
		width: fit-content;
		height: fit-content;

		top: var(--Tooltip-y);
		left: var(--Tooltip-x);
		filter: drop-shadow(var(--shadow-md));

		&[data-placement='bottom'] {
			padding-top: 0.25rem;
			flex-direction: column;
		}
		&[data-placement='top'] {
			padding-bottom: 0.25rem;
			flex-direction: column-reverse;
		}
		&[data-placement='left'] {
			padding-right: 0.25rem;
			flex-direction: row-reverse;
		}
		&[data-placement='right'] {
			padding-left: 0.25rem;
			flex-direction: row;
		}
	}
	.floating {
		display: flex;
		flex-direction: column;

		min-height: var(--Tooltip-minHeight);
		min-width: var(--Tooltip-minWidth);
		max-height: var(--Tooltip-maxHeight);
		max-width: var(--Tooltip-maxWidth);
		height: var(--Tooltip-height);
		width: var(--Tooltip-width);

		background-color: var(--background-tooltip);
		border: solid 2px var(--border-tooltip);

		border-radius: var(--radius-md);
		padding: 0.5rem 1rem;
		box-sizing: border-box;
	}
	.content {
		z-index: 3;
		font-size: 0.9rem;
	}
	.arrow {
		margin-top: var(--Tooltip-arrowY);
		margin-left: var(--Tooltip-arrowX);

		background-color: var(--background-tooltip);
		border-color: var(--border-tooltip);
		border-width: 2px;

		width: 1rem;
		height: 1rem;
		transform: rotate(45deg);

		.container[data-placement='bottom'] & {
			margin-bottom: calc(-0.5rem - 1px);
			border-top-style: solid;
			border-left-style: solid;
		}
		.container[data-placement='top'] & {
			margin-top: calc(-0.5rem - 1px);
			border-bottom-style: solid;
			border-right-style: solid;
		}
		.container[data-placement='left'] & {
			margin-left: calc(-0.5rem - 1px);
			border-right-style: solid;
			border-top-style: solid;
		}
		.container[data-placement='right'] & {
			margin-right: calc(-0.5rem - 1px);
			border-left-style: solid;
			border-bottom-style: solid;
		}
	}
</style>
