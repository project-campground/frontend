<script lang="ts">
	import { IconCheck } from '@tabler/icons-svelte';
	import type CheckboxProps from './props.ts';

	let {
		size,
		disabled,
		class: className,
		icon,
		checked = $bindable(),
		...attributes
	}: CheckboxProps = $props();

	const CheckedComponent = $derived(icon ?? IconCheck);
</script>

<button
	class={['container', { checked }, className]}
	data-size={size ?? 'md'}
	role="checkbox"
	data-checked={checked}
	aria-checked={checked}
	{disabled}
	onclick={() => (checked = !checked)}
	{...attributes}
>
	<CheckedComponent class="ui-Checkbox icon" />
</button>

<style lang="scss">
	@use '../../index.scss' as *;
	@use 'sass:list';
	@use '../Switch/BooleanField.scss' as *;

	.container {
		position: relative;
		width: var(--BooleanField-size);
		height: var(--BooleanField-size);

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		outline: none;
		padding: 0;

		border-radius: 30%;
		cursor: pointer;

		// For click animations to still retain the rotation
		--Checkbox-iconRotation: 90deg;
		@extend %BooleanField;
		@extend %BooleanField-sized;

		// States
		&:focus-visible {
			@extend %BooleanField-focused;
		}
		&:active {
			transform: scale(0.85);
			& > :global(.icon) {
				transform: rotateY(var(--Checkbox-iconRotation)) scaleY(0.75);
			}
		}
		&:disabled {
			@extend %BooleanField-disabled;
			cursor: not-allowed;
		}
		&.checked {
			&:not(:focus-visible, :disabled) {
				@extend %BooleanField-checked;
			}

			--Checkbox-iconRotation: 0deg;

			// For better transitions
			& > :global(.icon) {
				opacity: 100%;
			}
		}
		// Hover
		&.checked:not(:disabled, :focus-visible):hover,
		&.checked:not(:disabled, :focus-visible):hover:active {
			@extend %BooleanField-checkedHover;
		}
		&:not(:disabled, :focus-visible):hover,
		&:not(:disabled, :focus-visible):hover:active {
			@extend %BooleanField-hover;
		}
		// To not change .icon class throughout the app
		& > :global(.icon) {
			transition: opacity, transform;
			transition-duration: $transition-time-md;
			opacity: 0;
			width: 90%;
			height: 90%;
			color: var(--neutral-regularFore);
			transform: rotateY(var(--Checkbox-iconRotation));
		}
		// Browser support for better styling
		@supports (corner-shape: squircle) {
			corner-shape: squircle;
			border-radius: 100%;
		}
	}
</style>
