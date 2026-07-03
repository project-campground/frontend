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
	import { FormattedMessage, FormattedMessageGlobal } from '@campground/locale';
	import { Card, Group, Stack } from '@campground/ui';
	import { IconPlus, IconUserPlus } from '@tabler/icons-svelte';
</script>

<Stack>
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
</Stack>
