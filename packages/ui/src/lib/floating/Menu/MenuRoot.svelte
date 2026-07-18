<script lang="ts">
	import { autoPlacement, autoUpdate, type Middleware } from '@floating-ui/dom';
	import type { RootProps } from './props.ts';
	import { computePosition, offset } from '@floating-ui/dom';

	const {
		children,
		class: className,
		instance,
		offset: offsetProp,
		autoPlacement: autoPlacementProp,
		placement,
		...attributes
	}: RootProps = $props();

	let menuFloating: HTMLElement | null = $state(null);
	let pos: { x: number; y: number } = $state.raw({ x: 0, y: 0 });

	$effect(() => {
		if (!menuFloating) return;

		return autoUpdate(instance.invoker, menuFloating, async () =>
			computePosition(instance.invoker, menuFloating!, {
				placement,
				middleware: [
					offsetProp && offset(offsetProp),
					autoPlacementProp && autoPlacement(autoPlacementProp),
				].filter((x) => x) as Middleware[],
			}).then((newPos) => (pos = newPos)),
		);
	});
</script>

<div
	class={['wrapper', className]}
	{...attributes}
	style:--Menu-x={`${pos.x}px`}
	style:--Menu-y={`${pos.y}px`}
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
	@use '../../index.scss' as *;

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
		width: 100%;
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
			height: max-content;
			width: max-content;
			top: var(--Menu-y);
			left: var(--Menu-x);
		}
	}
</style>
