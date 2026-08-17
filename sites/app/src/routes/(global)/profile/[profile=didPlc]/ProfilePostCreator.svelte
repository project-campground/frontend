<script
	lang="ts"
	module
>
	const messages = defineMessages({
		placeholder: {
			id: 'app.profiles.post.placeholder',
			defaultMessage: 'What are you thinking?',
			description: 'The placeholder for creating posts on profiles.',
		},
	});
</script>

<script lang="ts">
	import BasicPostEditor from '$lib/components/editor/BasicPostEditor.svelte';

	import UserAvatar from '$lib/components/users/UserAvatar.svelte';
	import { getAccount } from '$lib/context/account.svelte.js';
	import { FormattedMessage, getLocaleContext } from '@campground/locale';
	import { Card, Group } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconPencilFilled } from '@tabler/icons-svelte';

	let open = $state(false);
	const currentUser = getAccount();
	const intl = getLocaleContext();

	const { onSubmit }: { onSubmit: (value: string) => unknown } = $props();
</script>

<Card.Root>
	{#if open}
		<BasicPostEditor
			onCancel={() => (open = false)}
			{onSubmit}
			placeholder={$intl.formatMessage(messages.placeholder)}
		></BasicPostEditor>
	{:else}
		<Card.Content>
			<Group wrap="nowrap">
				<span class="avatar">
					<UserAvatar
						did={currentUser.sessionInfo!.did}
						src={currentUser.profile?.avatar}
					/>
				</span>
				<span class="placeholder">
					<span class="icon">
						<IconPencilFilled />
					</span>
					<FormattedMessage {...messages.placeholder} />
				</span>
			</Group>
		</Card.Content>
		<Card.Click onclick={() => (open = true)}></Card.Click>
	{/if}
</Card.Root>

<style lang="scss">
	@use '@campground/ui' as *;

	.avatar {
		width: fit-content;
		height: fit-content;
		@include desktop-sm-down {
			display: none;
		}
	}
	.icon {
		margin-right: 0.5ch;
		line-height: 0;
		vertical-align: center;

		@include mobile-only {
			display: none;
		}
	}
	.placeholder {
		font-weight: 700;
		font-size: 1.25em;
		color: var(--foreground-subheading);
	}
</style>
