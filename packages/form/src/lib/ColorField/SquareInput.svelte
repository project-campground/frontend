<script lang="ts">
	import { mouseHoldWithOverflowAction } from '@campground/ui';
	import type { SquareInputProps } from './props.ts';

	let { onChange, size }: SquareInputProps = $props();

	function onMouse(ev: MouseEvent) {
		const x = Math.max(ev.pageX - spaceRect.x, 0);
		const y = Math.max(ev.pageY - spaceRect.y, 0);

		const xPercentage = Math.min((x / spaceRect.width) * 100, 100);
		const yPercentage = Math.min((y / spaceRect.height) * 100, 100);
		return onChange(Math.round(100 - yPercentage), Math.round(xPercentage));
	}

	let space: HTMLDivElement | undefined = $state();
	const spaceRect = $derived(space?.getBoundingClientRect() ?? new DOMRect(0, 0, 1, 1));
</script>

<button
	class="input"
	data-size={size ?? 'md'}
	aria-label="color picker"
	{@attach mouseHoldWithOverflowAction(onMouse, onMouse)}
>
	<div
		class="space"
		bind:this={space}
	>
		<span class="picker"> </span>
	</div>
</button>

<style lang="scss">
	@use '@campground/ui' as *;

	$component-sizes: create-size-map((4rem, 6rem, 10rem, 12rem, 16rem));

	.input {
		margin: 0;
		padding: 0;
		outline: none;
		background-color: transparent;
		border: none;

		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;

		@each $size, $value in $component-sizes {
			&[data-size='#{$size}'] {
				min-width: $value;
				min-height: $value;
			}
		}
	}
	.space {
		border-radius: var(--radius-md);
		width: 100%;
		height: 10rem;

		pointer-events: none;
		position: relative;
		cursor: pointer;
		padding: 0;
		margin: 0;
		background-color: transparent;
		background-image:
			linear-gradient(
				to bottom in hsl,
				hsla(var(--ColorPicker-rangeHue), 100%, 0%, 0%) 0%,
				hsla(var(--ColorPicker-rangeHue), 100%, 0%, 100%) 100%
			),
			linear-gradient(
				to right in hsl,
				hsl(var(--ColorPicker-rangeHue), 100%, 100%),
				hsl(var(--ColorPicker-rangeHue), 100%, 50%)
			);
	}
	.picker {
		position: absolute;
		bottom: var(--ColorPicker-value);
		left: var(--ColorPicker-saturation);
		width: 0.5rem;
		height: 0.5rem;
		border: solid 2px var(--neutral-solidBack);
		transform: translate(-0.5rem, 0.5rem);

		background-color: rgb(var(--ColorPicker-red), var(--ColorPicker-green), var(--ColorPicker-blue));
		pointer-events: none;
		@extend %Squircle;
	}
</style>
