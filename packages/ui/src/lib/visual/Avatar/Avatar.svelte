<script lang="ts">
	import type AvatarProps from './props.ts';

	const { size, src, alt, children, ...attributes }: AvatarProps = $props();
</script>

<div
	role="img"
	aria-label={alt}
	class={['container']}
	data-size={size ?? 'md'}
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

	$sizes:
		2rem 0.75rem,
		2.5rem 1rem,
		3.5rem 1.25rem,
		5rem 1.75rem,
		7rem 2.75rem;
	$size-map: create-size-map($sizes);

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

		@each $size, $value in $size-map {
			$logo-size: list.nth($value, 1);
			$font-size: list.nth($value, 2);

			&[data-size='#{$size}'] {
				font-size: $font-size;
				--Avatar-size: #{$logo-size};
			}
		}
	}
	.image {
		@include size(var(--Avatar-size));
	}
</style>
