<script lang="ts">
	import type { RootProps } from './props.ts';

	const { children, size, color }: RootProps = $props();
</script>

<span
	data-size={size ?? 'md'}
	data-color={color ?? 'primary'}
>
	{@render children?.()}
</span>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../Avatar/Avatar.scss' as *;

	$component-sizes: create-size-map((1.25rem, 1.5rem, 2rem, 2.5rem, 3rem, 4rem));

	span {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		line-height: 0;

		@extend %Squircle;

		@each $size, $value in $component-sizes {
			&[data-size='#{$size}'] {
				width: $value;
				height: $value;
			}
		}
		@each $color in $color-types {
			&[data-color='#{$color}'] {
				background: linear-gradient(
					to bottom right,
					var(--#{$color}-glowFirst),
					var(--#{$color}-glowSecond)
				);
				box-shadow: var(--glow-sm) var(--#{$color}-glowFirst);
				color: var(--#{$color}-glowFore);
			}
		}
	}
</style>
