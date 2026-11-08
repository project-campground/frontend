<script lang="ts">
	import type { SvgUseNonIdProps } from './props.ts';
	import SvgUse from './Use.svelte';
	const props: SvgUseNonIdProps = $props();
</script>

<SvgUse
	id="wordmark"
	{...props}
/>
