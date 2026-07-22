<script lang="ts">
	import {
		Button,
		getMenuPortal,
		Menu,
		MenuPortalInstance,
		Section,
		Stack,
		Group,
		Modal,
	} from '$lib/index.js';
	import type { Snippet } from 'svelte';

	const menuPortal = getMenuPortal();

	let menuInstance: MenuPortalInstance | null = $state(null);

	// Auto-update
	$effect(() => {
		if (!menuPortal.items.includes(menuInstance!)) menuInstance = null;
	});

	function toggleMenu(
		ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
		menu: Snippet<[MenuPortalInstance]>,
	) {
		if (menuInstance) return menuInstance.destroy();

		menuInstance = menuPortal.add(menu, ev.currentTarget);
	}
</script>

{#snippet regularMenu(instance: MenuPortalInstance)}
	<Menu.Root {instance}>
		<Menu.List>
			<Menu.Item>Example item</Menu.Item>
			<Menu.Item>
				<Menu.Button>Example button</Menu.Button>
			</Menu.Item>
		</Menu.List>
	</Menu.Root>
{/snippet}
{#snippet regularModal(instance: MenuPortalInstance)}
	<Modal.Root {instance}>
		<Modal.Dialog
			size={instance.invoker.attributes.getNamedItem('data-modal-size')?.value as
				| 'auto'
				| 'max'
				| 'full'
				| null}>Aaaaaa</Modal.Dialog
		>
	</Modal.Root>
{/snippet}

<Section headerLevel={1}>
	{#snippet header()}
		Menu
	{/snippet}
	<Stack>
		<Group>
			<Button onclick={(ev) => toggleMenu(ev, regularMenu)}>Open menu</Button>
		</Group>
	</Stack>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Modal
	{/snippet}
	<Stack>
		<Group>
			<Button onclick={(ev) => toggleMenu(ev, regularModal)}>Open modal</Button>
			<Button
				onclick={(ev) => toggleMenu(ev, regularModal)}
				data-modal-size="auto">Open modal (size: auto)</Button
			>
			<Button
				onclick={(ev) => toggleMenu(ev, regularModal)}
				data-modal-size="max">Open modal (size: max)</Button
			>
			<Button
				onclick={(ev) => toggleMenu(ev, regularModal)}
				data-modal-size="full">Open modal (size: full)</Button
			>
		</Group>
	</Stack>
</Section>
