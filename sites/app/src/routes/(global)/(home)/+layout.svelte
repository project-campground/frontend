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
	import { Divider, Stack, Card, Accordion } from '@campground/ui';
	import type { LayoutProps } from './$types.js';
	import HomeNavbarButton from './HomeNavbarButton.svelte';
	import { FormattedMessage, FormattedMessageGlobal } from '@campground/locale';
	import {
		IconCampfireFilled,
		IconCirclePlusFilled,
		IconCompassFilled,
		IconFlameFilled,
		IconTent,
	} from '@tabler/icons-svelte';
	import { defineMessages } from '@formatjs/svelte-intl';
	import UserAvatar from '$lib/components/users/UserAvatar.svelte';
	import { getAccount } from '$lib/context/account.svelte.js';

	const account = getAccount();

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
						<HomeNavbarButton color="primary">
							<IconFlameFilled />
							<FormattedMessage {...messages.whatsNew} />
						</HomeNavbarButton>
						<HomeNavbarButton>
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
						<HomeNavbarButton>
							<IconCirclePlusFilled />
							<FormattedMessageGlobal id="app.campsites.create" />
						</HomeNavbarButton>
						<HomeNavbarButton>
							<IconCampfireFilled />
							<FormattedMessage {...messages.myCampsites} />
						</HomeNavbarButton>
					</Accordion>
				</Stack>
			</div>
		</Card.Overflow>
	</Card.Root>
	<div class="wrapper">
		<Card.Root level="subtle">
			<Card.Overflow>
				{@render children()}
			</Card.Overflow>
		</Card.Root>
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
