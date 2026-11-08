<script lang="ts">
	import type { RootProps } from './props.ts';

	const { children, size, color, ...attributes }: RootProps = $props();
</script>

<span
	data-size={size ?? 'md'}
	data-color={color ?? 'neutral'}
	{...attributes}
>
	{@render children()}
</span>

<style lang="scss">
	@use '../../common.scss' as *;
	@use 'sass:list';

	$component-sizes: create-size-map(
		(0.125rem md, 0.25rem lg, 0.375rem xl, 0.5rem xxl, 0.75rem xxxl, 1rem xxxxl)
	);

	span {
		font-size: 0.9em;
		font-weight: 700;
		@each $size, $value in $component-sizes {
			$radius-size: list.nth($value, 2);
			$padding-size: list.nth($value, 1);
			&[data-size='#{$size}'] {
				padding: $padding-size calc($padding-size * 3);
				border-radius: var(--radius-#{$radius-size});
			}
		}
		@each $color in $color-types-all {
			&[data-color='#{$color}'] {
				background-color: var(--#{$color}-softBack);
				color: var(--#{$color}-softFore);
			}
		}
	}
</style>
