<script lang="ts">
	import type { SvgUseProps } from "./props.ts";

	const { id, w, h, size, class: className }: SvgUseProps = $props();
	const width = $derived(w ?? size ?? 3);
	const height = $derived(h ?? size ?? 3);
</script>

<svg
	version="2.0"
	class={['SvgUse', className]}
	style:--SvgUse-width={width === 0 ? undefined : `${width}em`}
	style:--SvgUse-height={height === 0 ? undefined : `${height}em`}
>
	<use href="#cgi-{id}" />
</svg>

<style lang="scss">
	.SvgUse {
		width: var(--SvgUse-width);
		height: var(--SvgUse-height);
	}
</style>
