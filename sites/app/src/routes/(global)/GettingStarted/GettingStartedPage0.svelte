<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		welcomeHeader: {
			id: 'app.createProfile.welcome.header',
			defaultMessage: 'Welcome to Campground!',
			description: 'Getting started welcome header',
		},
		welcomeDescription: {
			id: 'app.createProfile.welcome.desc',
			defaultMessage:
				"Before we start, you need to create your profile for Campground. Don''t worry, this is a single time only process.",
			description: 'Getting started welcome description',
		},
	});
</script>

<script lang="ts">
	import { FormattedMessage } from '@campground/locale';

	import { FlexCenter, PagePlaceholder, PagePlaceholderIcon, Para } from '@campground/ui';
</script>

<FlexCenter>
	<PagePlaceholder icon={PagePlaceholderIcon.Welcome}>
		{#snippet title()}
			<FormattedMessage {...localeMessages.welcomeHeader} />
		{/snippet}
		<Para>
			<FormattedMessage {...localeMessages.welcomeDescription} />
		</Para>
	</PagePlaceholder>
</FlexCenter>
