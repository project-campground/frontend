<script lang="ts">
	import { DataTable, type DataTableItem } from '$lib/index.js';
	import { Card, Tabs } from '@campground/ui';

	interface Item extends DataTableItem<number> {
		value: number;
		symbol: string;
		letter: string;
	}

	const a = 'A'.charCodeAt(0);
	const z = 'Z'.charCodeAt(0);

	const items = [
		...Array(400)
			.keys()
			.map(
				(x) =>
					({
						id: x,
						value: Math.floor(Math.random() * 100000),
						symbol: String.fromCharCode(Math.floor(Math.random() * 0xff) + a),
						letter: String.fromCharCode(Math.floor(Math.random() * (z - a)) + a),
					}) as Item,
			),
	];
</script>

{#snippet displayId(item: Item)}
	{item.id}
{/snippet}
{#snippet displayValue(item: Item)}
	{item.value}
{/snippet}
{#snippet displaySymbol(item: Item)}
	Symbol: {item.symbol}
{/snippet}

<Tabs.Root>
	{#snippet tabs()}
		<Tabs.Item>Data tables</Tabs.Item>
		<Tabs.Item>Data table unknown count</Tabs.Item>
	{/snippet}
	<Tabs.Tab>
		<DataTable
			total={items.length}
			entryType={{ accusative: 'the items', nominative: 'items' }}
			columns={[
				{ prop: 'id', header: 'Id', Component: displayId },
				{
					prop: 'value',
					header: 'Value',
					Component: displayValue,
					mobile: { rows: { from: 1, to: 2 }, columns: { from: 1, to: 3 } },
				},
				{ prop: 'symbol', header: 'Symbol', Component: displaySymbol },
				{ prop: 'letter', header: 'Letter' },
			]}
			fetch={(count: number, skip: number, search: string) =>
				Promise.resolve(
					items
						.filter(
							(x) =>
								!search
								|| x.letter === search
								|| x.symbol === search
								|| x.value.toString().includes(search),
						)
						.slice(skip, count + skip),
				)}
		/>
	</Tabs.Tab>
	<Tabs.Tab>
		<DataTable
			entryType={{ accusative: 'the items', nominative: 'items' }}
			columns={[
				{ prop: 'id', header: 'Id', Component: displayId },
				{
					prop: 'value',
					header: 'Value',
					Component: displayValue,
					mobile: { rows: { from: 1, to: 2 }, columns: { from: 1, to: 3 } },
				},
			]}
			fetch={(count: number, skip: number, search: string) =>
				Promise.resolve(
					items
						.filter(
							(x) =>
								!search
								|| x.letter === search
								|| x.symbol === search
								|| x.value.toString().includes(search),
						)
						.slice(skip, count + skip),
				)}
		/>
	</Tabs.Tab>
</Tabs.Root>
