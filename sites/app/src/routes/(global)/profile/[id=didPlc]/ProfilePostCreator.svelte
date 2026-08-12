<script
	lang="ts"
	module
>
	const messages = defineMessages({
		placeholder: {
			id: 'app.profiles.post.placeholder',
			defaultMessage: 'What is on your mind today?',
			description: 'The placeholder for creating posts on profiles.',
		},
	});
</script>

<script lang="ts">
	import UserAvatar from '$lib/components/users/UserAvatar.svelte';
	import { getAccount } from '$lib/context/account.svelte.js';
	import { FormattedMessage } from '@campground/locale';
	import { Card, Group, TextBlock } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconPencilFilled } from '@tabler/icons-svelte';

	let open = $state(false);
	const currentUser = getAccount();
</script>

<Card.Root>
	{#if open}
		Open
	{:else}
		<Card.Content>
			<Group>
				<UserAvatar src={currentUser.profile?.avatar} />
				<TextBlock
					level="subheading"
					weight={700}
					fontSize={1.25}
				>
					<span class="icon">
						<IconPencilFilled />
					</span>
					<FormattedMessage {...messages.placeholder} />
				</TextBlock>
			</Group>
		</Card.Content>
		<Card.Click onclick={() => (open = true)}></Card.Click>
	{/if}
</Card.Root>

<style lang="scss">
	.icon {
		margin-right: 0.5ch;
	}
</style>
