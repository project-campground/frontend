<script lang="ts">
	import type { ListProps } from './props.ts';

	const { children, class: className, size, ...attributes }: ListProps = $props();
</script>

<menu
	class={['list', className]}
	data-size={size ?? 'md'}
	{...attributes}
>
	<header class="touchPlace">
		<hr class="touchPlaceDivider" />
	</header>
	{@render children?.()}
</menu>

<style lang="scss">
	@use '../../common.scss' as *;

	.touchPlace {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
	}
	.touchPlaceDivider {
		width: 10%;
		border: none;
		height: 0.25rem;
		background-color: var(--foreground-background);
		border-radius: var(--radius-md);
	}
	@include desktop-sm-up {
		.touchPlace {
			display: none;
		}
	}
	.list {
		box-sizing: border-box;

		background-color: var(--background-content);
		border: solid 1px var(--neutral-border);

		@each $size in $size-names-with-xl {
			&[data-size='#{$size}'] {
				@include desktop-sm-up {
					border-radius: var(--radius-#{$size});
				}

				border-top-left-radius: var(--radius-#{$size});
				border-top-right-radius: var(--radius-#{$size});
				box-shadow: var(--shadow-#{$size});
			}
		}

		padding: 0.5rem;
		list-style: none;
		margin: 0;
		overflow: auto;
	}
</style>
