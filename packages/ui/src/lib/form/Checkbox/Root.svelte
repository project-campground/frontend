<script lang="ts">
	import { IconCheck, IconMinus } from '@tabler/icons-svelte';
	import type CheckboxProps from './props.ts';

	let {
		size,
		disabled,
		class: className,
		icon,
		iconIndeterminate,
		checked = $bindable(),
		indeterminate,
		...attributes
	}: CheckboxProps = $props();

	const CheckedComponent = $derived(icon ?? IconCheck);
	const IndeterminateComponent = $derived(iconIndeterminate ?? IconMinus);
</script>

<button
	class={['container', { checked, indeterminate }, className]}
	data-size={size ?? 'md'}
	role="checkbox"
	data-checked={checked}
	aria-checked={checked}
	data-indeterminate={indeterminate}
	{disabled}
	onclick={() => (checked = !checked)}
	{...attributes}
>
	{#if indeterminate}
		<IndeterminateComponent class="ui-Checkbox icon" />
	{:else}
		<CheckedComponent class="ui-Checkbox icon" />
	{/if}
</button>

<style lang="scss">
	@use '../../common.scss' as *;
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
		&.indeterminate,
		&.checked {
			--Checkbox-iconRotation: 0deg;

			// For better transitions
			& > :global(.icon) {
				opacity: 100%;
			}
		}
		&:not(:focus-visible, :disabled) {
			&.checked {
				@extend %BooleanField-checked;
			}
			&.indeterminate,
			&.indeterminate.checked {
				@extend %BooleanField-indeterminate;
			}

			&:hover {
				& {
					@extend %BooleanField-hover;
				}
				&.checked {
					@extend %BooleanField-checkedHover;
				}
				&.indeterminate,
				&.indeterminate.checked:active {
					@extend %BooleanField-indeterminateHover;
				}
			}
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
