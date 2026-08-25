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
	import { FormattedMessage } from '@campground/locale';
	import { Group } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import type { Snippet } from 'svelte';

	const { banner, children }: { banner: Snippet; children: Snippet } = $props();
</script>

<header class="header">
	<div class="banner">
		<FadingBox>
			{@render banner()}
		</FadingBox>
	</div>
	<div class="content">
		<div class="hint">
			<FormattedMessage {...messages.bannerHint} />
		</div>
		<Group gap={0.5}>
			{@render children()}
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
