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

<div class="MenuPortalContainer" {...attributes} onmouseup={(ev) => ev.stopPropagation()}>
	{#each portal.items as item}
		{@render item.snippet(item)}
	{/each}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.MenuPortalContainer {
		position: relative;
		width: 100%;
		height: 100%;
		pointer-events: none;
		& > :global(*) {
			pointer-events: all;
		}
	}
</style>
