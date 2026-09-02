<script
	lang="ts"
	module
>
	const locale = defineMessages({
		'landing.inBrowser': {
			id: 'landing.inBrowser',
			defaultMessage: 'Open in Browser',
			description: 'Open Campground in browser button',
		},
		// Bonfires
		'landing.features.openSource': {
			id: 'landing.features.openSource',
			defaultMessage: 'Open Source',
			description: 'Open-source section in landing',
		},
		'landing.features.openSource.title': {
			id: 'landing.features.openSource.title',
			defaultMessage: 'Open for everyone & Copyleft',
			description: 'Open-source section title in landing',
		},
		'landing.features.openSource.desc': {
			id: 'landing.features.bonfires.desc',
			defaultMessage:
				'Not only is front-end open-source, but every bit of back-end of Campground is open-source under AGPLv3 license.',
			description: 'Open-source section description in landing',
		},
		// Bonfires
		'landing.features.bonfires': {
			id: 'landing.features.bonfires',
			defaultMessage: 'Bonfires',
			description: 'Bonfires section in landing',
		},
		'landing.features.bonfires.title': {
			id: 'landing.features.bonfires.title',
			defaultMessage: 'Organize channels with bonfires',
			description: 'Bonfires section title in landing',
		},
		'landing.features.bonfires.desc': {
			id: 'landing.features.bonfires.desc',
			defaultMessage:
				'May also be known as groups or sub-servers, bonfires are guild-like group of tents/channels with their own icons and banners.',
			description: 'Bonfires section description in landing',
		},
		// Profiles
		'landing.features.profiles': {
			id: 'landing.features.profiles',
			defaultMessage: 'Profiles',
			description: 'Profiles section in landing',
		},
		'landing.features.profiles.title': {
			id: 'landing.features.bonfires.title',
			defaultMessage: 'Highly customizable profiles',
			description: 'Profiles section title in landing',
		},
		'landing.features.profiles.desc': {
			id: 'landing.features.profiles.desc',
			defaultMessage:
				"Create posts and media, discover others, link game and more with Campground''s highly customizable profiles.",
			description: 'Bonfires section description in landing',
		},
		// Lists
		'landing.features.lists': {
			id: 'landing.features.lists',
			defaultMessage: 'Lists',
			description: 'Lists section in landing',
		},
		'landing.features.lists.title': {
			id: 'landing.features.bonfires.title',
			defaultMessage: 'To-do list tents',
			description: 'Lists section title in landing',
		},
		'landing.features.lists.desc': {
			id: 'landing.features.lists.desc',
			defaultMessage:
				'Create list tents (channels) and set up tasks to complete. Organize the tasks, mark them, add notes, create threads and more.',
			description: 'Lists section description in landing',
		},
		// Encryption
		'landing.features.encryption': {
			id: 'landing.features.encryption',
			defaultMessage: 'Encryption',
			description: 'Encryption section in landing',
		},
		'landing.features.encryption.title': {
			id: 'landing.features.bonfires.title',
			defaultMessage: 'E2EE Private messaging',
			description: 'Encryption section title in landing',
		},
		'landing.features.encryption.desc': {
			id: 'landing.features.encryption.desc',
			defaultMessage:
				'Secure your messages with end-to-end encryption for direct messages. Feel safe with Campground.',
			description: 'Encryption section description in landing',
		},
		// Instances
		'landing.features.instances': {
			id: 'landing.features.instances',
			defaultMessage: 'Instances',
			description: 'Instances section in landing',
		},
		'landing.features.instances.title': {
			id: 'landing.features.bonfires.title',
			defaultMessage: 'Create your own Campground',
			description: 'Instances section title in landing',
		},
		'landing.features.instances.desc': {
			id: 'landing.features.instances.desc',
			defaultMessage:
				'Host your own instance of Campground and manage YOUR OWN content without restriction of others. No one else, just you and your communities.',
			description: 'Instances section description in landing',
		},
		// Customization
		'landing.features.customization': {
			id: 'landing.features.customization',
			defaultMessage: 'Customization',
			description: 'Customization section in landing',
		},
		'landing.features.customization.title': {
			id: 'landing.features.bonfires.title',
			defaultMessage: 'Customize your own experience',
			description: 'Customization section title in landing',
		},
		'landing.features.customization.desc': {
			id: 'landing.features.customization.desc',
			defaultMessage:
				'Change the way Campground application looks with highly customizable themes with CSS and your own experience with add-ons. Do not like how app looks? Change it!',
			description: 'Customization section description in landing',
		},
	});
</script>

<script lang="ts">
	import { UAParser } from 'ua-parser-js';
	import BottomSection from '$lib/landing/BottomSection.svelte';

	import FeatureItem from '$lib/landing/FeatureItem.svelte';

	import FeatureList from '$lib/landing/FeatureList.svelte';

	import { LocaleMessage, commonLocale, siteLocale } from '@campground/locale';

	import { Button, Para } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import {
		IconBrandDebian,
		IconBrandOpenSourceFilled,
		IconCampfireFilled,
		IconPaletteFilled,
		IconServer2,
	} from '@tabler/icons-svelte';
	import FeatureDisplay from '$lib/landing/FeatureDisplay.svelte';
	import FeatureOpenSource from '$lib/landing/features/FeatureOpenSource.svelte';

	const { os } = UAParser(navigator.userAgent);
