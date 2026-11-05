<script lang="ts">
	import { localeStrings } from '#lib/locale/index.js';
	import { LocaleMessage } from '@campground/locale';
	import { Card, Para, Stack, Group, Button } from '@campground/ui';
	import { getCampsiteContext } from '../../../../../routes/(global)/c/[campsite=campsite]/context.svelte.js';
	import { getAppview } from '#lib/context/api.js';
	import { Form } from '@campground/form';
	import { getSettings } from '../../Settings/context.svelte.js';
	import PermissionItem from './PermissionButton.svelte';
	import type { CampsitePermissionView } from '#lib/types/campground/permissions.js';
	import type { PageProps } from './props.ts';
	import { setItemListSettings } from '../context.svelte.ts';
	import Permissions from './Permissions.svelte';
	import { IconPlusFilled } from '@tabler/icons-svelte';
	import { PermissionSettingsContext } from './context.svelte.ts';
	import Header from './Header.svelte';

	const campsiteContext = getCampsiteContext();
	const appview = getAppview();
	const settings = getSettings();

	const { ...locationQueries }: PageProps = $props();

	const defaultRole = $derived(campsiteContext.defaultRole!);
	// svelte-ignore state_referenced_locally
	const context = new PermissionSettingsContext(defaultRole);
	setItemListSettings(context);

	$effect(() => {
		appview.permissions.get(locationQueries).then((resp) => {
			context.permissionsOutput = resp;
			context.selected = context.defaultPermission;
		});
	});

	let form: Form | null = $state(null);

	$effect(() => {
		if (!form) return;

		settings.setForm(form.getForm());
	});

	async function updatePermission(data: Pick<CampsitePermissionView, 'permissions'>) {
		Object.assign(context.selected, data);

		return appview.permissions.update(
			{
				...locationQueries,
				roleId: context.selected.role?.id,
				actor: context.selected.member?.user.did,
			},
			data,
		);
	}
	$effect(() => {
		console.log('Permission list', $state.snapshot([...context.permissions]));
	});
</script>

<Card.Root
	size="lg"
	flex={1}
	level="subtle"
>
	<Card.Content gap="sm">
		<Para level="h3">
			<Header />
		</Para>
		<Stack gap={0.5}>
			{#each context.permissions as permission (permission.role?.id ?? permission.member?.user.did)}
				<PermissionItem {permission} />
			{/each}
		</Stack>
	</Card.Content>
</Card.Root>
<Card.Root
	size="lg"
	level="subtle"
>
	<Card.Content
		flex={1}
		overflow="hidden"
	>
		<Form
			bind:this={form}
			flex={1}
			hideOverflow
			onSubmit={(values) => updatePermission(values as { permissions: bigint })}
		>
			<Permissions queries={locationQueries} />
		</Form>
	</Card.Content>
</Card.Root>
