<script lang="ts">
	import { setOutsideClickBoundary, type OutsideClick } from '$lib/contexts/outside.svelte.js';
	import { writable } from 'svelte/store';
	import MenuPortalContainer from '../MenuPortalContainer/MenuPortalContainer.svelte';
	import { MenuPortal, setMenuPortal } from '../MenuPortalContainer/portals.svelte.ts';
	import PortalsList from './PortalsList.svelte';
	import type { RootProps } from './props.ts';

	const { children, ...attributes }: RootProps = $props();

	const menuPortal = new MenuPortal();

	setMenuPortal(menuPortal);

	const outsideClick: OutsideClick = writable(null);

	setOutsideClickBoundary(outsideClick);
</script>

<div
	{...attributes}
	onclick={(ev) => {
		ev.stopPropagation();
		$outsideClick = ev;
	}}
>
	{@render children()}
	<PortalsList>
		<MenuPortalContainer portal={menuPortal} />
	</PortalsList>
</div>

<style lang="scss">
	@use '../../index.scss' as *;
</style>
