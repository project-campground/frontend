<script lang="ts">
	import ProfileAvatar from '#lib/components/pages/ProfileAvatar.svelte';
	import type { BonfireViewBasic } from '#lib/types/campground/bonfires.js';
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
	import { getAppview } from '#lib/context/api.js';
	import { localeStrings } from '#lib/locale/index.js';
	import { BonfireSettings } from '#lib/components/settings/index.js';
	import { v4 } from 'uuid';

	const { bonfire, onClick }: { bonfire: BonfireViewBasic; onClick?: () => unknown } = $props();

	const menuPortal = getMenuPortal();
	const campsiteContext = getCampsiteContext();
</script>

{#snippet settings(instance: MenuPortalInstance<'delete'>)}
	<BonfireSettings
		defaultPage={instance.payload}
		{instance}
		{bonfire}
	/>
{/snippet}

{#snippet contextMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root
		{instance}
		virtual={instance.payload}
	>
		<Menu.List>
			<Menu.Group>
				<Menu.Button onclick={(ev) => menuPortal.add(settings, ev.currentTarget)}>
					<IconSettingsFilled />
					<LocaleMessage {...localeStrings.bonfires.settings} />
				</Menu.Button>
				<Menu.Button
					color="danger"
					onclick={(ev) => menuPortal.add(settings, ev.currentTarget, v4(), 'delete')}
					disabled={(campsiteContext.bonfires?.length ?? 1) < 2}
				>
					<IconTrashFilled />
					<LocaleMessage {...localeStrings.bonfires.delete} />
				</Menu.Button>
			</Menu.Group>
		</Menu.List>
	</Menu.Root>
{/snippet}

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
