<script
	lang="ts"
	module
>
	const localeMessages = defineMessages({
		mockMessage: {
			id: 'app.roles.mockMessage',
			defaultMessage: 'This is how messages would look with this role!',
			description: 'Example message for role settings',
		},
		colors: { id: 'app.roles.colors', defaultMessage: 'Colors', description: 'Role colors section' },
		pingable: {
			id: 'app.roles.pingable',
			defaultMessage: 'Notifiable',
			description: 'Role pingable section',
		},
		pingableDesc: {
			id: 'app.roles.pingable.desc',
			defaultMessage: 'Allows the members with this role be notified by mentioning this role.',
			description: 'Role pingable section description',
		},
		separate: {
			id: 'app.roles.separate',
			defaultMessage: 'Display separately',
			description: 'Role display separately section',
		},
		separateDesc: {
			id: 'app.roles.separate.desc',
			defaultMessage: 'Displays the users with this role separately in the member list.',
			description: 'Role display separately section description',
		},
		motion: {
			id: 'app.roles.motion',
			defaultMessage: 'Gradient Animation',
			description: 'Role gradient animation section',
		},
		motionNone: {
			id: 'app.roles.motion.none',
			defaultMessage: 'None',
			description: 'Role gradient no animation',
		},
		motionLinear: {
			id: 'app.roles.motion.linear',
			defaultMessage: 'Linear',
			description: 'Role gradient linear animation',
		},
		motionWave: {
			id: 'app.roles.motion.wave',
			defaultMessage: 'Waving',
			description: 'Role gradient waving animation',
		},
		motionRadial: {
			id: 'app.roles.motion.radial',
			defaultMessage: 'Radial',
			description: 'Role gradient radial animation',
		},
	});
</script>

<script lang="ts">
	import { Card, Para, Section, Grid, Stack, Group, type GradientMotion } from '@campground/ui';
	import { getRoleSettings } from './context.svelte.ts';
	import {
		FormArray,
		FormColor,
		FormControl,
		FormErrorLabel,
		FormLabel,
		FormRadio,
		FormTextField,
		FormSwitch,
	} from '@campground/form';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import { ChatMessage } from '$lib/components/content/index.js';
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import { getCampsiteContext } from '../../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconAccessPoint, IconRipple, IconWaveSine, IconXFilled } from '@tabler/icons-svelte';

	const campsiteContext = getCampsiteContext();
	const roleContext = getRoleSettings();

	const mockAuthor: MessageViewWithReplies['createdBy'] = $derived({
		isMember: true,
		roles: [campsiteContext.defaultRole!.id, roleContext.selectedRole!.id],
		user: {
			did: 'did:null:null',
			handle: 'handle.invalid',
			displayName: 'Example User',
		} satisfies MessageViewWithReplies['createdBy']['user'],
		nickname: null,
	});
	let motion: GradientMotion = $derived(roleContext.selectedRole?.motion ?? 'none');
	let colors: number[] = $derived(roleContext.selectedRole?.colors ?? []);
</script>

{#snippet mockMessage()}
	<div class="messageWrapper">
		<ChatMessage.Container continuousMessage>
			<ChatMessage.Wrapper>
				<ChatMessage.Type.Default
					{motion}
					createdBy={mockAuthor}
					createdAt={new Date().toISOString()}
					colors={colors
						.filter((x) => typeof x === 'number')
						.map((x) => `#${x?.toString(16).padStart(6, '0')}`)}
				>
					<Para level="paragraph">
						<LocaleMessage {...localeMessages.mockMessage} />
					</Para>
				</ChatMessage.Type.Default>
			</ChatMessage.Wrapper>
		</ChatMessage.Container>
	</div>
{/snippet}

<Stack gap={2}>
	<Grid.Root gap={1}>
		<Grid.Cell data-theme="dark">
			<Card.Root>
				<Card.Overflow>
					{@render mockMessage()}
				</Card.Overflow>
			</Card.Root>
		</Grid.Cell>
		<Grid.Cell data-theme="light">
			<Card.Root>
				<Card.Overflow>
					{@render mockMessage()}
				</Card.Overflow>
			</Card.Root>
		</Grid.Cell>
	</Grid.Root>
	<Section>
		{console.log('Selected role name', roleContext.selectedRole?.name)}
		<FormControl
			id="name"
			defaultValue={roleContext.selectedRole?.name}
		>
			<FormLabel>
				<LocaleMessage {...localeStrings.content.name} />
			</FormLabel>
			<FormTextField />
			<FormErrorLabel />
		</FormControl>
	</Section>
	<Section>
		<FormControl
			id="pingable"
			defaultValue={roleContext.selectedRole?.pingable}
		>
			<FormSwitch>
				{#snippet header()}
					<LocaleMessage {...localeMessages.pingable} />
				{/snippet}
				<LocaleMessage {...localeMessages.pingableDesc} />
			</FormSwitch>
			<FormErrorLabel />
		</FormControl>
		<FormControl
			id="raised"
			defaultValue={roleContext.selectedRole?.raised}
		>
			<FormSwitch>
				{#snippet header()}
					<LocaleMessage {...localeMessages.separate} />
				{/snippet}
				<LocaleMessage {...localeMessages.separateDesc} />
			</FormSwitch>
			<FormErrorLabel />
		</FormControl>
	</Section>
	<Section>
		<FormControl
			id="motion"
			defaultValue={roleContext.selectedRole?.motion}
			bind:value={motion}
		>
			<FormLabel>
				<LocaleMessage {...localeStrings.roles.motion} />
			</FormLabel>
			<FormRadio.List>
				<Grid.Root
					columns={3}
					gap={0.5}
				>
					<Grid.Cell>
						<FormRadio.Button value={'none' satisfies GradientMotion}>
							<IconXFilled size="1.5rem" />
							<LocaleMessage {...localeMessages.motionNone} />
						</FormRadio.Button>
					</Grid.Cell>
					<Grid.Cell>
						<FormRadio.Button value={'linear' satisfies GradientMotion}>
							<IconRipple size="1.5rem" />
							<LocaleMessage {...localeMessages.motionLinear} />
						</FormRadio.Button>
					</Grid.Cell>
					<Grid.Cell>
						<FormRadio.Button value={'wave' satisfies GradientMotion}>
							<IconWaveSine size="1.5rem" />
							<LocaleMessage {...localeMessages.motionWave} />
						</FormRadio.Button>
					</Grid.Cell>
					<Grid.Cell>
						<FormRadio.Button value={'radial' satisfies GradientMotion}>
							<IconAccessPoint size="1.5rem" />
							<LocaleMessage {...localeMessages.motionRadial} />
						</FormRadio.Button>
					</Grid.Cell>
				</Grid.Root>
			</FormRadio.List>
			<FormErrorLabel />
		</FormControl>
		<FormArray.Root
			id="colors"
			defaultValue={roleContext.selectedRole?.colors}
			max={5}
			bind:value={colors}
		>
			<Group>
				<FormLabel flex={1}>
					<LocaleMessage {...localeMessages.colors} />
				</FormLabel>
				<FormArray.Button />
			</Group>
			<FormArray.List>
				<FormColor.Full
					size="md"
					orientation="horizontal"
				/>
			</FormArray.List>
		</FormArray.Root>
	</Section>
</Stack>

<style lang="scss">
	.messageWrapper {
		padding: 0.5rem 0;
	}
</style>
