<script
	lang="ts"
	module
>
	export interface TentItem extends Pick<TentViewBasic, 'id' | 'name' | 'viewType' | 'campsiteId'> {
		type: PseudoTentType | TentType;
	}
</script>

<script lang="ts">
	import { page } from '$app/state';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';
	import type { TentType, TentViewBasic } from '$lib/types/campground/tent.js';
	import type { PseudoTentType } from '../pseudoTents.ts';
	import TentListItem from './Item.svelte';

	const { tent, domain }: { tent: TentItem; domain: string } = $props();

	const isActive = $derived(tent.id === page.url.pathname.split('/t/')[1]?.split('/')[0]);
</script>

<a href={`/c/${tent.campsiteId}@${domain}/t/${tent.id}`}>
	<TentListItem active={isActive}>
		<TentIcon
			type={tent.type}
			viewType={tent.viewType}
		/>
		{tent.name}
	</TentListItem>
</a>

<style lang="scss">
	a {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		text-decoration: none;
	}
</style>
