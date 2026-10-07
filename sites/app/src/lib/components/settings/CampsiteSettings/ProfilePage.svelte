<script lang="ts">
	import {
		createImageDefaultValue,
		Form,
		FormControl,
		FormImageField,
		FormLabel,
		FormTags,
		FormTextField,
		type FormImageFieldValue,
	} from '@campground/form';
	import { Card, Stack, Section } from '@campground/ui';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import type { CampsiteViewBasic } from '$lib/types/campground/campsites.js';
	import { getAppview } from '$lib/context/api.js';

	const settings = getSettings();
	const campsiteContext = getCampsiteContext();
	const appview = getAppview();

	let form: Form | null = $state(null);

	$effect(() => {
		if (!form) return;

		settings.setForm(form.getForm());
	});

	type CampsiteProfileForm = Pick<CampsiteViewBasic, 'description' | 'name' | 'tags'> & {
		avatar?: FormImageFieldValue;
		banner?: FormImageFieldValue;
	};

	async function updateCampsite({ avatar, banner, ...values }: CampsiteProfileForm) {
		return appview.campsites.update(campsiteContext.campsite!.id, values);
	}
</script>

<Card.Root
	size="lg"
	flex={1}
	level="subtle"
	gridColumn="2/4"
>
	<Card.Content>
		<Form
			bind:this={form}
			onSubmit={(values) => updateCampsite(values as CampsiteProfileForm)}
		>
			<Section>
				<FormControl
					id="banner"
					defaultValue={createImageDefaultValue(campsiteContext.campsite?.bannerUri)}
				>
					<FormLabel>
						<LocaleMessage {...localeStrings.content.banner} />
					</FormLabel>
					<FormImageField
						aspectRatio={5}
						height="8rem"
					/>
				</FormControl>
				<Stack direction="row">
					<FormControl
						id="avatar"
						defaultValue={createImageDefaultValue(campsiteContext.campsite?.avatarUri)}
					>
						<FormImageField
							width="3.5rem"
							height="3.5rem"
							radius="avatar"
						/>
					</FormControl>
					<FormControl
						id="name"
						defaultValue={campsiteContext.campsite?.name}
					>
						<FormLabel>
							<LocaleMessage {...localeStrings.content.name} />
						</FormLabel>
						<FormTextField
							minlength={3}
							maxlength={48}
						/>
					</FormControl>
				</Stack>
			</Section>
			<Section>
				<FormControl
					id="description"
					defaultValue={campsiteContext.campsite?.description}
				>
					<FormLabel>
						<LocaleMessage {...localeStrings.content.topic} />
					</FormLabel>
					<FormTextField
						multirow
						maxlength={200}
					/>
				</FormControl>
				<FormControl
					id="tags"
					defaultValue={campsiteContext.campsite?.tags}
				>
					<FormLabel>
						<LocaleMessage {...localeStrings.content.tags} />
					</FormLabel>
					<FormTags
						minlength={1}
						maxlength={20}
						max={10}
					/>
				</FormControl>
			</Section>
		</Form>
	</Card.Content>
</Card.Root>
