<script
	lang="ts"
	module
>
	const messages = defineMessages({
		emptyCampsiteList: {
			id: 'app.navbar.emptyList',
			defaultMessage: 'Join campsites to fill this list!',
			description: 'Link to discover campsites when the campsite list is empty',
		},
	});
</script>

<script lang="ts">
	import { Link, Svg } from '@campground/ui';
	import GlobalNavbarButton from './NavbarButton.svelte';
	import CampsiteButton from './CampsiteButton.svelte';
	import NavbarProfile from './NavbarProfile.svelte';
	import { getAccount } from '$lib/context/account.svelte.js';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { FormattedMessage } from '@campground/locale';
	import { getSession } from '$lib/api/session/Session.svelte.ts';

	const account = getAccount();
	const session = getSession();
</script>

<div class="GlobalNavbar container">
	<div class="GlobalNavbar stack">
		<GlobalNavbarButton
			href="/"
			activeExcept={['/c/', '/profile/']}
		>
			<Svg.Logo size={2.5} />
		</GlobalNavbarButton>
	</div>
	<div class="GlobalNavbar divider"></div>
	<div class="GlobalNavbar campsites stack">
		{#if !session.preferences.full.nav?.items.length}
			<Link
				color="neutral"
				href="/discover"
			>
				<FormattedMessage {...messages.emptyCampsiteList} />
			</Link>
		{/if}
		{#each session.preferences.full?.nav?.items ?? [] as item (item.id)}
			{#if item.$type === 'gg.campground.actor.defs#navCampsitePref'}
				<CampsiteButton
					id={campsite.id}
					name={campsite.name}
					isSelected={false}
					domain={campsite._domain}
					memberCount={campsite.memberCount}
				/>
			{/if}
		{/each}
	</div>
	<div class="GlobalNavbar divider"></div>
	<div class="GlobalNavbar stack">
		<NavbarProfile />
	</div>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.divider {
		width: 2px;
		height: calc(100% - 1rem);
		background-color: var(--neutral-border);
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		scroll-snap-align: start;

		gap: 1rem;

		@include tablet-up {
			padding: 0 0.5rem;
			width: calc(100vw - 1rem);
			align-items: center;
			flex-direction: row;
		}
	}
	.campsites {
		flex: 1;
		overflow-x: hidden;
		overflow-y: auto;
		@include tablet-up {
			overflow-y: hidden;
			overflow-x: auto;
			align-items: center;
			flex-direction: row;
		}
	}
	.stack {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
		@include tablet-up {
			align-items: center;
			flex-direction: row;
		}
	}
</style>
