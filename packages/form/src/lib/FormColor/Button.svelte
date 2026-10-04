<script lang="ts">
	import { Button, getMenuPortal, Menu, TextBlock, type MenuPortalInstance } from '@campground/ui';
	import ColorPicker from './ColorPicker.svelte';
	import { getFormControl } from '$lib/FormControl/context.svelte.js';
	import { onMount, type Snippet } from 'svelte';
	import type { ButtonProps } from './props.ts';

	const formControl = getFormControl<number>();

	const menuPortal = getMenuPortal();
	let menuInstance: MenuPortalInstance<unknown> | null = $state(null);
	const id = $props.id();

	function toggleMenu(ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (menuInstance) return menuInstance.destroy();

		menuInstance = menuPortal.add(
			colorPickerMenu as Snippet<[MenuPortalInstance]>,
			ev.currentTarget,
			id,
			ev as unknown,
		);
	}

	const hexValue = $derived(`#${(formControl.value ?? 0).toString(16).padStart(6, '0')}`);

	// Make sure colour can be displayed properly
	onMount(() => {
		formControl.value ??= 0;
	});
	$effect(() => {
		if (menuInstance && !menuPortal.items.includes(menuInstance)) menuInstance = null;
	});

	const { size }: ButtonProps = $props();
</script>

{#snippet colorPickerMenu(instance: MenuPortalInstance<Event>)}
	<Menu.Root {instance}>
		<Menu.List>
			<ColorPicker
				defaultColor={formControl.defaultValue ?? 0}
				bind:color={formControl.value}
			/>
		</Menu.List>
	</Menu.Root>
{/snippet}

<Button
	onclick={toggleMenu}
	variant="soft"
	color="neutral"
	justify="start"
	{size}
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
