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
	import { LocaleMessage } from '@campground/locale';
	import { getAppview } from '$lib/context/api.js';
	import { localeStrings } from '$lib/locale/index.js';

	async function deleteBonfire() {
		return appview.bonfires.delete(bonfire.campsiteId, bonfire.id);
	}

	const { bonfire, onClick }: { bonfire: BonfireViewBasic; onClick?: () => unknown } = $props();

	const menuPortal = getMenuPortal();
	const appview = getAppview();
	const campsiteContext = getCampsiteContext();
</script>

{#snippet contextMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root {instance}>
		<Menu.List>
			<Menu.Item>
				<Menu.Button>
					<IconSettingsFilled />
					<LocaleMessage {...localeStrings.bonfires.settings} />
				</Menu.Button>
			</Menu.Item>
			<Menu.Item>
				<Menu.Button
					color="danger"
					onclick={deleteBonfire}
					disabled={(campsiteContext.bonfires?.length ?? 1) < 2}
				>
					<IconTrashFilled />
					<LocaleMessage {...localeStrings.bonfires.delete} />
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
			<Stack
				align="start"
				gap={0}
			>
				<Para level="h4">{bonfire.name}</Para>
				{#if bonfire.description}
					<Para level="sub0">{bonfire.description}</Para>
				{/if}
			</Stack>
		</Group>
	</Menu.Button>
</Menu.Item>
