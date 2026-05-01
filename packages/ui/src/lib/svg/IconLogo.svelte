<script lang="ts">
	import SvgUse, { type NonIdProps } from "./SvgUse.svelte";
	const props: NonIdProps = $props();
</script>

<SvgUse id="logo" {...props} />