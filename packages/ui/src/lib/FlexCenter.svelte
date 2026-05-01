<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	export interface Props {
		children: Snippet;
		class?: ClassValue;
	}

	const { children, class: className }: Props = $props();
</script>

<div class={['FlexCenter', className]}>
	{@render children()}
</div>

<style lang="scss">
	.FlexCenter {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
