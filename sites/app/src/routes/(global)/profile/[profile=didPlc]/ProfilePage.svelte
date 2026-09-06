<script
	lang="ts"
	module
>
	const messages = defineMessages({
		social: {
			id: 'app.profiles.social',
			defaultMessage: 'Socials',
			description: 'Socials header in user profiles',
		},
		posts: {
			id: 'app.profiles.tabs.posts',
			defaultMessage: 'Posts',
			description: 'Posts tab header in user profiles',
		},
		postsAndReplies: {
			id: 'app.profiles.tabs.postsAndReplies',
			defaultMessage: 'Posts & Replies',
			description: 'Posts & replies tab header in user profiles',
		},
	});
</script>

<script lang="ts">
	import UserAvatar from '$lib/components/users/UserAvatar.svelte';
	import UserBanner from '$lib/components/users/UserBanner.svelte';
	import { getAppview } from '$lib/context/api.js';
	import { PagePlaceholder, Para, Tabs } from '@campground/ui';
	import { LocaleMessage } from '@campground/locale';
	import { IconArrowBack, IconFlameFilled } from '@tabler/icons-svelte';
	import ProfileFeed from './ProfileFeed.svelte';
	import { getAccount } from '$lib/context/account.svelte.js';
	import ProfilePostCreator from './ProfilePostCreator.svelte';
	import ProfilePageColumn from './ProfilePageColumn.svelte';
	import ProfilePageHeader from './ProfilePageHeader.svelte';
	import ProfileFeedSkeleton from './ProfileFeedSkeleton.svelte';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { localeStrings } from '$lib/locale/index.js';

	const appview = getAppview();
	const currentUser = getAccount();

	let mainProfileFeed: ProfileFeed | null = $state(null);

	function onPostCreate(content: string) {
		const createdAt = new Date().toISOString();

		return appview.atproto.profilePostRecords
			.create({ content, createdAt, updatedAt: createdAt })
			.then(({ uri }) => {
				mainProfileFeed?.onAddPost({
					uri,
					parentUri: null,
					content,
					createdAt,
					updatedAt: createdAt,
					indexedAt: createdAt,
					parent: null,
					author: {
						did: currentUser.sessionInfo!.did,
						handle: currentUser.sessionInfo!.handle,
						...currentUser.profile!,
					},
					replyCount: 0,
				});
			})
			.catch((err) => console.error('Error creating a post', err));
	}

	interface Props {
		did: string;
	}

	const { did }: Props = $props();

	const profile = $derived(await appview.profiles.get(did));
</script>

<ProfilePageHeader>
	{#snippet banner()}
		<UserBanner
			{did}
			src={profile.banner}
			aspectRatio={8}
		/>
	{/snippet}
	{#snippet avatar()}
		<UserAvatar
			did={profile.did}
			src={profile.avatar}
			size="xxxl"
		/>
	{/snippet}
	{#snippet displayName()}
		{profile.displayName ?? profile.did}
	{/snippet}
	{#snippet handle()}
		@{profile.handle}
	{/snippet}
	{#snippet tagline()}
		{profile.tagline}
	{/snippet}
</ProfilePageHeader>
<ProfilePageColumn>
	<Para level="h2">
		<LocaleMessage {...messages.social} />
	</Para>
	<PagePlaceholder.Root icon={PagePlaceholder.Icon.WIP}>
		{#snippet title()}
			WIP
		{/snippet}
		WIP
	</PagePlaceholder.Root>
</ProfilePageColumn>
<ProfilePageColumn>
	{#if did === currentUser.sessionInfo?.did}
		<ProfilePostCreator onSubmit={onPostCreate} />
	{/if}
	<Tabs.Root>
		{#snippet tabs()}
			<Tabs.Item>
				<IconFlameFilled />
				<LocaleMessage {...messages.posts} />
			</Tabs.Item>
			<Tabs.Item>
				<IconArrowBack />
				<LocaleMessage {...messages.postsAndReplies} />
			</Tabs.Item>
		{/snippet}
		<Tabs.AsyncTab>
			{#snippet skeleton()}
				<ProfileFeedSkeleton />
			{/snippet}
			<ProfileFeed
				bind:this={mainProfileFeed}
				{did}
			/>
		</Tabs.AsyncTab>
		<Tabs.AsyncTab>
			{#snippet skeleton()}
				<ProfileFeedSkeleton />
			{/snippet}
			<ProfileFeed
				{did}
				withReplies
			/>
		</Tabs.AsyncTab>
	</Tabs.Root>
</ProfilePageColumn>
<ProfilePageColumn>
	<Para level="h2">
		<LocaleMessage {...localeStrings.users.about} />
	</Para>
	{#if profile.description}
		<Para level="paragraph">
			{profile.description}
		</Para>
	{/if}
</ProfilePageColumn>
