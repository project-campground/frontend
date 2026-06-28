<script lang="ts">
	import { IconCheck, IconX } from '@tabler/icons-svelte';
	import { capitalize } from '../util/component.ts';
	import type SwitchProps from './props.ts';

	let {
		size,
		disabled,
		class: className,
		checkedIcon,
		uncheckedIcon,
		inputDisabled,
		value = $bindable(false),
		...attributes
	}: SwitchProps = $props();

	const CheckedComponent = $derived(checkedIcon ?? IconCheck);
	const UncheckedComponent = $derived(uncheckedIcon ?? IconX);
</script>

<button
	class={['Switch input', { checked: value }, `size${capitalize(size ?? 'md')}`, className]}
	data-shadow-reset
	disabled={disabled ?? inputDisabled}
	aria-disabled={disabled ?? inputDisabled}
	onclick={() => (value = !value)}
	{...attributes}
>
	<div class={['Switch backgroundIcons']}>
		<CheckedComponent class="Switch icon" />
		<span class="Switch spread"></span>
		<UncheckedComponent class="Switch icon" />
	</div>
	<div class={['Switch button']}></div>
</button>

<style lang="scss">
	@use '../index.scss' as *;
	@use 'sass:list';
	@use 'sass:math' as *;
	@use './BooleanField.scss' as *;

	.input {
		position: relative;
		display: flex;
		cursor: pointer;
		align-items: center;
		flex-direction: row;
		outline: none;

		@extend %BooleanField;
		@extend %BooleanField-sized;

		width: calc(var(--BooleanField-size) * 2);
		height: var(--BooleanField-size);
		padding: 0;
		border-radius: calc(var(--BooleanField-size) * 3 / 4);

		&:not(:disabled, :focus-visible):hover,
		&:not(:disabled, :focus-visible):active:hover {
			@extend %BooleanField-hover;
		}
		&.checked:not(:disabled, :focus-visible) {
			@extend %BooleanField-checked;
		}
		&.checked:not(:disabled, :focus-visible):hover,
		&.checked:not(:disabled, :focus-visible):active:hover {
			@extend %BooleanField-checkedHover;
		}
		&:focus-visible,
		&:focus-visible:hover {
			@extend %BooleanField-focused;
		}
		&:active {
			transform: scale(0.85);
		}
		&:disabled {
			cursor: not-allowed;
			@extend %BooleanField-disabled;
		}
	}
	.backgroundIcons {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 calc(var(--BooleanField-size) / 8);
		color: var(--neutral-regularFore);
		& > :global(.Switch.icon) {
			width: 70%;
			height: 70%;
		}
	}
	.spread {
		flex: 1;
	}
	.button {
		$button-size: 0.7;
		$button-padding: 0.1;
		position: absolute;
		// Center it
		top: calc(var(--BooleanField-size) * #{div($button-size, 8)});
		left: var(--Switch-buttonX);
		height: calc(var(--BooleanField-size) * #{$button-size});
		width: calc(var(--BooleanField-size) * #{$button-size});
		border-radius: 100%;
		z-index: 1;

		background-color: var(--neutral-regularFore);
		box-shadow: var(--shadow-xs);

		--Switch-buttonX: calc(var(--BooleanField-size) * #{$button-padding});
		transition: left $transition-time-md;

		// For focus dot
		display: flex;
		align-items: center;
		justify-content: center;
		.checked & {
			--Switch-buttonX: calc(100% - var(--BooleanField-size) * (#{$button-size + $button-padding}));
		}
		&::after {
			content: '';
			background-color: transparent;
			width: 50%;
			height: 50%;
			border-radius: 100%;
			transition: background $transition-time-md;
			.input:focus-visible > & {
				background-color: var(--primary-regularBack);
			}
		}
	}
</style>
