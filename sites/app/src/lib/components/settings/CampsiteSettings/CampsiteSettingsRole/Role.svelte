<script
	lang="ts"
	module
>
	const localeMessages = defineMessages({
		defaultDisabled: {
			id: 'app.roles.defaultDisabled',
			defaultMessage: 'The role cannot be deleted, because it is the default role.',
			description: 'The disabled role deletion button tooltip',
		},
	});
</script>

<script lang="ts">
	import type { RoleView } from '$lib/types/campground/roles.js';
	import {
		Button,
		getMenuPortal,
		GradientText,
		Menu,
		MenuPortalInstance,
		rightClickMenu,
		rightClickMenuProps,
		Tooltip,
		tooltip,
	} from '@campground/ui';
	import { getRoleSettings } from './context.svelte.ts';
	import { IconTrashFilled } from '@tabler/icons-svelte';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import { RoleFlag } from '$lib/util/constants.js';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { getAppview } from '$lib/context/api.js';

	const roleSettings = getRoleSettings();
	const menuPortal = getMenuPortal();
	const appview = getAppview();

	const { role }: { role: RoleView } = $props();
	const isActive = $derived(roleSettings.selected === role.id);
	const isDefault = $derived((role.flags & RoleFlag.Default) === RoleFlag.Default);

	function deleteRole() {
		return appview.roles.delete(role.campsiteId, role.id);
	}
</script>

{#snippet defaultDisabledTooltip(instance: MenuPortalInstance)}
	<Tooltip {instance}>
		<LocaleMessage {...localeMessages.defaultDisabled} />
	</Tooltip>
{/snippet}
{#snippet contextMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root {...rightClickMenuProps(instance)}>
		<Menu.List>
			<Menu.Item>
				<Menu.Button
					color="danger"
					disabled={isDefault}
					{@attach isDefault ? tooltip(menuPortal, defaultDisabledTooltip) : null}
					onclick={deleteRole}
				>
					<IconTrashFilled />
					<LocaleMessage {...localeStrings.roles.delete} />
				</Menu.Button>
			</Menu.Item>
		</Menu.List>
	</Menu.Root>
{/snippet}

<Button
	justify="start"
	variant={isActive ? 'selected' : 'plain'}
	color="neutral"
	onclick={() => (roleSettings.selected = role.id)}
	{@attach rightClickMenu(menuPortal, contextMenu)}
>
	<GradientText colors={role.colors.map((x) => `#${x.toString(16).padStart(6, '0')}`)}>
		{role.name}
	</GradientText>
</Button>
