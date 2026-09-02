<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		header: {
			id: 'app.gettingStarted.appearance.header',
			defaultMessage: 'Make Campground yours!',
			description: 'Getting started create appearance header',
		},
		desc: {
			id: 'app.gettingStarted.appearance.desc',
			defaultMessage: 'Change the appearance of Campground.',
			description: 'Getting started create appearance description',
		},
	});
</script>

<script lang="ts">
	import { LocaleMessage } from '@campground/locale';

	import { Card, loremIpsum, Para, Section, Stack, theme } from '@campground/ui';
	import { Form, FormControl, FormLabel, FormRadio } from '@campground/form';
	import { localeStrings } from '$lib/locale/index.js';
</script>

{#snippet themePreview()}
	<Card.Root level="subtle">
		<Card.Content gap="sm">
			<Para level="h2">
				{loremIpsum.sm}
			</Para>
			<Para>
				{loremIpsum.md}
			</Para>
			<Card.Root>
				<Para>
					{loremIpsum.sm}
				</Para>
			</Card.Root>
		</Card.Content>
	</Card.Root>
{/snippet}

<div class="page">
	<Form>
		<Stack>
			<Para level="h1">
				<LocaleMessage {...localeMessages.header} />
			</Para>
			<Para level="paragraph">
				<LocaleMessage {...localeMessages.desc} />
			</Para>
		</Stack>
		<Section>
			<FormControl
				id="theme"
				flex={0}
				defaultValue={$theme}
				bind:value={() => $theme, (value) => ($theme = value)}
			>
				<FormLabel>
					<LocaleMessage {...localeStrings.appearance.theme} />
				</FormLabel>
				<FormRadio.List>
					<FormRadio.Card value="dark">
						{#snippet header()}
							<LocaleMessage {...localeStrings.appearance.dark} />
						{/snippet}
						<div data-theme="dark">
							{@render themePreview()}
						</div>
					</FormRadio.Card>
					<FormRadio.Card value="light">
						{#snippet header()}
							<LocaleMessage {...localeStrings.appearance.light} />
						{/snippet}
						<div data-theme="light">
							{@render themePreview()}
						</div>
					</FormRadio.Card>
				</FormRadio.List>
			</FormControl>
		</Section>
	</Form>
</div>
