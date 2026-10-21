<script lang="ts">
	import { Form, FieldControl, FieldLabel, TextField, type ImageFieldValue } from '@campground/form';
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
		avatar?: ImageFieldValue;
		banner?: ImageFieldValue;
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
				<FieldControl
					id="name"
					defaultValue={tent.name}
				>
					<FieldLabel>
						<LocaleMessage {...localeStrings.content.name} />
					</FieldLabel>
					<TextField
						minlength={NameLimits.Min}
						maxlength={NameLimits.Max}
					/>
				</FieldControl>
				<FieldControl
					id="description"
					defaultValue={tent.description}
				>
					<FieldLabel>
						<LocaleMessage {...localeStrings.content.topic} />
					</FieldLabel>
					<TextField
						multirow
						maxlength={DescriptionLimits.Max}
					/>
				</FieldControl>
			</Section>
		</Form>
	</Card.Content>
</Card.Root>
