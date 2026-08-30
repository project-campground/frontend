<script lang="ts">
	import {
		Card,
		getMenuPortal,
		rightClickMenu,
		Stack,
		MenuPortalInstance,
		Menu,
		rightClickMenuProps,
		Modal,
	} from '@campground/ui';
	import { BonfireBanner, BonfireContent } from './index.ts';
	import { IconPlus } from '@tabler/icons-svelte';
	import { FormattedMessageGlobal } from '@campground/locale';
	import { TentCreation } from '../Modals/TentCreation/index.ts';

	const menuPortal = getMenuPortal();
</script>

{#snippet channelCreationModal(instance: MenuPortalInstance)}
	<Modal {instance}>
		<TentCreation />
	</Modal>
{/snippet}

{#snippet emptyPlaceRightClick(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root {...rightClickMenuProps(instance)}>
		<Menu.List>
			<Menu.Item onclick={(ev) => menuPortal.add(channelCreationModal, ev.currentTarget)}>
				<Menu.Button>
					<IconPlus />
					<FormattedMessageGlobal id="app.tents.create" />
				</Menu.Button>
			</Menu.Item>
		</Menu.List>
	</Menu.Root>
{/snippet}

<Card.Root
	level="subtle"
	size="xl"
>
	<Card.Overflow
		align="stretch"
		flex={1}
	>
		<BonfireBanner.Root />
		<BonfireContent.Root />
		<Stack
			flex={1}
			{@attach rightClickMenu(menuPortal, emptyPlaceRightClick)}
		></Stack>
	</Card.Overflow>
</Card.Root>
