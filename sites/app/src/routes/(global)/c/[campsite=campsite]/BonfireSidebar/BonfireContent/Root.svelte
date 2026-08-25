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
	const categoryList = $derived(
		Object.entries(toLookup(campsiteContext.tents?.tents ?? [], (tent) => tent.categoryId ?? '')).map(
			([categoryId, tents]) => {
				const category =
					categoryId ?
						(campsiteContext.tents?.categories.find((x) => x.id === categoryId) ?? null)
					:	null;

				return { category, tents };
			},
		),
	);
	const nonCategorizedTents = $derived(
		categoryList.filter((x) => !x.category).flatMap((x) => x.tents),
	);
	const categorizedTents = $derived(
		categoryList
			.filter((x) => x.category)
			.sort((a, b) => a.category!.position - b.category!.position) as {
			category: TentCategoryView;
			tents: TentViewBasic[];
		}[],
	);
	const isDefaultBonfire = $derived(campsiteContext.tents?.isBonfireDefault ?? false);
	const intl = getLocaleContext();
</script>

{#if campsiteContext.campsite && campsiteContext.tents}
	<Wrapper>
		{#if isDefaultBonfire}
			<TentList
				tents={psuedoTentList.map((tent) => ({
					...tent,
					campsiteId: campsiteContext.campsite!.id,
					name: $intl.formatMessage(globalLocale[`app.tents.${tent.id}` as 'app.tents.bulletin']),
				}))}
				domain={campsiteContext.domain!}
			/>
			<Divider />
		{/if}
		<TentList
			tents={nonCategorizedTents}
			domain={campsiteContext.domain!}
		/>
		{#each categorizedTents as { category, tents } (category.id)}
			<TentCategory {category}>
				<TentList
					{tents}
					domain={campsiteContext.domain!}
				/>
			</TentCategory>
		{/each}
	</Wrapper>
{:else}
	<Skeleton />
{/if}
