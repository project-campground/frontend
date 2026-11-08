<script
	lang="ts"
	generics="T"
>
	import type { ItemProps } from './props.ts';

	const { children, id }: ItemProps<T> = $props();
</script>

<div
	class="container"
	data-table-id={id}
	data-table-row="true"
>
	{@render children()}
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: contents;
		border-radius: var(--radius-md);

		@extend %Card;

		@include desktop-sm-up {
			& > :global([data-table-row]:not(:last-of-type)) > :global([data-table-cell]) {
				border-bottom: solid thin var(--neutral-border);
			}
		}

		@include tablet-down {
			display: grid;
			grid-template-columns: auto 1fr auto;
			padding: 0.5rem 1rem;
		}
	}
</style>
