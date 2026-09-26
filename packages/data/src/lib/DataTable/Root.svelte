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
		showingWithMax: {
			id: 'data.showing.withMax',
			defaultMessage: `Showing {amount} out of {max}`,
			description: 'How many items are being shown with known max amount',
		},
		showing: {
			id: 'data.showing.withMax',
			defaultMessage: `Showing {amount}`,
			description: 'How many items are being shown',
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
	import { getLocale, LocaleMessage } from '@campground/locale';
	import { Paginated } from '$lib/index.js';
	import { DebouncedValue, TextBlock, TextInput } from '@campground/ui';

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
	<footer class="footer">
		<!-- TODO: Better handling of amount found by search -->
		<Paginated.List
			bind:current={page}
			count={total && !search.value ? Math.ceil(total / maxItems)
			: dataTable.items.length < maxItems ? page + 1
			: undefined}
		/>
		<TextBlock level="subtext">
			{#if total && !search.value}
				{const offset = $derived(page * maxItems)}
				<LocaleMessage
					{...localeMessages.showingWithMax}
					values={{ amount: `${offset}-${offset + dataTable.items.length}`, max: total }}
				/>
			{:else}
				<LocaleMessage
					{...localeMessages.showing}
					values={{ amount: maxItems }}
				/>
			{/if}
		</TextBlock>
	</footer>
</article>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.footer {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
	}
</style>
