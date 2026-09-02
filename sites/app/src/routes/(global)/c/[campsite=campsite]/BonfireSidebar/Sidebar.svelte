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
	import { LocaleMessage } from '@campground/locale';
	import { TentCreation } from '../Modals/TentCreation/index.ts';
	import { localeStrings } from '$lib/locale/index.js';
	import { getCampsiteContext } from '../context.svelte.ts';

	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsite);

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
					<LocaleMessage {...localeStrings.tents.create} />
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
		{#if !$campsite}
			<BonfireBanner.Skeleton />
			<BonfireContent.Skeleton />
		{:else}
			<BonfireBanner.Root />
			<BonfireContent.Root />
			<Stack
				flex={1}
				{@attach rightClickMenu(menuPortal, emptyPlaceRightClick)}
			></Stack>
		{/if}
	</Card.Overflow>
</Card.Root>
