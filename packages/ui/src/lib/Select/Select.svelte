<script lang="ts">
	import { capitalize, Menu, InputWrapper } from '$lib/index.js';
	import { getMenuPortal, MenuPortalInstance } from '$lib/MenuPortalContainer/index.js';
	import { IconArrowDown, IconCaretDownFilled } from "@tabler/icons-svelte";
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
	let isOpen = $derived(instance && menuPortal.items.includes(instance));

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

<InputWrapper class={['Select container', { isOpen }, className]} {disabled} {size} focused={isOpen} onclick={(ev) => toggleMenu(ev)} {...attributes}>
	<div class="Select content">
		<span class="Select placeholder">
			Select
		</span>
	</div>
	<span class="Select caret" aria-hidden="true">
		<IconCaretDownFilled size={12} />
	</span>
</InputWrapper>

<style lang="scss">
	@use '../index.scss' as *;
	@use 'sass:list';

	.caret {
		color: var(--palette-foreground-level3);
	}
	.placeholder {
		color: var(--palette-foreground-level4);
	}
	.content {
		flex: 1;
	}
</style>
