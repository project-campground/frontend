<script lang="ts">
	import type AvatarProps from './props.ts';

	const { size, src, alt, color, children, ...attributes }: AvatarProps = $props();
</script>

<div
	role="img"
	aria-label={alt}
	class={['container']}
	data-size={size ?? 'md'}
	data-color={color ?? 'neutral'}
>
	{#if src}
		<img
			class="image"
			{src}
			{alt}
			{...attributes}
		/>
	{:else}
		{@render children?.()}
	{/if}
</div>

<style lang="scss">
	@use 'sass:list';
	@use '../../common.scss' as *;
	@use './Avatar.scss' as *;

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		overflow: hidden;

		@include size(var(--Avatar-size));
		background-color: var(--neutral-solidBack);

		font-weight: 700;
		font-family: var(--font-display);

		@extend %Squircle;

		@each $size, $logo-size in $avatar-size-map {
			&[data-size='#{$size}'] {
				font-size: calc($logo-size * 0.4);
				--Avatar-size: #{$logo-size};
			}
		}
		@each $color in $generic-color-types {
			&[data-color='#{$color}'] {
				background: linear-gradient(to bottom right, var(--#{$color}), var(--#{$color}-alt));
			}
		}
	}
	.image {
		@include size(var(--Avatar-size));
	}
</style>
