<script lang="ts">
	import type { Snippet } from 'svelte';
	import { theme, type Theme } from '../theme/index.ts';
	import SvgDefs from '../visual/Svg/Defs.svelte';
	import { setOutsideClickBoundary, type OutsideClick } from '$lib/contexts/outside.svelte.js';
	import { writable } from 'svelte/store';

	let themeValue = $state<Theme>(null!);
	theme.subscribe((theme) => (themeValue = theme));

	const outsideClickBoundary: OutsideClick = writable(null);

	const { children }: { children: Snippet } = $props();

	setOutsideClickBoundary(outsideClickBoundary);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main
	id="main"
	lang="en-US"
	data-theme={themeValue}
	onclick={(ev) => ($outsideClickBoundary = ev)}
>
	<SvgDefs />
	{@render children()}
</main>

<style lang="scss">
	@use '../theme/index.scss';
	@use '../common.scss' as *;

	:global(html),
	:global(body) {
		height: 100%;
		overflow: hidden;
	}

	#main,
	:global(html),
	:global(body) {
		width: 100%;
		padding: 0;
		margin: 0;
	}
	#main {
		position: relative;
		display: flex;
		flex-direction: column;

		background-color: var(--background-body);
		color: var(--foreground-subheading);
		min-height: 100%;
		overflow: auto;
		transition: background, color;
		transition-duration: $transition-time-lg;
	}
</style>
