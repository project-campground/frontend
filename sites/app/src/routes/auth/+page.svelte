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
	import { Card, Group, Section, Stack, Divider, TextBlock, Button } from '@campground/ui';
	import { IconPlus, IconUserFilled, IconUserPlus, IconX } from '@tabler/icons-svelte';
	import { getSession } from '$lib/api/session/Session.svelte';

	const session = getSession();
</script>

<Stack gap={1}>
	{#if session.savedAuth?.length}
		<Section gap="sm">
			{#each session.savedAuth as savedAuth (savedAuth.handle)}
				<Card.Root>
					<Card.Content>
						<Group gap={1}>
							<IconUserFilled />
							<span class="name">
								{savedAuth.handle}
							</span>
							<span class="delete">
								<Button
									size="xs"
									variant="plain"
									color="danger"
									onclick={() => session.removeSavedAccount(savedAuth)}
								>
									<IconX size="1rem" />
								</Button>
							</span>
						</Group>
					</Card.Content>
					<Card.Click href={`/auth/login?identifier=${savedAuth.handle}&server=${savedAuth.server}`} />
				</Card.Root>
			{/each}
		</Section>
		<Divider />
	{/if}
	<Section gap="sm">
		<Card.Root>
			<Card.Content>
				<Group gap={1}>
					<IconPlus />
					<FormattedMessage {...localeMessages.login} />
				</Group>
			</Card.Content>
			<Card.Click href="/auth/login" />
		</Card.Root>
		<Card.Root>
			<Card.Content>
				<Group gap={1}>
					<IconUserPlus />
					<FormattedMessage {...localeMessages.register} />
				</Group>
			</Card.Content>
			<Card.Click href="/auth/register" />
		</Card.Root>
	</Section>
</Stack>

<style lang="scss">
	.name {
		flex: 1;
	}
	.delete {
		z-index: 10;
	}
</style>
