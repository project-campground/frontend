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
	<div class={['Switch display']}>
		<div class={['Switch backgroundIcons']}>
			<CheckedComponent class="Switch icon" />
			<span class="Switch spread"></span>
			<UncheckedComponent class="Switch icon" />
		</div>
		<div class={['Switch button']}></div>
	</div>
	<input bind:checked={value} type="checkbox" class={['Switch input']} {disabled} {...attributes} />
</div>

<style lang="scss">
	@use '../index.scss' as *;
	@use 'sass:list';

	$input-sizes: create-size-map((1.25rem, 1.5rem, 1.75rem, 2.25rem, 3.5rem));

	@each $size, $proportions in $input-sizes {
		.size#{capitalize($size)} {
			--Switch-width: calc(#{calc($proportions * 2)});
			& > .display {
				// -0.25 due to padding on both sides
				width: calc($proportions * 7 / 4);
				height: calc($proportions * 3 / 4);
				padding: calc($proportions / 8) calc($proportions / 8);
				border-radius: calc($proportions * 3 / 4);
			}
			.button {
				width: calc($proportions * 0.75);
			}
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
		padding: 0;
	}
	.display {
		position: relative;
		display: flex;
		pointer-events: none;

		background-color: var(--palette-danger-700);
		border: solid 2px var(--palette-danger-600);
		box-shadow: inset 0 0 4px var(--palette-danger-600);

		transition: background, border, box-shadow;
		transition-duration: 0.3s;
		.checked & {
			background-color: var(--palette-success-600);
			border: solid 2px var(--palette-success-500);
			box-shadow: inset 0 0 4px var(--palette-success-500);
		}
	}
	@keyframes bubble {
		100% {
			transform: scaleY(1);
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
		padding: calc(var(--Switch-width) / 8);
		color: var(--palette-neutral-950);
		& > :global(.Switch.icon) {
			width: calc(var(--Switch-width) / 4);
			height: calc(var(--Switch-width) / 4);
		}
	}
	.spread {
		flex: 1;
	}
	.button {
		display: inline-block;
		height: calc(100% - 2px);
		border-radius: 100%;
		z-index: 1;

		background-color: var(--palette-neutral-950);
		box-shadow: var(--shadow-sm);

		--Switch-buttonX: 0;
		transform: translateX(var(--Switch-buttonX)) scaleY(1);
		transition: transform 0.3s;
		.checked & {
			--Switch-buttonX: calc(var(--Switch-width) / 2);
		}
	}
	.container:active {
		transform: scale(0.85);
		.button {
			transform: translateX(var(--Switch-buttonX)) scaleY(0.75);
		}
	}
</style>
