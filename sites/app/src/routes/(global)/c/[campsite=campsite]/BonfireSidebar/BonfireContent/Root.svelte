<script lang="ts">
	import { getLocaleContext, globalLocale } from '@campground/locale';
	import type { TentCategoryView, TentViewBasic } from '$lib/types/campground/tent.js';
	import { toLookup } from '$lib/util/array.js';
	import { Divider } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import TentCategory from '../TentCategory.svelte';
	import TentList from '../TentList/Root.svelte';
	import { psuedoTentList } from '../pseudoTents.ts';
	import Wrapper from './Wrapper.svelte';
	import Skeleton from './Skeleton.svelte';

	const campsiteContext = getCampsiteContext();
	const bonfire = $derived(campsiteContext.openBonfire);
	const campsite = $derived(campsiteContext.campsite);
	const domain = $derived($campsite!.domain);

	const categoryList = $derived(
		Object.entries(toLookup($bonfire?.tents ?? [], (tent) => tent.categoryId ?? '')).map(
			([categoryId, tents]) => {
				const category =
					categoryId ? ($bonfire?.categories.find((x) => x.id === categoryId) ?? null) : null;

				return { category, tents };
			},
		),
	);
	const emptyCategories = $derived(
		$bonfire?.categories
			.filter((category) => !$bonfire?.tents.some((tent) => tent.categoryId === category.id))
			.map((x) => ({ category: x, tents: [] })) ?? [],
	);
	const nonCategorizedTents = $derived(
		categoryList.filter((x) => !x.category).flatMap((x) => x.tents),
	);
	const categorizedTents = $derived(
		categoryList
			.filter((x) => x.category)
			.concat(emptyCategories)
			.sort((a, b) => a.category!.position - b.category!.position) as {
			category: TentCategoryView;
			tents: TentViewBasic[];
		}[],
	);
	const isDefaultBonfire = $derived($bonfire?.isBonfireDefault ?? false);
	// $effect(() => {
	// 	console.log({ categoryList, nonCategorizedTents, categorizedTents, isDefaultBonfire });
	// });
	const intl = getLocaleContext();
</script>

{#if $campsite && $bonfire}
	<Wrapper>
		{#if isDefaultBonfire}
			<TentList
				tents={psuedoTentList.map((tent) => ({
					...tent,
					campsiteId: $campsite!.campsiteId,
					name: $intl.formatMessage(globalLocale[`app.tents.${tent.id}` as 'app.tents.bulletin']),
				}))}
				{domain}
			/>
			<Divider />
		{/if}
		<TentList
			tents={nonCategorizedTents}
			{domain}
		/>
		{#each categorizedTents as { category, tents } (category.id)}
			<TentCategory {category}>
				<TentList
					{tents}
					{domain}
				/>
			</TentCategory>
		{/each}
	</Wrapper>
{:else}
	<Skeleton />
{/if}
