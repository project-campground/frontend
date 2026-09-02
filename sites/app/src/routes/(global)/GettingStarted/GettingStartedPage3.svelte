<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		header: {
			id: 'app.gettingStarted.socials.header',
			defaultMessage: 'Connect to your socials',
			description: 'Getting started socials header',
		},
		description: {
			id: 'app.gettingStarted.socials.desc',
			defaultMessage: 'Add social media you use to your profile.',
			description: 'Getting started socials description',
		},
	});
</script>

<script lang="ts">
	import { LocaleMessage } from '@campground/locale';

	import { FlexCenter, PagePlaceholder, PagePlaceholderIcon, Para, Stack } from '@campground/ui';
	import { Form } from '@campground/form';
</script>

<div class="page">
	<Form>
		<Stack>
			<Para level="h1">
				<LocaleMessage {...localeMessages.header} />
			</Para>
			<Para level="paragraph">
				<LocaleMessage {...localeMessages.description} />
			</Para>
		</Stack>
		<FlexCenter>
			<PagePlaceholder icon={PagePlaceholderIcon.WIP}>
				{#snippet title()}
					WIP
				{/snippet}
				<Para>WIP</Para>
			</PagePlaceholder>
		</FlexCenter>
	</Form>
</div>
