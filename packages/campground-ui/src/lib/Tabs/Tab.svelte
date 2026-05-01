<script module>
	export interface Props {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { type Snippet } from 'svelte';

	const { children }: Props = $props();
</script>

<div class="Tab">
	{@render children?.()}
</div>

<style lang="scss">
	.Tab {
		width: 100%;
		height: 100%;
		overflow: auto;
		scroll-snap-align: start;
	}
</style>
