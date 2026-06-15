<script lang="ts">
	import { Menu, InputWrapper } from '$lib/index.js';
	import { getMenuPortal, MenuPortalInstance } from '$lib/MenuPortalContainer/index.js';
	import { IconCaretDownFilled } from "@tabler/icons-svelte";
	import type SelectProps from './props.ts';

	let {
		size,
		disabled,
		value = $bindable(),
		class: className,
		children,
		display,
		...attributes
	}: SelectProps = $props();

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
		menuPortal.onOutsideClick(ev);

		if (!instanceExisted)
			return (instance = menuPortal.add(internalMenu, element));
	}
</script>

{#snippet internalMenu(instance: MenuPortalInstance)}
	{const rect = instance.invoker.getBoundingClientRect()}
	<Menu.List invokerRect={rect} onaction={(newValue) => value = newValue}>
		{@render children()}
	</Menu.List>
{/snippet}

<InputWrapper class={['Select container', { isOpen }, className]} {disabled} {size} focused={isOpen} onclick={(ev) => toggleMenu(ev)} {...attributes}>
	<div class="Select content">
		<span class="Select placeholder">
			{@render display(value)}
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
