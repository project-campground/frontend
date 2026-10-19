<script
	lang="ts"
	module
>
	export interface TentItem extends Pick<
		TentViewBasic,
		'id' | 'name' | 'viewType' | 'campsiteId' | 'position' | 'categoryId'
	> {
		type: PseudoTentType | TentType;
	}
</script>

<script lang="ts">
	import { page } from '$app/state';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';
	import type { TentType, TentViewBasic } from '$lib/types/campground/tent.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { PseudoTentType } from '../../../../../lib/components/tents/pseudoTents.ts';
	import TentListItem from './Item.svelte';
	import { ContentMover } from '$lib/components/index.js';

	const {
		tent,
		domain,
		...attrs
	}: { tent: TentItem; domain: string } & Omit<HTMLAttributes<HTMLAnchorElement>, 'children'> =
		$props();

	const isActive = $derived(tent.id === page.url.pathname.split('/t/')[1]?.split('/')[0]);
</script>

<ContentMover.Wrapper
	element="a"
	href={`/c/${tent.campsiteId}@${domain}/t/${tent.id}`}
	{...attrs}
>
	<TentListItem active={isActive}>
		<TentIcon
			type={tent.type}
			viewType={tent.viewType}
		/>
		{tent.name}
	</TentListItem>
</ContentMover.Wrapper>
