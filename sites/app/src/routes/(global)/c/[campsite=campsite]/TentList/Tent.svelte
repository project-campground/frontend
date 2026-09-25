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
	import type { TentType, TentViewBasic } from '$lib/types/campground/tent.js';
	import type { PseudoTentType } from '../../../../../lib/components/tents/pseudoTents.ts';
	import { draggable, droppable } from '@campground/ui';
	import TentBase from './TentBase.svelte';

	const {
		tent,
		domain,
		onMoveTo,
	}: {
		tent: TentItem;
		domain: string;
		onMoveTo?: (movedTentId: string, movedToTentId: string) => unknown;
	} = $props();
</script>

<TentBase
	{tent}
	{domain}
	{@attach onMoveTo ? draggable({ id: tent.id, groups: ['tent'] }) : null}
	{@attach onMoveTo ?
		droppable({ id: tent.id, acceptGroups: ['tent'], disallowIds: [tent.id], onDrop: onMoveTo })
	:	null}
/>
