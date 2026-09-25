<script lang="ts">
	import type { CellProps } from './props.ts';

	const { index, children }: CellProps = $props();
</script>

<span data-table-column={index}>
	{@render children()}
</span>

<style lang="scss">
	span {
		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0.5rem 0.25rem;
		padding-top: 1rem;

		&:first-of-type {
			padding-left: 2rem;
		}
		&:last-of-type {
			padding-right: 2rem;
		}
	}
</style>
