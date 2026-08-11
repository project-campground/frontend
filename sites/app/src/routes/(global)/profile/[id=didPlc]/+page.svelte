<script lang="ts">
	import UserAvatar from '$lib/components/users/UserAvatar.svelte';
	import UserBanner from '$lib/components/users/UserBanner.svelte';
	import { getAppview } from '$lib/context/api.js';
	import { PagePlaceholder, PagePlaceholderIcon, Para, Tabs } from '@campground/ui';
	import type { PageProps } from './$types.js';
	import { FormattedMessageGlobal } from '@campground/locale';
	import { IconArrowBack, IconFlameFilled } from '@tabler/icons-svelte';

	const appview = getAppview();
	const { params }: PageProps = $props();
</script>

<div class="container">
	{#await appview.profiles.get(params.id)}
		<p>Example profile {params.id}</p>
	{:then profile}
		<header class="top">
			<UserBanner
				src={profile.banner}
				aspectRatio={12}
			/>
			<div class="avatar">
				<UserAvatar
					src={profile.avatar}
					size="xl"
				/>
			</div>
			<div class="info">
				<Para
					level="h1"
					align="center">{profile.displayName ?? profile.did}</Para
				>
				<Para
					level="sub0"
					align="center">@{profile.handle}</Para
				>
				{#if profile.tagline}
					<Para
						level="paragraph"
						align="center">{profile.tagline}</Para
					>
				{/if}
			</div>
		</header>
		<aside class="socials">
			<Para level="h2">
				<FormattedMessageGlobal id="site.social" />
			</Para>
			<PagePlaceholder icon={PagePlaceholderIcon.WIP}>
				{#snippet title()}
					WIP
				{/snippet}
				WIP
			</PagePlaceholder>
		</aside>
		<div class="content">
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
				<Tabs.Tab>Aaaa</Tabs.Tab>
				<Tabs.Tab>Bbbb</Tabs.Tab>
			</Tabs.Root>
		</div>
		<aside class="about">
			<Para level="h2">
				<FormattedMessageGlobal id="info.about.me" />
			</Para>
			{#if profile.description}
				<Para level="paragraph">
					{profile.description}
				</Para>
			{/if}
		</aside>
	{/await}
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: grid;
		width: 100%;
		grid-template-columns: 5rem 3fr 7fr 3fr 5rem;
		grid-template-rows: auto 1fr;
		background-color: var(--background-subtle);
		padding: 1rem;
		box-sizing: border-box;
		gap: 2rem 5rem;
	}
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		grid-column: 1 / 6;
		gap: 0.5rem;
		height: fit-content;
		@include tablet-down {
			grid-column: 2 / 3;
		}
	}
	.avatar {
		margin-top: -3.5rem;
		padding: 0.25rem;
		background-color: var(--background-subtle);
		@extend %Squircle;
	}
	.socials {
		grid-column: 2 / 3;
	}
	.content {
		grid-column: 3 / 4;
	}
	.about {
		grid-column: 4 / 5;
	}
	.socials,
	.content,
	.about {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		grid-row: 2;
	}
</style>
