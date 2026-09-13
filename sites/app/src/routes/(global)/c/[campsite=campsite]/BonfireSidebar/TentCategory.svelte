<script lang="ts">
	import { getAppview } from '$lib/context/api.js';
	import type { TentCategoryView } from '$lib/types/campground/tent.js';
	import { Accordion, Para, draggable, droppable } from '@campground/ui';
	import type { Snippet } from 'svelte';

	const appview = getAppview();

	function onDrop(draggedId: string) {
		return appview.categories.move(draggedId, { position: category.position });
	}

	const { category, children }: { category: TentCategoryView; children: Snippet } = $props();
</script>

<Accordion
	expanded
	noBackground
>
	{#snippet header()}
		<div
			class="header"
			data-droppable-over="none"
			{@attach draggable({ id: category.id, groups: ['category'] })}
			{@attach droppable({
				id: category.id,
				acceptGroups: ['category'],
				disallowIds: [category.id],
				onDrop,
			})}
		>
			<Para level="h4">
				{category.name}
			</Para>
			{#if category.description}
				<Para level="sub0">
					{category.description}
				</Para>
			{/if}
		</div>
	{/snippet}
	{@render children()}
</Accordion>

<style lang="scss">
	@use '@campground/ui' as *;

	.header {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		flex: 1;

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
