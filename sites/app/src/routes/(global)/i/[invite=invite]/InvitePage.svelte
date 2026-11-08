<script
	lang="ts"
	module
>
	const messages = defineMessages({
		header: {
			id: `app.invites.header`,
			defaultMessage: `Do you want to join this campsite?`,
			description: `The header for invite page allowing user to join the campsite.`,
		},
		invitedBy: {
			id: `app.invites.invitedBy`,
			defaultMessage: `Invited by {user}`,
			description: `Indicates who created the invite`,
		},
	});
</script>

<script lang="ts">
	import { getAuth } from '#lib/context/auth/context.svelte.ts';
	import { CampsiteCard } from '#lib/components/pages/index.js';
	import { getAppview } from '#lib/context/api.js';
	import { localeStrings } from '#lib/locale/index.js';
	import { goto } from '$app/navigation';
	import { LocaleMessage } from '@campground/locale';
	import { Button, Group, Para, Stack } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconUserFilled } from '@tabler/icons-svelte';

	const { id, domain }: { id: string; domain: string } = $props();

	const session = getAuth();
	const appview = getAppview();
	const invite = $derived(await appview.invites.get(id));
	const campsite = $derived(invite.campsite);

	async function onAccept() {
		return appview.invites.use(id).then(() => {
			session.preferences.addInstance(domain);
			goto(`/c/${campsite.id}@${domain}/t/bulletin`);
		});
	}
	function onDeny() {
		return goto('/');
	}
</script>

<Stack
	align="stretch"
	gap={0.5}
>
	<CampsiteCard.Root
		{campsite}
		size="lg"
		hideDescription
		hideName
	/>
	<Para
		mt="lg"
		level="sub0"
		textAlign="center"
	>
		<LocaleMessage {...messages.header} />
	</Para>
	<Para
		level="h2"
		textAlign="center"
		align="center"
	>
		{campsite.name}
	</Para>
	{#if campsite.description}
		<Para
			textAlign="center"
			align="center"
		>
			{campsite.description}
		</Para>
	{/if}
	<Para
		level="sub0"
		textAlign="center"
		align="center"
	>
		<Group
			justify="center"
			gap={0.5}
		>
			<IconUserFilled />
			<LocaleMessage
				{...localeStrings.campsites.membersCount}
				values={{ count: campsite.memberCount }}
			/>
		</Group>
	</Para>
</Stack>
<Group
	gap={1}
	align="center"
	justify="center"
>
	<Button
		color="success"
		padding="double"
		onclick={onAccept}
		size="lg"
	>
		<LocaleMessage {...localeStrings.common.accept} />
	</Button>
	<Button
		color="danger"
		variant="plain"
		padding="double"
		size="lg"
		onclick={onDeny}
	>
		<LocaleMessage {...localeStrings.common.deny} />
	</Button>
</Group>
