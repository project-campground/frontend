<script lang="ts">
	import { getPickContext } from './context.svelte.ts';
	import type { ListProps } from './props.js';

	const { children, size }: ListProps = $props();

	const pickContext = getPickContext();
</script>

<div
	class={['container']}
	data-size={size ?? 'md'}
	data-active-item={pickContext.activeItemIndex}
	data-item-count={pickContext.itemCount}
>
	<form
		class="root"
		bind:this={pickContext.itemsForm}
	>
		<div class="highlight"></div>
		<div class="list">
			{@render children()}
		</div>
	</form>
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	$pick-sizes: create-size-map((1.5rem, 1.8rem, 2.25rem, 2.75rem, 3.5rem));

	.container {
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		background-color: var(--background-body);
		transition: background $transition-time-lg;
		box-sizing: border-box;

		@each $size, $value in $pick-sizes {
			&[data-size='#{$size}'] {
				padding: calc($value * 0.125) calc($value * 0.25);
				border-radius: var(--radius-#{$size});
				box-shadow: var(--inset-shadow-#{$size});
				.highlight {
					border-radius: var(--radius-#{$size});
					box-shadow: var(--shadow-#{$size});
				}
				.list {
					height: $value;
				}
			}
		}
	}
	.root {
		position: relative;
		width: 100%;
		z-index: 0;
	}
	.highlight {
		position: absolute;
		z-index: 1;

		background-color: var(--background-content);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-sm);

		width: calc(100% / var(--Pick-count));
		top: 0;
		bottom: 0;
		left: calc((100% / var(--Pick-count)) * var(--Pick-activeIndex));
		height: 100%;
		transition: left, background;
		transition-duration: $transition-time-lg;
	}
	.list {
		position: relative;
		display: flex;

		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
	}
</style>
