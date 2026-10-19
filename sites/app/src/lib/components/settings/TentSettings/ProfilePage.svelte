<script lang="ts">
	import {
		Form,
		FormControl,
		FormLabel,
		FormTextField,
		type FormImageFieldValue,
	} from '@campground/form';
	import { Card, Section, Para } from '@campground/ui';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import type { CampsiteViewBasic } from '$lib/types/campground/campsites.js';
	import { getAppview } from '$lib/context/api.js';
	import type { TentViewBasic } from '$lib/types/campground/tent.js';
	import { DescriptionLimits, NameLimits } from '$lib/util/limits.js';

	const settings = getSettings<TentViewBasic>();
	const appview = getAppview();

	let form: Form | null = $state(null);
	let tent: TentViewBasic = $derived(settings.value);

	$effect(() => {
		if (!form) return;

		settings.setForm(form.getForm());
	});

	type ProfileForm = Pick<CampsiteViewBasic, 'description' | 'name' | 'tags'> & {
		avatar?: FormImageFieldValue;
		banner?: FormImageFieldValue;
	};

	async function updateProfile(values: ProfileForm) {
		return appview.tents.update(settings.value.id, values);
	}
</script>

<Card.Root
	size="lg"
	flex={1}
	level="subtle"
	gridColumn="2/4"
>
	<Card.Content>
		<Para
			level="h2"
			mb="lg"
		>
			<LocaleMessage {...localeStrings.content.profile} />
		</Para>
		<Form
			bind:this={form}
			onSubmit={(values) => updateProfile(values as ProfileForm)}
		>
			<Section>
				<FormControl
					id="name"
					defaultValue={tent.name}
				>
					<FormLabel>
						<LocaleMessage {...localeStrings.content.name} />
					</FormLabel>
					<FormTextField
						minlength={NameLimits.Min}
						maxlength={NameLimits.Max}
					/>
				</FormControl>
				<FormControl
					id="description"
					defaultValue={tent.description}
				>
					<FormLabel>
						<LocaleMessage {...localeStrings.content.topic} />
					</FormLabel>
					<FormTextField
						multirow
						maxlength={DescriptionLimits.Max}
					/>
				</FormControl>
			</Section>
		</Form>
	</Card.Content>
</Card.Root>
