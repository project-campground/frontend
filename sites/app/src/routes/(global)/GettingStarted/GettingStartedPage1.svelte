<script
	lang="ts"
	module
>
	import { defineMessages, intlKey } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		header: {
			id: 'app.createProfile.profile.header',
			defaultMessage: 'Create your profile',
			description: 'Getting started create profile header',
		},
		desc: {
			id: 'app.createProfile.profile.desc',
			defaultMessage: 'Create how people see you on Campground.',
			description: 'Getting started create profile description',
		},
	});
</script>

<script lang="ts">
	import {
		Form,
		FormControl,
		FormLabel,
		FormTextField,
		FormImageField,
		FormErrorLabel,
	} from '@campground/form';
	import { Section, Group, Para, Stack } from '@campground/ui';
	import {
		FormattedMessage,
		FormattedMessageGlobal,
		getLocaleContext,
		globalLocale,
	} from '@campground/locale';

	const intl = getLocaleContext();
</script>

<Form>
	<Stack>
		<Para level="h1">
			<FormattedMessage {...localeMessages.header} />
		</Para>
		<Para level="paragraph">
			<FormattedMessage {...localeMessages.desc} />
		</Para>
	</Stack>
	<Section>
		<FormControl
			id="banner"
			flex={0}
		>
			<FormLabel>
				<FormattedMessageGlobal id="info.banner" />
			</FormLabel>
			<FormImageField
				radius="lg"
				aspectRatio={5}
				height={6}
			/>
		</FormControl>
	</Section>
	<Section>
		<Group align="start">
			<FormControl
				id="avatar"
				flex={0}
			>
				<FormLabel>
					<FormattedMessageGlobal id="info.avatar" />
				</FormLabel>
				<FormImageField
					radius="avatar"
					width={4}
					height={4}
				/>
			</FormControl>
			<FormControl
				id="displayName"
				required
				flex={1}
			>
				<FormLabel>
					<FormattedMessageGlobal id="info.username" />
				</FormLabel>
				<FormTextField
					type="text"
					placeholder="Example username"
					maxlength={48}
					minlength={3}
				/>
				<FormErrorLabel />
			</FormControl>
		</Group>
	</Section>
	<Section>
		<FormControl id="description">
			<FormLabel>
				<FormattedMessageGlobal id="info.about.you" />
			</FormLabel>
			<FormTextField
				multirow
				placeholder={$intl.formatMessage(globalLocale['info.desc'])}
				maxlength={200}
			/>
		</FormControl>
	</Section>
</Form>
