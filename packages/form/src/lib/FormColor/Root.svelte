<script lang="ts">
	import { Button, getMenuPortal, Menu, TextBlock, type MenuPortalInstance } from '@campground/ui';
	import ColorPicker from './ColorPicker.svelte';
	import { getFormControl, type FormControlInstance } from '$lib/FormControl/context.svelte.js';
	import { onMount } from 'svelte';

	const formControl = getFormControl() as FormControlInstance<number>;

	const menuPortal = getMenuPortal();
	let menuInstance: MenuPortalInstance | null = $state(null);
	function toggleMenu(ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (menuInstance) return menuInstance.destroy();

		menuInstance = menuPortal.add(colorPickerMenu, ev.currentTarget);
	}

	const hexValue = $derived(`#${(formControl.value ?? 0).toString(16).padStart(6, '0')}`);

	// Make sure colour can be displayed properly
	onMount(() => {
		formControl.value ??= 0;
	});
	$effect(() => {
		if (menuInstance && !menuPortal.items.includes(menuInstance)) menuInstance = null;
	});
</script>

{#snippet colorPickerMenu(instance: MenuPortalInstance)}
	<Menu.Root {instance}>
		<Menu.List>
			<ColorPicker onChange={(value) => (formControl.value = value)} />
		</Menu.List>
	</Menu.Root>
{/snippet}

<Button
	onclick={toggleMenu}
	variant="soft"
	color="neutral"
>
	<div
		class="display"
		style:--FormColor-color={hexValue}
	>
		<span class="dot"></span>
		<TextBlock>
			{hexValue}
		</TextBlock>
	</div>
</Button>

<style lang="scss">
	.display {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1ch;
	}
	.dot {
		border-radius: var(--radius-sm);
		width: 1rem;
		height: 1rem;
		background-color: var(--FormColor-color);
	}
</style>
