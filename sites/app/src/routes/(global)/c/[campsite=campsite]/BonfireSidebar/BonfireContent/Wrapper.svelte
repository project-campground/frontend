<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	const { children, ...attributes }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	class="list"
	{...attributes}
>
	{@render children?.()}
</div>

<style lang="scss">
	.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}
</style>
