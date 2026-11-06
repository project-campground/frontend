<script lang="ts">
	import { Para } from '@campground/ui';
	import ProfileAvatar from '../ProfileAvatar.svelte';
	import ProfileBanner from '../ProfileBanner.svelte';
	import Layout from './Layout.svelte';
	import type { RootProps } from './props.ts';

	const { campsite, size, hideDescription, hideName }: RootProps = $props();
</script>

<Layout>
	{#snippet banner()}
		<ProfileBanner
			id={campsite.id.slice(-1)}
			src={campsite.bannerUri}
			aspectRatio={7}
		/>
	{/snippet}
	{#snippet avatar()}
		<ProfileAvatar
			id={campsite.id.slice(-1)}
			src={campsite.avatarUri ?? undefined}
			{size}
		>
			{campsite.name[0].toUpperCase()}
		</ProfileAvatar>
	{/snippet}
	{#if !hideName}
		<Para level="h2">
			{campsite.name}
		</Para>
	{/if}
	{#if campsite.description && !hideDescription}
		<Para mt="sm">
			{campsite.description}
		</Para>
	{/if}
</Layout>
