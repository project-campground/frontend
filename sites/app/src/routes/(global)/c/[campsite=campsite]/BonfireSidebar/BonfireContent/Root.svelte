<script lang="ts">
	import { getLocale } from '@campground/locale';
	import type { TentCategoryView, TentViewBasic } from '$lib/types/campground/tent.js';
	import { toLookup } from '$lib/util/array.js';
	import { Divider } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import TentCategory from '../../CategoryList/Category.svelte';
	import TentList from '../../TentList/Root.svelte';
	import { psuedoTentList } from '../pseudoTents.ts';
	import Wrapper from './Wrapper.svelte';
	import Skeleton from './Skeleton.svelte';
	import { localeStrings } from '$lib/locale/index.js';
	import TentMover from '../../TentList/TentMover.svelte';
	import { getAppview } from '$lib/context/api.js';

	const campsiteContext = getCampsiteContext();
	const bonfire = $derived(campsiteContext.openBonfire);
	const campsiteReference = $derived(campsiteContext.campsiteReference);
	const domain = $derived(campsiteReference!.domain);

	const categoryList = $derived(
		Object.entries(toLookup(bonfire?.tents ?? [], (tent) => tent.categoryId ?? '')).map(
			([categoryId, tents]) => {
				const category =
					categoryId ? (bonfire?.categories.find((x) => x.id === categoryId) ?? null) : null;

				return { category, tents };
			},
		),
	);
	const emptyCategories = $derived(
		bonfire?.categories
			.filter((category) => !bonfire?.tents.some((tent) => tent.categoryId === category.id))
			.map((x) => ({ category: x, tents: [] })) ?? [],
	);
	const nonCategorizedTents = $derived(
		categoryList
			.filter((x) => !x.category)
			.flatMap((x) => x.tents)
			.sort((a, b) => a.position - b.position),
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
	const isDefaultBonfire = $derived(bonfire?.isBonfireDefault ?? false);

	const appview = getAppview();

	async function onDropCategoryToBottom(categoryId: string, position: number) {
		return appview.categories.move(categoryId, { position } as { position: number });
	}

	const intl = getLocale();
</script>

{#if campsiteReference && bonfire}
	<Wrapper>
		{#if isDefaultBonfire}
			<TentList
				tents={psuedoTentList.map((tent) => ({
					...tent,
					campsiteId: campsiteReference.campsite.id,
					position: 0,
					categoryId: null,
					name: intl.formatMessage(localeStrings.tents[tent.id as 'bulletin']),
				}))}
				{domain}
			/>
			<Divider />
		{/if}
		<TentList
			categoryId={null}
			tents={nonCategorizedTents}
			{domain}
		/>
		{#each categorizedTents as { category, tents } (category.id)}
			<TentCategory {category}>
				<TentList
					categoryId={category.id}
					{tents}
					{domain}
				/>
			</TentCategory>
		{/each}
		{const bottomCategories = categorizedTents.slice(-1)}
		<TentMover
			id="0"
			disallowIds={bottomCategories.map((x) => x.category.id)}
			onDrop={async (categoryId) =>
				onDropCategoryToBottom(categoryId, (bottomCategories[0].category.position ?? -1) + 1)}
			acceptGroups={['category']}
		/>
	</Wrapper>
{:else}
	<Skeleton />
{/if}
