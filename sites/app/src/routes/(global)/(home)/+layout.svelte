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
	import { LocaleMessage, siteLocale } from '@campground/locale';
	import {
		IconCampfireFilled,
		IconCirclePlusFilled,
		IconCompassFilled,
		IconFlameFilled,
	} from '@tabler/icons-svelte';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { localeStrings } from '$lib/locale/index.js';

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
					>
						{#snippet header()}
							<LocaleMessage id="site.social" />
						{/snippet}
						<HomeNavbarButton
							color="primary"
							href="/"
						>
							<IconFlameFilled />
							<LocaleMessage {...messages.whatsNew} />
						</HomeNavbarButton>
						<HomeNavbarButton href="/discover">
							<IconCompassFilled />
							<LocaleMessage {...siteLocale.discovery} />
						</HomeNavbarButton>
					</Accordion>
					<Accordion
						noBackground
						expanded={true}
					>
						{#snippet header()}
							<LocaleMessage {...siteLocale.campsites} />
						{/snippet}
						<HomeNavbarButton href="/campsites/create">
							<IconCirclePlusFilled />
							<LocaleMessage {...localeStrings.campsites.create} />
						</HomeNavbarButton>
						<HomeNavbarButton href="/campsites">
							<IconCampfireFilled />
							<LocaleMessage {...messages.myCampsites} />
						</HomeNavbarButton>
					</Accordion>
				</Stack>
			</div>
		</Card.Overflow>
	</Card.Root>
	{@render children()}
</div>

<style lang="scss">
	.container {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 20rem 1fr 20rem;
		grid-template-rows: 1fr;
		padding: 0.5rem;
	}
	.side {
		padding: 0.5rem 0.5rem;
	}
</style>
