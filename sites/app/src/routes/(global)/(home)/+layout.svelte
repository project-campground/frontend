<script
	lang="ts"
	module
>
	const messages = defineMessages({
		whatsNew: {
			id: 'app.home.whatsNew',
			defaultMessage: "What''s new?",
			description: 'What is new page on home',
		},
		myCampsites: {
			id: 'app.home.campsites',
			defaultMessage: 'My Campsites',
			description: 'The home page for campsite list',
		},
	});
</script>

<script lang="ts">
	import { Stack, Card, Accordion } from '@campground/ui';
	import type { LayoutProps } from './$types.js';
	import HomeNavbarButton from './HomeNavbarButton.svelte';
	import { FormattedMessage, FormattedMessageGlobal } from '@campground/locale';
	import {
		IconCampfireFilled,
		IconCirclePlusFilled,
		IconCompassFilled,
		IconFlameFilled,
	} from '@tabler/icons-svelte';
	import { defineMessages } from '@formatjs/svelte-intl';

	const { children }: LayoutProps = $props();
</script>

<div class="container">
	<Card.Root
		size="xl"
		level="subtle"
	>
		<Card.Overflow>
			<div class="side">
				<Stack
					gap={1}
					align="stretch"
				>
					<Accordion
						expanded={true}
						noBackground
						noPadding
					>
						{#snippet header()}
							<FormattedMessageGlobal id="site.social" />
						{/snippet}
						<HomeNavbarButton
							color="primary"
							href="/"
						>
							<IconFlameFilled />
							<FormattedMessage {...messages.whatsNew} />
						</HomeNavbarButton>
						<HomeNavbarButton href="/discover">
							<IconCompassFilled />
							<FormattedMessageGlobal id="site.discovery" />
						</HomeNavbarButton>
					</Accordion>
					<Accordion
						noBackground
						noPadding
						expanded={true}
					>
						{#snippet header()}
							<FormattedMessageGlobal id="site.campsites" />
						{/snippet}
						<HomeNavbarButton href="/create/campsite">
							<IconCirclePlusFilled />
							<FormattedMessageGlobal id="app.campsites.create" />
						</HomeNavbarButton>
						<HomeNavbarButton href="/campsites">
							<IconCampfireFilled />
							<FormattedMessage {...messages.myCampsites} />
						</HomeNavbarButton>
					</Accordion>
				</Stack>
			</div>
		</Card.Overflow>
	</Card.Root>
	<div class="wrapper">
		{@render children()}
	</div>
</div>

<style lang="scss">
	.container {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 16rem 1fr;
		grid-template-rows: 1fr;
		padding: 0.5rem;
	}
	.side {
		padding: 0.5rem 0.5rem;
	}
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 16rem;
	}
</style>
