<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		welcomeHeader: {
			id: 'app.gettingStarted.welcome.header',
			defaultMessage: 'Welcome to Campground!',
			description: 'Getting started welcome header',
		},
		welcomeDescription: {
			id: 'app.gettingStarted.welcome.desc',
			defaultMessage:
				"Before we start, you need to create your profile for Campground. Don''t worry, this is a single time only process.",
			description: 'Getting started welcome description',
		},
	});
</script>

<script lang="ts">
	import { LocaleMessage } from '@campground/locale';

	import { FlexCenter, PagePlaceholder, PagePlaceholderIcon, Para } from '@campground/ui';
</script>

<FlexCenter>
	<PagePlaceholder icon={PagePlaceholderIcon.Welcome}>
		{#snippet title()}
			<LocaleMessage {...localeMessages.welcomeHeader} />
		{/snippet}
		<Para>
			<LocaleMessage {...localeMessages.welcomeDescription} />
		</Para>
	</PagePlaceholder>
</FlexCenter>
