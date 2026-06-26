<script lang="ts">
	import type { SvgUseNonIdProps } from './props.ts';
	import SvgUse from './SvgUse.svelte';
	const props: SvgUseNonIdProps = $props();
</script>

<SvgUse
	id="logo"
	{...props}
/>
