<script lang="ts">
	import { capitalize } from '../util/component.ts';
	import type LinkProps from './props.ts';

	const { children, color, underlined, ...attributes }: LinkProps = $props();
</script>

<a
	{...attributes}
	class={[
		'Link',
		`color${capitalize(color ?? 'primary')}`,
		{ underlined }
	]}
>
	{@render children()}
</a>

<style lang="scss">
	@use '../index.scss' as *;

	.Link {
		display: inline-flex;
		text-decoration: none;
		flex-direction: row;
		align-items: center;
		gap: 1ex;
		border-bottom: solid 1px transparent;
		transition-property: border-bottom-color, color, transform;
		transition-duration: 0.2s;
		@include button-transform();
		&:disabled {
			cursor: default;
			opacity: 0.65;
			filter: grayscale(65%);
		}
		@each $col in $color-types-all {
			&.color#{capitalize($col)} {
				color: var(--palette-#{$col}-plainFore);
				&:not(:disabled):hover {
					color: var(--palette-#{$col}-plainForeHover);
					border-bottom-color: var(--palette-#{$col}-plainForeHover);
				}
				&.underlined {
					border-bottom-color: var(--palette-#{$col}-plainFore);
				}
				&:not(:disabled):active {
					color: var(--palette-#{$col}-plainForeActive);
					border-bottom-color: var(--palette-#{$col}-plainForeActive);
				}
			}
		}
	}
</style>
