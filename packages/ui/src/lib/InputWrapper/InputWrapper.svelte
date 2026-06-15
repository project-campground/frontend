<script lang="ts">
	import { capitalize } from '../util/component.ts';
	import type InputWrapperProps from './props.ts';

	let {
		size,
		disabled,
		focused,
		hasError,
		vertical,
		cursor,
		class: className,
		value = $bindable(),
		children,
		...attributes
	}: InputWrapperProps = $props();
</script>

<button
	class={[
		'InputWrapper',
		{ hasError, disabled, vertical, focused },
		`size${capitalize(size ?? 'md')}`,
		cursor && `cursor${capitalize(cursor)}`,
		className
	]}
	{disabled}
	{...attributes}
>
	{@render children()}
</button>

<style lang="scss">
	@use '../index.scss' as *;
	@use 'sass:list';

	$padding-sizes: create-size-map(
		(0rem 0.375rem, 0.25rem 0.75rem, 0.5rem 1rem, 0.75rem 1.5rem, 1rem 2rem)
	);

	.InputWrapper {
		position: relative;

		display: flex;
		flex-direction: row;
		align-items: center;

		border-radius: var(--component-radius);

		color: var(--palette-foreground-level2);
		background-color: var(--palette-background-level2, transparent);
		border: solid 1px var(--palette-neutral-border, transparent);
		box-shadow: var(--component-shadow);

		outline: none;
		transition-property: color, background, border, box-shadow;
		transition-duration: $transition-time-md;

		font-size: 1em;
		font-family: var(--font-body);
	}
	.disabled {
		cursor: default;
		opacity: 0.65;
		filter: grayscale(65%);
	}
	.hasError {
		color: var(--palette-danger-400);
		border: solid 1px var(--palette-danger-600);
		box-shadow: inset 0 0 8px var(--palette-danger-800);
	}
	.focused,
	.InputWrapper:focus-visible {
		border: solid 1px var(--palette-primary-400);
		box-shadow:
			var(--component-shadow),
			inset 0 0 8px var(--palette-primary-700);
	}
	.vertical {
		flex-direction: column;
	}
	.InputWrapper:not(.disabled):hover {
		background-color: var(--palette-background-level3);
	}
	.cursorPointer {
		cursor: pointer;
	}
	.cursorText {
		cursor: text;
	}
	@each $size, $values in $padding-sizes {
		.size#{capitalize($size)} {
			padding: $values;
			gap: list.nth($values, 1);
			--component-shadow: var(--shadow-#{$size});
			--component-radius: var(--radius-#{$size});
		}
	}
</style>
