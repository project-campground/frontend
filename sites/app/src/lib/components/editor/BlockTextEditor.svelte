<script
	lang="ts"
	module
>
	import type { ProseKitProps } from 'prosekit/svelte';

	interface Props extends ProseKitProps {}
</script>

<script lang="ts">
	import { ProseKit } from 'prosekit/svelte';

	const { editor, children }: Props = $props();
</script>

<div class="container">
	<ProseKit {editor}>
		{@render children?.()}
	</ProseKit>
</div>

<style lang="scss">
	.container {
		position: relative;
		border: solid 1px var(--neutral-border);
		border-radius: var(--radius-md);
		overflow: auto;
		color: var(--foreground-body);
	}
</style>
