<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		login: {
			id: `app.auth.index.login`,
			defaultMessage: `Add an existing account`,
			description: `The card description of the login page`,
		},
		register: {
			id: `app.auth.index.register`,
			defaultMessage: `Create a new account`,
			description: `The card description of the register page`,
		},
	});
</script>

<script>
	import { FormattedMessage } from '@campground/locale';
	import { Card, Group, Section, Stack } from '@campground/ui';
	import { IconPlus, IconUserFilled, IconUserPlus } from '@tabler/icons-svelte';
	import { getSession } from '$lib/api/session/Session.svelte';

	const session = getSession();
</script>

<Stack gap={2}>
	<Section gap="sm">
		{#each session.savedAuth as savedAuth (savedAuth.handle)}
			<Card.Root>
				<Card.Content>
					<Group gap={1}>
						<IconUserFilled />
						{savedAuth.handle}
					</Group>
				</Card.Content>
				<Card.Link href={`/auth/login?identifier=${savedAuth.handle}&server=${savedAuth.server}`} />
			</Card.Root>
		{/each}
	</Section>
	<Section gap="sm">
		<Card.Root>
			<Card.Content>
				<Group gap={1}>
					<IconPlus />
					<FormattedMessage {...localeMessages.login} />
				</Group>
			</Card.Content>
			<Card.Link href="/auth/login" />
		</Card.Root>
		<Card.Root>
			<Card.Content>
				<Group gap={1}>
					<IconUserPlus />
					<FormattedMessage {...localeMessages.register} />
				</Group>
			</Card.Content>
			<Card.Link href="/auth/register" />
		</Card.Root>
	</Section>
</Stack>
