<script lang="ts">
	import { capitalize } from '../util/component.ts';
	import type InputWrapperProps from './props.ts';

	let {
		size,
		disabled,
		value = $bindable(),
		hasError,
		vertical,
		class: className,
		children,
		...attributes
	}: InputWrapperProps = $props();
</script>

<div
	class={[
		'InputWrapper',
		{ hasError, disabled, vertical },
		`size${capitalize(size ?? 'md')}`,
		className
	]}
	{...attributes}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	$padding-sizes: create-size-map(
		(0.125rem 0.375rem, 0.25rem 0.75rem, 0.5rem 1rem, 0.75rem 1.5rem, 1rem 2rem)
	);

	.InputWrapper {
		position: relative;

		display: flex;
		flex-direction: row;
		align-items: center;

		gap: 0.5em;
		border-radius: var(--Button-radius);
		font-family: var(--font-body);

		color: var(--palette-foreground-level3);
		background-color: var(--palette-background-level2, transparent);
		border: solid 1px var(--palette-neutral-border, transparent);
		transition-property: color, background, border, box-shadow;
		transition-duration: 0.3s;
	}
	.disabled {
		cursor: default;
		opacity: 0.65;
		filter: grayscale(65%);
	}
	.hasError {
		color: var(--palette-danger-400);
		border: solid 1px var(--palette-danger-700);
		box-shadow: 0 0 4px var(--palette-danger-800);
	}
	.vertical {
		flex-direction: column;
	}
	.InputWrapper:not(.disabled):hover {
		background-color: var(--palette-background-level3);
	}
	@each $size, $values in $padding-sizes {
		.size#{capitalize($size)} {
			padding: $values;
			--Button-radius: var(--radius-#{$size});
		}
	}
</style>
