<script lang="ts">
	import type { LayoutProps } from './$types.js';

	const { children }: LayoutProps = $props();
</script>

{@render children()}
