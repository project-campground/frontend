<script lang="ts">
	import {
		Form,
		FieldControl,
		FieldLabel,
		TextField,
		createImageDefaultValue,
		ImageField,
	} from '@campground/form';
	import { Card, Section, Para, Stack } from '@campground/ui';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '#lib/locale/index.js';
	import { getAppview } from '#lib/context/api.js';
	import { DescriptionLimits, NameLimits } from '#lib/util/limits.js';
	import type { BonfireViewBasic } from '#lib/types/campground/bonfires.js';

	const settings = getSettings<BonfireViewBasic>();
	const appview = getAppview();

	let form: Form | null = $state(null);
	let bonfire: BonfireViewBasic = $derived(settings.value);

	$effect(() => {
		if (!form) return;

		settings.setForm(form.getForm());
	});

	type ProfileForm = Pick<BonfireViewBasic, 'avatarUri' | 'bannerUri' | 'description' | 'name'>;

	async function updateProfile({ avatarUri, bannerUri, ...values }: ProfileForm) {
		return appview.bonfires.update(settings.value.campsiteId, settings.value.id, values);
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
					key="banner"
					defaultValue={createImageDefaultValue(bonfire?.bannerUri)}
				>
					<FieldLabel>
						<LocaleMessage {...localeStrings.content.banner} />
					</FieldLabel>
					<ImageField
						aspectRatio={5}
						height="8rem"
					/>
				</FieldControl>
				<Stack direction="row">
					<FieldControl
						key="avatar"
						defaultValue={createImageDefaultValue(bonfire?.avatarUri)}
					>
						<ImageField
							width="3.5rem"
							height="3.5rem"
							radius="avatar"
						/>
					</FieldControl>
					<FieldControl
						key="name"
						defaultValue={bonfire?.name}
					>
						<FieldLabel>
							<LocaleMessage {...localeStrings.content.name} />
						</FieldLabel>
						<TextField
							minlength={NameLimits.Min}
							maxlength={NameLimits.Max}
						/>
					</FieldControl>
				</Stack>
			</Section>
			<Section>
				<FieldControl
					key="description"
					defaultValue={bonfire?.description}
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
