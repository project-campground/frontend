<script
	lang="ts"
	generics="TItem extends { id: TId }, TId"
>
	import { Checkbox } from '@campground/ui';

	import Item from './Item.svelte';
	import type { RootProps } from './props.ts';
	import Cell from './Cell.svelte';
	import { getDataTable } from './context.svelte.ts';

	const { columns, unselectable }: RootProps<TItem, TId> = $props();

	const dataTable = getDataTable<TItem, TId>();
</script>

{#each dataTable.items as item (item.id)}
	<Item id={item.id}>
		{#if !unselectable}
			{const checked = $derived(dataTable.selected.includes(item.id))}
			<Cell
				index={-1}
				cardProps={{ columns: 3, rows: 1 }}
			>
				<Checkbox size="sm" {checked} onclick={() => checked ? dataTable.removeSelected(item.id) : dataTable.addSelected(item.id)} />
			</Cell>
		{/if}
		{#each columns as column, index (index)}
			<Cell
				{index}
				cardProps={column.mobile}
			>
				{#if column.Component}
					{@render column.Component?.(item)}
				{:else}
					{item[column.prop]}
				{/if}
			</Cell>
		{/each}
	</Item>
{/each}