</script>

<svelte:head>
	<title>Campground — Gather around the fire, friends</title>
	<meta
		property="og:site_name"
		content="Campground"
	/>
	<meta
		property="og:title"
		content="Campground — Gather around the fire, friends"
	/>
	<meta
		property="og:description"
		content="Campground is the best place for you and your friends to hang out, create communities, and have fun without any hassle!"
	/>
	<meta
		property="og:locale"
		content="en_US"
	/>
	<meta
		property="og:locale:alternate"
		content="en_US"
	/>
	<meta
		property="og:locale:alternate"
		content="es_ES"
	/>
</svelte:head>

<div class="container">
	<section
		class="initial"
		id="try-campground"
	>
		<div class="initial-left">
			<div class="motto">
				<Para
					level="h1"
					fontSize={3.5}
					letterSpacing={0.1}
				>
					<LocaleMessage {...siteLocale.motto} />
				</Para>
				<Para
					level="paragraph"
					fontSize={1.5}
					letterSpacing={0.05}
					mt="md"
					align="justify"
				>
					<LocaleMessage {...siteLocale.description} />
				</Para>
			</div>
			<div class="buttons">
				<a href="/download">
					<Button size="lg">
						<IconBrandDebian />
						<LocaleMessage {...commonLocale.download} />
						<span class="buttons-label">({os.name})</span>
					</Button>
				</a>
				<a href="/app">
					<Button
						size="lg"
						variant="soft"
					>
						<LocaleMessage {...locale['landing.inBrowser']} />
					</Button>
				</a>
			</div>
		</div>
		<aside class="initial-right"></aside>
	</section>
	<FeatureList>
		{#snippet side(currentId)}
			<FeatureDisplay
				id="openSource"
				{currentId}
			>
				<FeatureOpenSource />
			</FeatureDisplay>
			<FeatureDisplay
				id="bonfires"
				{currentId}>Bonfires</FeatureDisplay
			>
			<FeatureDisplay
				id="lists"
				{currentId}>Lists</FeatureDisplay
			>
			<FeatureDisplay
				id="encryption"
				{currentId}>Encryption</FeatureDisplay
			>
			<FeatureDisplay
				id="instances"
				{currentId}>Instances</FeatureDisplay
			>
			<FeatureDisplay
				id="customization"
				{currentId}>Customization</FeatureDisplay
			>
		{/snippet}
		<FeatureItem
			id="openSource"
			color="success"
		>
			{#snippet title()}
				<LocaleMessage {...locale['landing.features.openSource.title']} />
			{/snippet}
			{#snippet subtitle()}
				<IconBrandOpenSourceFilled />
				<span>
					<LocaleMessage {...locale['landing.features.openSource']} />
				</span>
			{/snippet}
			<LocaleMessage {...locale['landing.features.openSource.desc']} />
		</FeatureItem>
		<FeatureItem
			id="bonfires"
			color="info"
		>
			{#snippet title()}
				<LocaleMessage {...locale['landing.features.bonfires.title']} />
			{/snippet}
			{#snippet subtitle()}
				<IconCampfireFilled />
				<span>
					<LocaleMessage {...locale['landing.features.bonfires']} />
				</span>
			{/snippet}
			<LocaleMessage {...locale['landing.features.bonfires.desc']} />
		</FeatureItem>
		<FeatureItem
			id="instances"
			color="primary"
		>
			{#snippet title()}
				<LocaleMessage {...locale['landing.features.instances.title']} />
			{/snippet}
			{#snippet subtitle()}
				<IconServer2 />
				<span>
					<LocaleMessage {...locale['landing.features.instances']} />
				</span>
			{/snippet}
			<LocaleMessage {...locale['landing.features.instances.desc']} />
		</FeatureItem>
		<FeatureItem
			id="customization"
			color="success"
		>
			{#snippet title()}
				<LocaleMessage {...locale['landing.features.customization.title']} />
			{/snippet}
			{#snippet subtitle()}
				<IconPaletteFilled />
				<span>
					<LocaleMessage {...locale['landing.features.customization']} />
				</span>
			{/snippet}
			<LocaleMessage {...locale['landing.features.customization.desc']} />
		</FeatureItem>
	</FeatureList>
	<BottomSection />
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.initial {
		padding: 0 var(--Layout-paddingX);
		height: calc(100vh - 72px);
		display: grid;
		grid-template-columns: 5fr 4fr;
	}
	.initial-left {
		display: flex;
		flex-direction: column;

		padding-top: calc(128px + 64px);
		gap: 24px;
	}
	.buttons {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 12px;
	}
	.buttons-label {
		padding: 2px 4px;
		border-radius: var(--radius-sm);
		background-color: var(--background-body);
		color: var(--primary-alt);
		font-weight: bold;
	}
	.buttons > a {
		display: inline-flex;
		text-decoration: none;
	}

	@include tablet-down {
		.initial {
			grid-template-columns: 1fr;
		}
		.initial-right {
			display: none;
		}
	}
</style>
