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

	const {
		banner,
		children,
		onClick,
	}: { banner: Snippet; children: Snippet; onClick?: (ev: MouseEvent) => unknown } = $props();
</script>

<button
	class="header"
	onclick={onClick}
	oncontextmenu={onClick ? (ev) => (ev.preventDefault(), onClick(ev)) : null}
>
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
</button>

<style lang="scss">
	@use '@campground/ui' as *;

	.header {
		position: relative;

		display: block;
		text-align: left;
		font-size: 1rem;
		font-family: var(--font-body);

		cursor: pointer;

		background-color: transparent;
		border: none;
		outline: none;

		margin: 0.5rem;
		aspect-ratio: 2.5;
		padding: 0 1rem;
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
