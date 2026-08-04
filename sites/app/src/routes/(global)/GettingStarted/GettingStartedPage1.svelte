<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

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
		type FormImageFieldProps,
		type FormImageFieldValue,
	} from '@campground/form';
	import { Section, Group, Para, Stack } from '@campground/ui';
	import {
		FormattedMessage,
		FormattedMessageGlobal,
		getLocaleContext,
		globalLocale,
	} from '@campground/locale';
	import UserCardMenu from '$lib/components/users/UserCardMenu.svelte';
	import { getAccount } from '$lib/context/account.svelte.js';

	const intl = getLocaleContext();
	const account = getAccount();

	let avatar: FormImageFieldValue | null = $state(null);
	let banner: FormImageFieldValue | null = $state(null);
	let displayName: string = $state('');
	let description: string = $state('');
</script>

<div class="page">
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
				bind:value={banner}
				id="banner"
				flex={0}
			>
				<FormLabel>
					<FormattedMessageGlobal id="info.banner" />
				</FormLabel>
				<FormImageField
					radius="lg"
					aspectRatio={4}
					height={6}
				/>
			</FormControl>
		</Section>
		<Section>
			<Group align="start">
				<FormControl
					id="avatar"
					flex={0}
					bind:value={avatar}
				>
					<FormLabel>
						<FormattedMessageGlobal id="info.avatar" />
					</FormLabel>
					<div class="avatarField">
						<FormImageField
							radius="avatar"
							width={4}
							height={4}
						/>
					</div>
				</FormControl>
				<FormControl
					id="displayName"
					required
					flex={1}
					bind:value={displayName}
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
			<FormControl
				id="description"
				bind:value={description}
			>
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
	<aside>
		<UserCardMenu
			hideButtons
			user={{
				did: account.sessionInfo?.did ?? 'did:null',
				handle: account.sessionInfo?.handle ?? 'handle.invalid',
				displayName,
				description,
				avatar: avatar?.url,
				banner: banner?.url,
			}}
		/>
	</aside>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.page {
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: 2rem;
		@include tablet-down {
			grid-template-columns: 5fr 0;
		}
	}
	aside {
		@include tablet-down {
			display: none;
		}
	}
	.avatarField {
		margin-top: calc(-0.125rem - 2px);
	}
</style>
