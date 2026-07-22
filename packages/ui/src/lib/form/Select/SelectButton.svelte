<script lang="ts">
	import { capitalize, Menu } from '$lib/index.js';
	import { IconCaretDownFilled } from '@tabler/icons-svelte';
	import type { ButtonProps } from './props.ts';
	import { getOutsideClickBoundary } from '$lib/contexts/outside.svelte.js';
	import {
		getMenuPortal,
		MenuPortalInstance,
	} from '$lib/floating/MenuPortalContainer/portals.svelte.js';
	import SelectMenu from './SelectMenu.svelte';

	let {
		size,
		disabled,
		value = $bindable(),
		class: className,
		children,
		display,
		...attributes
	}: ButtonProps = $props();

	const menuPortal = getMenuPortal();

	const outsideClick = getOutsideClickBoundary();

	function toggleMenu(ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		// Prevent click-away
		ev.stopPropagation();

		const wasOpen = !!instance;
		// Close other selects whenever it's toggled
		$outsideClick = ev;

		if (!wasOpen) return (instance = menuPortal.add(_internalMenu, button!));
	}

	// When it's destroyed
	$effect(() => {
		if (instance && !menuPortal.includes(instance)) instance = null;
	});

	let button: HTMLElement | null = $state(null);
	let instance: MenuPortalInstance | null = $state(null);
</script>

{#snippet _internalMenu(menu: MenuPortalInstance)}
	<SelectMenu
		onSelect={(newValue) => (value = newValue)}
		instance={menu}
		offset={8}
	>
		<Menu.List>
			{@render children()}
		</Menu.List>
	</SelectMenu>
{/snippet}

<button
	bind:this={button}
	class={['container', { isOpen: menuPortal.includes(instance!) }, className]}
	{disabled}
	onclick={(ev) => toggleMenu(ev)}
	data-size={size ?? 'md'}
	{...attributes}
>
	<div class="content">
		<span class="placeholder">
			{@render display(value)}
		</span>
	</div>
	<span
		class="caret"
		aria-hidden="true"
	>
		<IconCaretDownFilled size={12} />
	</span>
</button>

<style lang="scss">
	@use '../../index.scss' as *;
	@use 'sass:list';
	@use '../TextInput/InputField.scss' as *;

	.menuWrapper {
		z-index: 20;
	}

	.container {
		position: relative;
		cursor: pointer;

		@extend %InputField;
		&:disabled {
			@extend %InputField-disabled;
		}
		&:hover:not(:disabled) {
			@extend %InputField-hover;
		}
		&:focus-visible,
		&.isOpen:not(:disabled) {
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
