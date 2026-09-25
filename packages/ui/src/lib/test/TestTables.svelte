<script lang="ts">
	import { Section, Stack, Table } from '$lib/index.js';
	import { sizes } from './values.ts';
</script>

{#snippet thead(header: string, count: number)}
	<thead>
		<tr>
			{#each Array(count).keys() as i (i)}
				<th>
					{header}
					{i}
				</th>
			{/each}
		</tr>
	</thead>
{/snippet}
{#snippet tbody(columns: number, rows: number)}
	<tbody>
		{#each Array(rows).keys() as i (i)}
			<tr>
				{#each Array(columns).keys() as j (j)}
					<td>
						{i}.{j}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
{/snippet}
{#snippet tfooter(count: number)}
	<tfoot>
		<tr>
			{#each Array(count).keys() as i (i)}
				<td>
					Footer {i}
				</td>
			{/each}
		</tr>
	</tfoot>
{/snippet}

<Section headerLevel={1}>
	{#snippet header()}
		Tables
	{/snippet}
	<Stack gap={5}>
		{#each ['solid', 'outlined'] as const as variant (variant)}
			<Section headerLevel={2}>
				{#snippet header()}
					{variant}
				{/snippet}
				<Stack gap={1}>
					{#each sizes as size (size)}
						{#each [{ thead, tbody, tfooter }, { thead, tbody }, { tbody, tfooter }, { tbody }] as table, i (i)}
							{#each [3, 6] as colCount (colCount)}
								{#each [4, 9] as rowCount (rowCount)}
									<Table.Root
										{variant}
										{size}
									>
										{@render table.thead?.(`${variant} ${size}`, colCount)}
										{@render table.tbody?.(colCount, rowCount)}
										{@render table.tfooter?.(colCount)}
									</Table.Root>
								{/each}
							{/each}
						{/each}
					{/each}
				</Stack>
			</Section>
		{/each}
	</Stack>
</Section>

<Section headerLevel={1}>
	{#snippet header()}
		Table Full-size
	{/snippet}
	{#each ['solid', 'outlined'] as const as variant (variant)}
		<div class="screenSize">
			<Table.Root
				{variant}
				size="lg"
				height="full"
			>
				{@render thead?.(`Full size ${variant}`, 5)}
				{@render tbody?.(5, 100)}
				{@render tfooter?.(5)}
			</Table.Root>
		</div>
	{/each}
</Section>

<style lang="scss">
	.screenSize {
		height: 90vh;
		overflow-y: scroll;
	}
</style>
