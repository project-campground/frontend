<script lang="ts">
	import {
		createImageDefaultValue,
		Form,
		FieldControl,
		ImageField,
		FieldLabel,
		TagField,
		TextField,
		type ImageFieldValue,
	} from '@campground/form';
	import { Card, Stack, Section, Para } from '@campground/ui';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '#lib/locale/index.js';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import type { CampsiteViewBasic } from '#lib/types/campground/campsites.js';
	import { getAppview } from '#lib/context/api.js';
	import { DescriptionLimits, NameLimits } from '#lib/util/limits.js';
	import { PermissionFlag } from '#lib/util/constants.js';

	const settings = getSettings();
	const campsiteContext = getCampsiteContext();
	const appview = getAppview();
	const cannotManage = $derived(
		(campsiteContext.permissions & PermissionFlag.ManageCampsite) === 0n,
	);

	let form: Form | null = $state(null);

	$effect(() => {
		if (!form) return;

		settings.setForm(form.getForm());
	});

	type CampsiteProfileForm = Pick<CampsiteViewBasic, 'description' | 'name' | 'tags'> & {
		avatar?: ImageFieldValue;
		banner?: ImageFieldValue;
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
		<Para
			level="h2"
			mb="lg"
		>
			<LocaleMessage {...localeStrings.content.profile} />
		</Para>
		<Form
			bind:this={form}
			onSubmit={(values) => updateCampsite(values as CampsiteProfileForm)}
		>
			<Section>
				<FieldControl
					key="banner"
					defaultValue={createImageDefaultValue(campsiteContext.campsite?.bannerUri)}
					disabled={cannotManage}
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
						defaultValue={createImageDefaultValue(campsiteContext.campsite?.avatarUri)}
						disabled={cannotManage}
					>
						<ImageField
							width="3.5rem"
							height="3.5rem"
							radius="avatar"
						/>
					</FieldControl>
					<FieldControl
						key="name"
						defaultValue={campsiteContext.campsite?.name}
						disabled={cannotManage}
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
					defaultValue={campsiteContext.campsite?.description}
					disabled={cannotManage}
				>
					<FieldLabel>
						<LocaleMessage {...localeStrings.content.topic} />
					</FieldLabel>
					<TextField
						multirow
						maxlength={DescriptionLimits.Max}
					/>
				</FieldControl>
				<FieldControl
					key="tags"
					defaultValue={campsiteContext.campsite?.tags}
					disabled={cannotManage}
				>
					<FieldLabel>
						<LocaleMessage {...localeStrings.content.tags} />
					</FieldLabel>
					<TagField
						minlength={1}
						maxlength={20}
						max={10}
					/>
				</FieldControl>
			</Section>
		</Form>
	</Card.Content>
</Card.Root>
