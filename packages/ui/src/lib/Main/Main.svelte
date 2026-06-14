<script lang="ts">
	import type { Snippet } from 'svelte';
	import { theme, type Theme } from '../theme/index.ts';
	import SvgDefs from '../svg/SvgDefs.svelte';
	import Portals from '$lib/Portals/index.js';
	import MenuPortalContainer, {
		MenuPortal,
		setMenuPortal
	} from '$lib/MenuPortalContainer/index.js';

	let themeValue = $state<Theme>(null!);
	theme.subscribe((theme) => (themeValue = theme));

	const menuPortal = new MenuPortal();

	const { children }: { children: Snippet } = $props();
	setMenuPortal(menuPortal);
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main
	id="main"
	lang="en-US"
	data-theme={themeValue}
	onmouseup={(ev) => menuPortal.onOutsideClick(ev)}
>
	<SvgDefs />
	{@render children()}
	<Portals>
		<MenuPortalContainer portal={menuPortal}></MenuPortalContainer>
	</Portals>
</main>

<style lang="scss">
	@use '../theme/index.scss';

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
		display: flex;
		flex-direction: column;

		background-color: var(--palette-background-body);
		color: var(--palette-foreground-level2);
		min-height: 100%;
		overflow: auto;
		transition: background, color;
		transition-duration: 0.5s;
	}
</style>
