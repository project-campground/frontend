<script lang="ts">
	import type { RootProps } from './props.ts';

	const { children, parent, reverse, size }: RootProps = $props();
</script>

<div
	class={['container', { reverse }]}
	data-size={size ?? 'md'}
>
	<div class="parent">
		{@render parent()}
	</div>
	<div class="items">
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	$threaded-sizes: 0.75rem, 1.25rem, 2rem, 3rem, 4rem;
	$threaded-sizes-map: create-size-map($threaded-sizes);

	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		--ThreadedRoot-padding: 2rem;
		--ThreadedRoot-width: 3rem;
		--ThreadedRoot-radius: 3rem;

		&.reverse {
			flex-direction: column-reverse;
		}
		@each $size, $value in $threaded-sizes-map {
			&[data-size='#{$size}'] {
				--ThreadedRoot-padding: #{$value};
				--ThreadedRoot-width: #{calc($value * 1.5)};
				--ThreadedRoot-radius: var(--radius-#{$size});
			}
		}
	}
	.items {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
</style>
