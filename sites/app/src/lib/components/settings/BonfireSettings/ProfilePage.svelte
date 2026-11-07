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
	import type { BonfireViewInList } from '#lib/types/campground/bonfires.js';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { getPermissions } from '#lib/util/permissions.js';
	import { PermissionFlag, PermissionMax } from '#lib/util/constants.js';

	const campsiteContext = getCampsiteContext();
	const settings = getSettings<BonfireViewInList>();
	const appview = getAppview();

	let form: Form | null = $state(null);
	let bonfire: BonfireViewInList = $derived(settings.value);

	$effect(() => {
		if (!form) return;

		settings.setForm(form.getForm());
	});

	type ProfileForm = Pick<BonfireViewInList, 'avatarUri' | 'bannerUri' | 'description' | 'name'>;

	const permissions = $derived(
		campsiteContext.ownerPermissions ?? getPermissions(campsiteContext.permissions, bonfire),
	);
	const cannotManage = $derived((permissions & PermissionFlag.ManageBonfires) === 0n);

	async function updateProfile({ avatarUri, bannerUri, ...values }: ProfileForm) {
		return appview.bonfires.update(campsiteContext.campsite!.id, settings.value.id, values);
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
						defaultValue={createImageDefaultValue(bonfire?.avatarUri)}
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
						defaultValue={bonfire?.name}
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
					defaultValue={bonfire?.description}
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
