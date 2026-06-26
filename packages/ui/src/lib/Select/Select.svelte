<script lang="ts">
	import { capitalize, Menu } from '$lib/index.js';
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

<button class={['Select container', { isOpen }, `size${capitalize(size ?? 'md')}`, className]} {disabled} onclick={(ev) => toggleMenu(ev)} {...attributes}>
	<div class="Select content">
		<span class="Select placeholder">
			{@render display(value)}
		</span>
	</div>
	<span class="Select caret" aria-hidden="true">
		<IconCaretDownFilled size={12} />
	</span>
</button>

<style lang="scss">
	@use '../index.scss' as *;
	@use 'sass:list';
	@use '../TextInput/InputField.scss' as *;

	.container {
		cursor: pointer;

		@extend %InputField;
		&:disabled {
			@extend %InputField-disabled;
		}
		&:hover:not(:disabled) {
			@extend %InputField-hover;
		}
		&:focus-visible, &.isOpen:not(:disabled) {
			@extend %InputField-focused;
		}
	}
	.caret {
		color: var(--foreground-body);
	}
	.placeholder {
		color: var(--foreground-subtext);
	}
	.content {
		flex: 1;
	}
</style>
