<script lang="ts">
	import { IconCheck } from '@tabler/icons-svelte';
	import { capitalize } from '../util/component.ts';
	import type CheckboxProps from './props.ts';

	let {
		size,
		disabled,
		class: className,
		icon,
		checked = $bindable(),
		...attributes
	}: CheckboxProps = $props();

	let focused = $state(false);
	const CheckedComponent = $derived(icon ?? IconCheck);
</script>

<div
	class={[
		'Checkbox container',
		{ disabled, checked, focused },
		`size${capitalize(size ?? 'md')}`,
		className
	]}
	data-shadow-reset
>
	<CheckedComponent class="Checkbox icon" />
	<input
		bind:checked
		bind:focused
		type="checkbox"
		class={['Checkbox input']}
		{disabled}
		aria-disabled={disabled}
		{...attributes}
	/>
</div>

<style lang="scss">
	@use '../index.scss' as *;
	@use 'sass:list';

	$input-sizes: create-size-map((1rem, 1.25rem, 1.5rem, 2rem, 2.5rem));

	@each $size, $proportions in $input-sizes {
		.size#{capitalize($size)} {
			--component-size: #{$proportions};
			--component-shadow: var(--template-inset-shadow-#{$size});
		}
	}
	.container {
		position: relative;
		transition: transform $transition-time-md;
		width: var(--component-size);
		height: var(--component-size);

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		background-color: var(--palette-neutral-700);
		border: solid 2px var(--palette-neutral-600);
		border-radius: 30%;
		--component-shadowColor: var(--palette-neutral-600);
		box-shadow: var(--component-shadow) var(--component-shadowColor);

		transition: background, border, box-shadow, transform;
		transition-duration: $transition-time-md;

		// For click animations to still retain the rotation
		--component-iconRotation: 90deg;

		&.checked {
			background-color: var(--palette-success-600);
			border: solid 2px var(--palette-success-500);
			--component-shadowColor: var(--palette-success-500);

			--component-iconRotation: 0deg;

			// For better transitions
			& > :global(.icon) {
				opacity: 100%;
			}
		}
		// States
		&.focused {
			transform: scale(1.15);
			filter: brightness(1.5);
		}
		&:active {
			transform: scale(0.85);
			& > :global(.icon) {
				transform: rotateY(var(--component-iconRotation)) scaleY(0.75);
			}
		}
		&.disabled {
			background-color: var(--palette-neutral-800);
			border: solid 2px var(--palette-neutral-700);
			--component-shadowColor: var(--palette-neutral-700);
		}
		// Hover
		&:not(.disabled):hover,
		&:not(.disabled):hover:active {
			background-color: var(--palette-neutral-600);
			border: solid 2px var(--palette-neutral-500);
		}
		&:not(.disabled).checked:hover,
		&:not(.disabled).checked:hover:active {
			background-color: var(--palette-success-500);
			border: solid 2px var(--palette-success-400);
			--component-shadowColor: var(--palette-success-400);
		}
		// To not change .icon class throughout the app
		& > :global(.icon) {
			transition: opacity, transform;
			transition-duration: $transition-time-md;
			opacity: 0;
			width: 80%;
			height: 80%;
			color: var(--palette-neutral-950);
			transform: rotateY(var(--component-iconRotation));
		}
		// Browser support for better styling
		@supports (corner-shape: squircle) {
			corner-shape: squircle;
			border-radius: 100%;
		}
	}
	.input {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		border: none;
		outline: none;
		background-color: transparent;
		appearance: none;
		cursor: pointer;
		margin: 0;
		.disabled > & {
			cursor: default;
		}
	}
</style>
