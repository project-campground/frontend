<script lang="ts">
	import { Menu } from '$lib/index.js';
	import { getMenuPortal, MenuPortalInstance } from '$lib/MenuPortalContainer/index.js';
	import type TextInputProps from './props.ts';

	let {
		size,
		disabled,
		value = $bindable(),
		class: className,
		...attributes
	}: TextInputProps = $props();

	const menuPortal = getMenuPortal();
	let instance = $state<MenuPortalInstance | null>(null);

	function toggleMenu(ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		// Prevent click-away
		ev.stopPropagation();

		const element = ev.currentTarget;

		const instanceExisted = instance?.exists;
		// It's sort of an outside click. This adds toggling, so clicking on select twice doesn't make the menu stay
		// This also closes other instances
		console.log(instance, instanceExisted, menuPortal.items)
		menuPortal.onOutsideClick(ev);

		if (!instanceExisted)
			return (instance = menuPortal.add(testMenu, element));
	}
</script>

{#snippet testMenu(instance: MenuPortalInstance)}
	{const rect = instance.invoker.getBoundingClientRect()}
	<Menu.List invokerRect={rect}>
		<Menu.Item>Example item</Menu.Item>
		<Menu.Item color="danger">Example item #2</Menu.Item>
		<Menu.Item color="warning">Example item #3</Menu.Item>
		<Menu.Item color="success">Example item #4</Menu.Item>
		<Menu.Item color="info">Example item #5</Menu.Item>
		<Menu.Item color="primary">Example item #6</Menu.Item>
		<Menu.Item color="neutral">Example item #7</Menu.Item>
	</Menu.List>
{/snippet}
<button onmouseup={(ev) => { ev.stopPropagation(); toggleMenu(ev) }}>{size} {disabled}</button>

<style lang="scss">
	@use '../index.scss' as *;
</style>
