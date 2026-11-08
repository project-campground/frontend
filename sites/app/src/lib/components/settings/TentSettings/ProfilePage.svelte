<script lang="ts">
	import { Form, FieldControl, FieldLabel, TextField } from '@campground/form';
	import { Card, Section, Para } from '@campground/ui';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '#lib/locale/index.js';
	import { getAppview } from '#lib/context/api.js';
	import type { TentView, TentViewInList } from '#lib/types/campground/tent.js';
	import { DescriptionLimits, NameLimits } from '#lib/util/limits.js';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { PermissionFlag } from '#lib/util/constants.js';
	import { getPermissionContext } from '../../../../routes/(global)/c/[campsite=campsite]/permissions.svelte.ts';

	const settings = getSettings<TentViewInList>();
	const campsiteContext = getCampsiteContext();
	const appview = getAppview();

	const tent: TentViewInList = $derived(settings.value);
	const permissionContext = getPermissionContext();

	const cannotManage = $derived(
		(permissionContext.permissions & PermissionFlag.ManageCampsite) === 0n,
	);

	let form: Form | null = $state(null);

	$effect(() => {
		if (!form) return;

		settings.setForm(form.getForm());
	});

	type ProfileForm = Pick<TentView, 'description' | 'name'>;

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
					key="name"
					defaultValue={tent.name}
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
				<FieldControl
					key="description"
					defaultValue={tent.description}
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
			</Section>
		</Form>
	</Card.Content>
</Card.Root>
