<script
	lang="ts"
	generics="TItem extends { id: TId; }, TId"
>
	import { Checkbox } from '@campground/ui';

	import Content from './Content.svelte';

	import type { RootProps } from './props.ts';
	import Column from './Column.svelte';
	import { DataTableState, getDataTable } from './context.svelte.ts';

	const { columns, ...props }: RootProps<TItem> = $props();

	const dataTable = getDataTable();
	const isLoading = $derived(dataTable.state !== DataTableState.Loaded);

	const allSelected = $derived(
		dataTable.items.length && dataTable.selected.length >= dataTable.items.length,
	);
	const someSelected = $derived(dataTable.selected.length);
</script>

<div
	class="container"
	style:--DataTable-columns={columns.length}
>
	<div class="header">
		<Column index={-1}>
			<Checkbox
				size="sm"
				checked={allSelected}
				indeterminate={Boolean(someSelected && !allSelected)}
				onclick={() => (allSelected ? dataTable.deselectAll() : dataTable.selectAll())}
			/>
		</Column>
		{#each columns as column, index (index)}
			<Column {index}>
				{column.header}
			</Column>
		{/each}
	</div>
	<div class="content">
		{#if isLoading}
			...
		{:else}
			<Content
				{columns}
				{...props}
			/>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		@include desktop-sm-up {
			display: grid;
			grid-template-columns: auto repeat(var(--DataTable-columns), 1fr);
			gap: 0;
			border-radius: var(--radius-md);
			overflow: hidden;
			background-color: var(--background-subtle);

			@include table-solid();
		}
	}
	.header {
		display: none;

		@include desktop-sm-up {
			display: contents;
			& > :global([data-table-column]) {
				@include table-solid-meta();
			}
		}
	}
	.content {
		display: contents;

		@include desktop-sm-up {
			& > :global([data-table-row]:nth-of-type(even)) > :global([data-table-cell]) {
				@include table-solid-even-row();
			}
		}
	}
</style>
