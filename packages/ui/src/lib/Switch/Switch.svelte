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
		value = $bindable(),
		...attributes
	}: SwitchProps = $props();

	const CheckedComponent = $derived(checkedIcon ?? IconCheck);
	const UncheckedComponent = $derived(uncheckedIcon ?? IconX);
</script>

<div
	class={[
		'Switch container',
		{ disabled, checked: value },
		`size${capitalize(size ?? 'md')}`,
		className
	]}
>
	<div class={['Switch display']} aria-hidden="true" data-shadow-reset>
		<div class={['Switch backgroundIcons']}>
			<CheckedComponent class="Switch icon" />
			<span class="Switch spread"></span>
			<UncheckedComponent class="Switch icon" />
		</div>
		<div class={['Switch button']}></div>
	</div>
	<input
		bind:checked={value}
		type="checkbox"
		class={['Switch input']}
		disabled={disabled ?? inputDisabled}
		aria-disabled={disabled ?? inputDisabled}
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
		transition: transform 0.3s;
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
	.display {
		position: relative;
		display: flex;
		pointer-events: none;

		background-color: var(--palette-danger-700);
		border: solid 2px var(--palette-danger-600);
		--component-shadowColor: var(--palette-danger-600);
		box-shadow: var(--component-shadow) var(--component-shadowColor);

		transition: background, border, box-shadow;
		transition-duration: 0.3s;
		// -0.25 due to padding on both sides
		width: calc(var(--component-size) * 7 / 4);
		height: calc(var(--component-size) * 3 / 4);
		padding: calc(var(--component-size) / 8) calc(var(--component-size) / 8);
		border-radius: calc(var(--component-size) * 3 / 4);

		.container:not(.disabled):hover > &,
		.container:not(.disabled):active:hover > & {
			background-color: var(--palette-danger-600);
			border: solid 2px var(--palette-danger-500);
			box-shadow: inset 0 0 4px var(--palette-danger-500);
		}
		.checked:not(.disabled) & {
			background-color: var(--palette-success-600);
			border: solid 2px var(--palette-success-500);
			box-shadow: inset 0 0 4px var(--palette-success-500);
		}
		.checked:not(.disabled):hover > &,
		.checked:not(.disabled):active:hover > & {
			background-color: var(--palette-success-500);
			border: solid 2px var(--palette-success-400);
			box-shadow: inset 0 0 4px var(--palette-success-400);
		}
	}
	.disabled > .display {
		background-color: var(--palette-neutral-800);
		border: solid 2px var(--palette-neutral-700);
		box-shadow: inset 0 0 4px var(--palette-neutral-700);
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
		padding: 0 calc(var(--component-size) / 8);
		color: var(--palette-neutral-950);
		& > :global(.Switch.icon) {
			width: 70%;
			height: 70%;
		}
	}
	.spread {
		flex: 1;
	}
	.button {
		display: inline-block;
		height: 100%;
		border-radius: 100%;
		z-index: 1;
		width: calc(var(--component-size) * 0.75);

		background-color: var(--palette-neutral-950);
		box-shadow: var(--shadow-sm);

		--component-buttonX: 0;
		transform: translateX(var(--component-buttonX)) scaleY(1);
		transition: transform 0.3s;
		.checked & {
			--component-buttonX: var(--component-size);
		}
	}
	.container:active {
		transform: scale(0.85);
		:global(.icon) {
			transform: scaleY(0.95);
		}
		.button {
			transform: translateX(var(--component-buttonX)) scaleY(0.75);
		}
	}
</style>
