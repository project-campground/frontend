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
		Dialog,
		Svg,
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
			<Menu.Item>
				<Menu.Button color="primary">
					<Svg.Logo size={2} />
					Example button
				</Menu.Button>
			</Menu.Item>
			<Menu.Item>
				<Menu.Button color="info">
					{#snippet left()}
						<Svg.Logo size={2} />
					{/snippet}
					Example button
				</Menu.Button>
			</Menu.Item>
		</Menu.List>
	</Menu.Root>
{/snippet}
{#snippet regularModal(instance: MenuPortalInstance)}
	<Modal.Root {instance}>
		<Dialog.Root
			size={instance.invoker.attributes.getNamedItem('data-modal-size')?.value as
				| 'auto'
				| 'max'
				| 'full'
				| null}
		>
			<Dialog.Header>Example title</Dialog.Header>
			<Dialog.Content>Aaaaaa</Dialog.Content>
			<Dialog.Footer>
				<Button color="primary">Okay</Button>
				<Button
					color="neutral"
					variant="plain">Not okay</Button
				>
			</Dialog.Footer>
		</Dialog.Root>
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
