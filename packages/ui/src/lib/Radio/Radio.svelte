<script lang="ts">
	import { capitalize } from '../util/component.ts';
	import type RadioProps from './props.ts';

	let {
		size,
		disabled,
		class: className,
		value,
		group = $bindable(),
		...attributes
	}: RadioProps = $props();
</script>

<input
	type="radio"
	class={['Radio', { disabled }, className]}
	data-size={size ?? 'md'}
	data-disabled={disabled}
	aria-disabled={disabled}
	bind:group
	{value}
	{disabled}
	{...attributes}
/>

<style lang="scss">
	@use '../index.scss' as *;
	@use 'sass:list';
	@use '../Switch/BooleanField.scss' as *;

	.Radio {
		appearance: none;
		margin: 0;
		padding: 0;
		outline: none;

		position: relative;
		width: var(--BooleanField-size);
		height: var(--BooleanField-size);

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		border-radius: 100%;

		@extend %BooleanField;
		@extend %BooleanField-sized;

		cursor: pointer;

		&::before {
			content: '';
			transition: transform, opacity;
			transition-duration: $transition-time-md;
			opacity: 0;
			width: 50%;
			height: 50%;
			transform: scale(0);
			background-color: var(--neutral-regularFore);
			border-radius: 100%;
			box-shadow: var(--shadow-xs);
			z-index: 1;
		}
		&::after {
			position: absolute;
			content: '';
			transition: transform, opacity;
			transition-duration: $transition-time-md;
			opacity: 0;
			top: 37%;
			left: 37%;
			width: 25%;
			height: 25%;
			transform: scale(0);
			background-color: var(--primary-regularBack);
			border-radius: 100%;
			box-shadow: var(--shadow-xs);
			z-index: 2;
		}
		// States
		&:checked {
			&:not(:focus-visible, :disabled) {
				@extend %BooleanField-checked;
				&:hover,
				&:hover:active {
					@extend %BooleanField-checkedHover;
				}
			}
			&::before {
				opacity: 100%;
				transform: scale(1);
			}
		}
		&:active {
			transform: scale(0.85);
		}
		&:focus-visible {
			@extend %BooleanField-focused;
			&::after {
				opacity: 100%;
				transform: scale(1);
			}
		}
		&:not(:disabled):hover,
		&:not(:disabled):hover:active {
			@extend %BooleanField-hover;
		}
		&:disabled {
			cursor: not-allowed;
			@extend %BooleanField-disabled;
		}
	}
</style>
