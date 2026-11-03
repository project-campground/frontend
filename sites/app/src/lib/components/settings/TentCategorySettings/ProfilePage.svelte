<script lang="ts">
	import { Form, FieldControl, FieldLabel, TextField } from '@campground/form';
	import { Card, Section, Para } from '@campground/ui';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '#lib/locale/index.js';
	import { getAppview } from '#lib/context/api.js';
	import type { TentCategoryView } from '#lib/types/campground/tent.js';
	import { DescriptionLimits, NameLimits } from '#lib/util/limits.js';

	const settings = getSettings<TentCategoryView>();
	const appview = getAppview();

	let form: Form | null = $state(null);
	let tentCategory: TentCategoryView = $derived(settings.value);

	$effect(() => {
		if (!form) return;

		settings.setForm(form.getForm());
	});

	type ProfileForm = Pick<TentCategoryView, 'description' | 'name'>;

	async function updateProfile(values: ProfileForm) {
		return appview.categories.update(settings.value.id, values);
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
					key="name"
					defaultValue={tentCategory.name}
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
					key="description"
					defaultValue={tentCategory.description}
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
