<script lang="ts">
	import UserAvatar from '$lib/components/users/UserAvatar.svelte';
	import UserBanner from '$lib/components/users/UserBanner.svelte';
	import { getAppview } from '$lib/context/api.js';
	import { PagePlaceholder, PagePlaceholderIcon, Para, Tabs } from '@campground/ui';
	import { FormattedMessageGlobal } from '@campground/locale';
	import { IconArrowBack, IconFlameFilled } from '@tabler/icons-svelte';
	import ProfileFeed from './ProfileFeed.svelte';
	import { getAccount } from '$lib/context/account.svelte.js';
	import ProfilePostCreator from './ProfilePostCreator.svelte';
	import ProfilePageColumn from './ProfilePageColumn.svelte';
	import ProfilePageHeader from './ProfilePageHeader.svelte';
	import ProfileFeedSkeleton from './ProfileFeedSkeleton.svelte';

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
		<FormattedMessageGlobal id="site.social" />
	</Para>
	<PagePlaceholder icon={PagePlaceholderIcon.WIP}>
		{#snippet title()}
			WIP
		{/snippet}
		WIP
	</PagePlaceholder>
</ProfilePageColumn>
<ProfilePageColumn>
	{#if did === currentUser.sessionInfo?.did}
		<ProfilePostCreator onSubmit={onPostCreate} />
	{/if}
	<Tabs.Root>
		{#snippet tabs()}
			<Tabs.Item>
				<IconFlameFilled />
				<FormattedMessageGlobal id="app.profiles.feed" />
			</Tabs.Item>
			<Tabs.Item>
				<IconArrowBack />
				<FormattedMessageGlobal id="app.profiles.replies" />
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
		<FormattedMessageGlobal id="info.about.me" />
	</Para>
	{#if profile.description}
		<Para level="paragraph">
			{profile.description}
		</Para>
	{/if}
</ProfilePageColumn>
