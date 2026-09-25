<script lang="ts">
	import { Section, Stack, GridTable } from '$lib/index.js';
	import { sizes } from './values.ts';
</script>

{#snippet tableHeader(header: string, count: number)}
	<GridTable.Header>
		{#each Array(count).keys() as i (i)}
			<GridTable.Cell>
				{header}
				{i}
			</GridTable.Cell>
		{/each}
	</GridTable.Header>
{/snippet}
{#snippet tableBody(columns: number, rows: number)}
	<GridTable.Body>
		{#each Array(rows).keys() as i (i)}
			<GridTable.Row>
				{#each Array(columns).keys() as j (j)}
					<GridTable.Cell>
						{i}.{j}
					</GridTable.Cell>
				{/each}
			</GridTable.Row>
		{/each}
	</GridTable.Body>
{/snippet}
{#snippet tableFooter(count: number)}
	<GridTable.Footer>
		{#each Array(count).keys() as i (i)}
			<GridTable.Cell>
				Footer {i}
			</GridTable.Cell>
		{/each}
	</GridTable.Footer>
{/snippet}

<Section headerLevel={1}>
	{#snippet header()}
		Grid Tables
	{/snippet}
	<Stack gap={5}>
		{#each ['solid', 'outlined'] as const as variant (variant)}
			<Section headerLevel={2}>
				{#snippet header()}
					{variant}
				{/snippet}
				<Stack gap={1}>
					{#each sizes as size (size)}
						{#each [{ tableHeader, tableBody, tableFooter }, { tableHeader, tableBody }, { tableBody, tableFooter }, { tableBody }] as table, i (i)}
							{#each [3, 5] as colCount (colCount)}
								{#each [4, 9] as rowCount (rowCount)}
									<GridTable.Root
										{variant}
										{size}
										columns={Array(colCount).fill(0)}
									>
										{@render table.tableHeader?.(`${variant} ${size}`, colCount)}
										{@render table.tableBody?.(colCount, rowCount)}
										{@render table.tableFooter?.(colCount)}
									</GridTable.Root>
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
		Grid Table Full-size
	{/snippet}
	{#each ['solid', 'outlined'] as const as variant (variant)}
		<div class="screenSize">
			<GridTable.Root
				{variant}
				size="lg"
				height="full"
				columns={Array(5).fill(0)}
			>
				{@render tableHeader?.(`Full size ${variant}`, 5)}
				{@render tableBody?.(5, 100)}
				{@render tableFooter?.(5)}
			</GridTable.Root>
		</div>
	{/each}
</Section>

<style lang="scss">
	.screenSize {
		height: 90vh;
		overflow: hidden;
	}
</style>
