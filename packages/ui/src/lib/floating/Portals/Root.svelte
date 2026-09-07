<script lang="ts">
	import { setOutsideClickBoundary, type OutsideClick } from '$lib/contexts/outside.svelte.js';
	import { writable } from 'svelte/store';
	import MenuPortalContainer from '../MenuPortalContainer/Root.svelte';
	import { MenuPortal, setMenuPortal } from '../MenuPortalContainer/portals.svelte.ts';
	import PortalsList from './List.svelte';
	import type { RootProps } from './props.ts';
	import {
		setToastPortal,
		ToastPortal,
		ToastPortalContainer,
	} from '../ToastPortalContainer/index.ts';

	const { flex, fullSize, children, ...attributes }: RootProps = $props();

	const menuPortal = new MenuPortal();
	const toastPortal = new ToastPortal();

	setMenuPortal(menuPortal);
	setToastPortal(toastPortal);

	const outsideClick: OutsideClick = writable(null);

	setOutsideClickBoundary(outsideClick);
</script>

<div
	{...attributes}
	class={[{ flex, fullSize }]}
	onclick={(ev) => {
		ev.stopPropagation();
		$outsideClick = ev;
	}}
>
	{@render children()}
	<PortalsList>
		<MenuPortalContainer portal={menuPortal} />
		<ToastPortalContainer portal={toastPortal} />
	</PortalsList>
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	.flex {
		flex: 1;
	}
	.fullSize {
		width: 100%;
		height: 100%;
	}
</style>
