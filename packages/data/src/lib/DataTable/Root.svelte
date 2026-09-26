<script
	lang="ts"
	module
>
	const localeMessages = defineMessages({
		search: {
			id: 'data.search',
			defaultMessage: `Search {entries}`,
			description: 'Search input in data tables.',
		},
	});
</script>

<script
	lang="ts"
	generics="TItem extends { id: TId }, TId"
>
	import { DataTableContext, setDataTable } from './context.svelte.ts';

	import type { RootProps } from './props.ts';
	import Table from './Table.svelte';
	import { IconSearch } from '@tabler/icons-svelte';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { getLocale } from '@campground/locale';
	import { Paginated } from '$lib/index.js';
	import { DebouncedValue, TextInput } from '@campground/ui';

	let {
		fetch,
		maxItems = $bindable(50),
		entryType,
		total,
		...props
	}: RootProps<TItem, TId> = $props();

	const dataTable = new DataTableContext<TItem, TId>(() => fetch);

	let page = $state(0);

	const search = new DebouncedValue<string>('', 500);

	$effect(() => {
		dataTable.fetchCount = maxItems;
		dataTable.fetch(page, search.value);
	});

	const locale = getLocale();

	setDataTable(dataTable);
</script>

<article class="container">
	<header class="header">
		<TextInput
			type="search"
			placeholder={locale.formatMessage(localeMessages.search, { entries: entryType.accusative })}
			oninput={(ev) => search.update(ev.currentTarget.value)}
		>
			{#snippet left()}
				<IconSearch size="1.5rem" />
			{/snippet}
		</TextInput>
	</header>
	<Table
		{fetch}
		{entryType}
		{...props}
	/>
	<Paginated.List
		bind:current={page}
		count={total ? Math.ceil(total / maxItems)
		: dataTable.items.length < maxItems ? page + 1
		: undefined}
	/>
</article>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
	}
</style>
