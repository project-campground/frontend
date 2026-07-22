<script lang="ts">
	import type { Snippet } from 'svelte';
	import { theme, type Theme } from '../theme/index.ts';
	import SvgDefs from '../visual/svg/SvgDefs.svelte';

	let themeValue = $state<Theme>(null!);
	theme.subscribe((theme) => (themeValue = theme));

	const { children }: { children: Snippet } = $props();
</script>

<main
	id="main"
	lang="en-US"
	data-theme={themeValue}
>
	<SvgDefs />
	{@render children()}
</main>

<style lang="scss">
	@use '../theme/index.scss';
	@use '../index.scss' as *;

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
