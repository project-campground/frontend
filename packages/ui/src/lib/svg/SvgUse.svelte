<script module lang="ts">
	export interface Props extends NonIdProps {
		id: 'logo';
	}
	export interface NonIdProps {
		w?: number;
		h?: number;
		size?: number;
		class?: ClassValue;
	}
</script>

<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	const { id, w, h, size, class: className }: Props = $props();
</script>

<svg
	version="2.0"
	class={['SvgUse', className]}
	style:--SvgUse-width="{w ?? size ?? 3}em"
	style:--SvgUse-height="{h ?? size ?? 3}em"
>
	<use href="#cgi-{id}" />
</svg>

<style lang="scss">
	.SvgUse {
		width: var(--SvgUse-width);
		height: var(--SvgUse-height);
	}
</style>
