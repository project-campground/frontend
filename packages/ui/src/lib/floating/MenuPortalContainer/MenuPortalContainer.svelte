<script lang="ts">
	import type MenuPortalProps from './props.ts';

	const { portal, ...attributes }: MenuPortalProps = $props();

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
	{...attributes}
>
	{#each portal.items as item (item.key)}
		{@render item.snippet(item)}
	{/each}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	div {
		position: relative;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: hidden;
		z-index: 1500;
		& > :global(*) {
			pointer-events: all;
		}
	}
</style>
