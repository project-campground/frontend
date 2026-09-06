<script lang="ts">
	import { Pick } from '$lib/form/index.js';
	import type { ListProps } from './props.ts';

	const { children }: ListProps = $props();
</script>

<Pick.List
	size="md"
	role="tablist"
	class="tabList"
>
	{@render children()}
</Pick.List>
