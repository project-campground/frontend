<script lang="ts">
	import { getOutsideClickBoundary } from '$lib/contexts/outside.svelte.js';
	import { onMount } from 'svelte';
	import type MenuPortalProps from './props.ts';

	const { portal, zIndex, ...attributes }: MenuPortalProps = $props();

	// Don't need to handle it every time for containers
	onMount(() => getOutsideClickBoundary().subscribe(() => handleOutsideClick));

	function handleOutsideClick() {
		portal.clear();
	}
	$effect(() => {
		portal.handleOutsideClick(handleOutsideClick);
	});
</script>

<div
	class={[portal.items.length ? 'hasItems' : 'noItems']}
	onclick={(ev) => ev.stopPropagation()}
	style:--Portal-zIndex={zIndex ?? 1000}
	{...attributes}
>
	{#each portal.items as item (item.key)}
		{@render item.snippet(item)}
	{/each}
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	div {
		position: relative;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: hidden;
		z-index: var(--Portal-zIndex);
		& > :global(*) {
			pointer-events: all;
		}
	}
</style>
