<script lang="ts">
	import { Code } from '@campground/ui';
	import type { SvelteNodeViewProps } from 'prosekit/svelte';

	const { contentRef, view, getPos }: SvelteNodeViewProps = $props();

	let code: HTMLElement | undefined = $state();

	$effect(() => {
		if (code) contentRef(code);
	});
</script>

<Code.Line
	bind:element={code}
	index={0}
></Code.Line>
