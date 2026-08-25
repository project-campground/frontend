<script lang="ts">
	import ProfileAvatar from '$lib/components/pages/ProfileAvatar.svelte';
	import type { BonfireViewBasic } from '$lib/types/campground/bonfires.js';
	import {
		getMenuPortal,
		Group,
		Menu,
		Para,
		rightClickMenu,
		Stack,
		MenuPortalInstance,
	} from '@campground/ui';
	import { getCampsiteContext } from '../context.svelte.ts';
	import { IconSettingsFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import { FormattedMessageGlobal } from '@campground/locale';
	import { getAppview } from '$lib/context/api.js';

	async function deleteBonfire() {
		return appview.bonfires.delete(bonfire.campsiteId, bonfire.id);
	}

	const { bonfire, onClick }: { bonfire: BonfireViewBasic; onClick?: () => unknown } = $props();

	const menuPortal = getMenuPortal();
	const appview = getAppview();
	const campsiteContext = getCampsiteContext();
</script>

{#snippet contextMenu(instance: MenuPortalInstance)}
	<Menu.Root {instance}>
		<Menu.List>
			<Menu.Item>
				<Menu.Button>
					<IconSettingsFilled />
					<FormattedMessageGlobal id="app.bonfires.settings" />
				</Menu.Button>
			</Menu.Item>
			<Menu.Item>
				<Menu.Button
					color="danger"
					onclick={deleteBonfire}
					disabled={campsiteContext.campsite!.bonfires.length < 2}
				>
					<IconTrashFilled />
					<FormattedMessageGlobal id="app.bonfires.delete" />
				</Menu.Button>
			</Menu.Item>
		</Menu.List>
	</Menu.Root>
{/snippet}

<Menu.Item>
	<Menu.Button
		onclick={onClick}
		{@attach rightClickMenu(menuPortal, contextMenu)}
	>
		<Group>
			<ProfileAvatar
				size="sm"
				src={bonfire.avatarUri ?? undefined}
				id={bonfire.id.slice(-1)}
			>
				{bonfire.name[0].toUpperCase()}
			</ProfileAvatar>
			<Stack>
				<Para level="h4">{bonfire.name}</Para>
				{#if bonfire.description}
					<Para level="sub0">{bonfire.description}</Para>
				{/if}
			</Stack>
		</Group>
	</Menu.Button>
</Menu.Item>
