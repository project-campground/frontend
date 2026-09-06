<script lang="ts">
	import { Pick } from '$lib/form/index.js';
	import type { ItemProps } from './props.ts';

	const { children }: ItemProps = $props();
</script>

<Pick.Item
	role="tab"
	class="tab"
>
	{@render children()}
</Pick.Item>
