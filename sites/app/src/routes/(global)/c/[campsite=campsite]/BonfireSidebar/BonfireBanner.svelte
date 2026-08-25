<script
	lang="ts"
	module
>
	const messages = defineMessages({
		bannerHint: {
			id: 'app.campsites.bonfires.hint',
			defaultMessage: 'Click to show the list of bonfires',
			description: 'Hint to click on the campsite banner in left sidebar to show bonfire list',
		},
	});
</script>

<script lang="ts">
	import FadingBox from '$lib/components/content/FadingBox/FadingBox.svelte';
	import ProfileBanner from '$lib/components/pages/ProfileBanner.svelte';
	import { FormattedMessage } from '@campground/locale';
	import { Group, Para, Stack, Skeleton, loremIpsum, Avatar, Button } from '@campground/ui';
	import { getCampsiteContext } from '../context.svelte.ts';
	import { defineMessages } from '@formatjs/svelte-intl';
	import ProfileAvatarWrapper from '$lib/components/pages/ProfileAvatarWrapper.svelte';
	import ProfileAvatar from '$lib/components/pages/ProfileAvatar.svelte';
	import { IconDotsFilled } from '@tabler/icons-svelte';

	const campsiteContext = getCampsiteContext();
	const currentBonfire = $derived(campsiteContext.tents?.bonfire);
</script>

<header class="header">
	<div class="banner">
		<FadingBox>
			{#if currentBonfire}
				<ProfileBanner
					id={currentBonfire.id}
					src={currentBonfire.bannerUri}
					aspectRatio={2.5}
				/>
			{:else}
				<Skeleton
					aspectRatio={2.5}
					w="100%"
				></Skeleton>
			{/if}
		</FadingBox>
	</div>
	<div class="content">
		<div class="hint">
			<FormattedMessage {...messages.bannerHint} />
		</div>
		<Group gap={0.5}>
			{#if currentBonfire}
				<ProfileAvatarWrapper>
					<ProfileAvatar
						size="sm"
						id={currentBonfire.id}
						src={currentBonfire.avatarUri ?? undefined}
					>
						{currentBonfire.name[0].toUpperCase()}
					</ProfileAvatar>
				</ProfileAvatarWrapper>
				<Stack
					gap={0}
					flex={1}
				>
					<Para level="h4">
						{currentBonfire?.name}
					</Para>
					<Para level="sub0">
						{currentBonfire?.description}
					</Para>
				</Stack>
				<Group>
					<Button
						size="sm"
						padding="equal"
						color="neutral"
						variant="plain"
					>
						<IconDotsFilled size="1.5rem" />
					</Button>
				</Group>
			{:else}
				<Skeleton>
					<ProfileAvatarWrapper>
						<Avatar size="sm" />
					</ProfileAvatarWrapper>
				</Skeleton>
				<Stack gap={0}>
					<Para level="h4">
						<Skeleton>
							{loremIpsum.sm}
						</Skeleton>
					</Para>
					<Para level="sub0">
						<Skeleton>
							{loremIpsum.sm}
						</Skeleton>
					</Para>
				</Stack>
			{/if}
		</Group>
	</div>
</header>

<style lang="scss">
	@use '@campground/ui' as *;

	.header {
		position: relative;
		margin: 0.5rem;
		aspect-ratio: 2.5;
		padding: 0 1rem;
		cursor: pointer;
		z-index: 2;

		& > :global(div) {
			height: 100%;
		}
	}
	.banner {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		opacity: 25%;
		z-index: -2;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		z-index: 4;
	}
	.hint {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;

		flex: 1;
		font-size: 0.9em;
		font-weight: 700;
		color: var(--foreground-subheading);

		transition: opacity $transition-time-md;

		opacity: 0;
		user-select: none;

		.header:hover & {
			opacity: 50%;
		}
	}
</style>
