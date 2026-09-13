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
	import { getAppview } from '$lib/context/api.js';
	import type { TentType, TentViewBasic } from '$lib/types/campground/tent.js';
	import type { PseudoTentType } from '../pseudoTents.ts';
	import TentListItem from './Item.svelte';
	import { draggable, droppable } from '@campground/ui';

	const { tent, domain }: { tent: TentItem; domain: string } = $props();

	const appview = getAppview();
	function onDragged(draggedId: string) {
		return appview.tents.move(draggedId, { category_id: tent.categoryId, position: tent.position });
	}

	const isActive = $derived(tent.id === page.url.pathname.split('/t/')[1]?.split('/')[0]);
</script>

<a
	href={`/c/${tent.campsiteId}@${domain}/t/${tent.id}`}
	data-droppable-over="none"
	{@attach draggable({ id: tent.id, groups: ['tent'] })}
	{@attach droppable({
		id: tent.id,
		acceptGroups: ['tent'],
		disallowIds: [tent.id],
		onDrop: onDragged,
	})}
>
	<TentListItem active={isActive}>
		<TentIcon
			type={tent.type}
			viewType={tent.viewType}
		/>
		{tent.name}
	</TentListItem>
</a>

<style lang="scss">
	@use '@campground/ui' as *;

	a {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: stretch;
		text-decoration: none;
		box-sizing: border-box;

		&::before {
			position: absolute;
			content: '';

			height: 0.25rem;

			left: 0;
			right: 0;
			border-radius: var(--radius-md);
			background: transparent;

			top: -0.25rem;

			transition: background $transition-time-md;
		}

		&[data-droppable-over]:not([data-droppable-over='none'])::before {
			background: linear-gradient(to right, var(--primary-glowFirst), var(--primary-glowSecond));
		}
	}
</style>
