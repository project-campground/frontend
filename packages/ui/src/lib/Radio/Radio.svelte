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
	class={['Radio', { disabled }, `size${capitalize(size ?? 'md')}`, className]}
	aria-disabled={disabled}
	data-shadow-reset
	bind:group
	{value}
	{disabled}
	{...attributes}
/>

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
	.Radio {
		appearance: none;

		position: relative;
		transition: transform 0.3s;
		width: var(--component-size);
		height: var(--component-size);

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		background-color: var(--palette-neutral-700);
		border: solid 2px var(--palette-neutral-600);
		border-radius: 100%;
		--component-shadowColor: var(--palette-neutral-600);
		box-shadow: var(--component-shadow) var(--component-shadowColor);

		transition: background, border, box-shadow, transform;
		transition-duration: 0.3s;

		&::after {
			content: '';
			transition: transform, opacity;
			transition-duration: 0.3s;
			opacity: 0;
			width: 50%;
			height: 50%;
			transform: scale(0);
			background-color: var(--palette-neutral-950);
			border-radius: 100%;
			box-shadow: var(--shadow-md);
		}
		&:checked::after {
			opacity: 100%;
			transform: scale(1);
		}
		// States
		&:checked {
			background-color: var(--palette-success-600);
			border: solid 2px var(--palette-success-500);
			--component-shadowColor: var(--palette-success-500);
		}
		&:active {
			transform: scale(0.85);
		}
		&:not(:disabled):hover,
		&:not(:disabled):hover:active {
			background-color: var(--palette-neutral-600);
			border: solid 2px var(--palette-neutral-500);
		}
		&:not(:disabled):checked:hover,
		&:not(:disabled):checked:hover:active {
			background-color: var(--palette-success-500);
			border: solid 2px var(--palette-success-400);
			--component-shadowColor: var(--palette-success-400);
		}
		&:disabled {
			cursor: default;
			background-color: var(--palette-neutral-800);
			border: solid 2px var(--palette-neutral-700);
			--component-shadowColor: var(--palette-neutral-700);
		}
	}
</style>
