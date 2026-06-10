<script lang="ts">
	import { IconCheck } from '@tabler/icons-svelte';
	import { capitalize } from '../util/component.ts';
	import type SwitchProps from './props.ts';

	let {
		size,
		disabled,
		class: className,
		checkedIcon,
		uncheckedIcon,
		value = $bindable(),
		...attributes
	}: SwitchProps = $props();
</script>

<div
	class={[
		'Checkbox container',
		{ disabled, checked: value },
		`size${capitalize(size ?? 'md')}`,
		className
	]}
>
	<IconCheck class="Checkbox icon" />
	<input
		bind:checked={value}
		type="checkbox"
		class={['Switch input']}
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
			--Checkbox-size: #{$proportions};
		}
	}
	.container {
		position: relative;
		transition: transform 0.3s;
		width: var(--Checkbox-size);
		height: var(--Checkbox-size);

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		background-color: var(--palette-neutral-700);
		border: solid 2px var(--palette-neutral-600);
		box-shadow: inset 0 0 4px var(--palette-neutral-600);
		border-radius: 30%;

		transition: background, border, box-shadow, transform;
		transition-duration: 0.3s;

		// For click animations to still retain the rotation
		--Checkbox-iconRotation: 90deg;

		@supports (corner-shape: squircle) {
			border-radius: 100%;
			corner-shape: squircle;
		}

		&.checked {
			background-color: var(--palette-success-600);
			border: solid 2px var(--palette-success-500);
			box-shadow: inset 0 0 4px var(--palette-success-500);

			--Checkbox-iconRotation: 0deg;

			// For better transitions
			& > :global(.icon) {
				opacity: 100%;
			}
		}
		// States
		&:active {
			transform: scale(0.85);
			& > :global(.icon) {
				transform: rotateY(var(--Checkbox-iconRotation)) scaleY(0.75);
			}
		}
		&:not(.disabled):hover,
		&:not(.disabled):hover:active {
			background-color: var(--palette-neutral-600);
			border: solid 2px var(--palette-neutral-500);
			box-shadow: inset 0 0 4px var(--palette-neutral-500);
		}
		&:not(.disabled).checked:hover,
		&:not(.disabled).checked:hover:active {
			background-color: var(--palette-success-500);
			border: solid 2px var(--palette-success-400);
			box-shadow: inset 0 0 4px var(--palette-success-400);
		}
		&.disabled {
			background-color: var(--palette-neutral-800);
			border: solid 2px var(--palette-neutral-700);
			box-shadow: inset 0 0 4px var(--palette-neutral-700);
		}
		// To not change .icon class throughout the app
		& > :global(.icon) {
			transition: opacity, transform;
			transition-duration: 0.3s;
			opacity: 0;
			width: 80%;
			height: 80%;
			color: var(--palette-neutral-950);
			transform: rotateY(var(--Checkbox-iconRotation));
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
