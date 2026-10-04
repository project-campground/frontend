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
	});
</script>

<script lang="ts">
	import { Card, Para, Section, Grid, Stack, Group } from '@campground/ui';
	import { getRoleSettings } from './context.svelte.ts';
	import {
		Form,
		FormArray,
		FormColor,
		FormControl,
		FormErrorLabel,
		FormLabel,
		FormTextField,
	} from '@campground/form';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import { ChatMessage } from '$lib/components/content/index.js';
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import { getCampsiteContext } from '../../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { defineMessages } from '@formatjs/svelte-intl';

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
	let colors: number[] = $derived(roleContext.selectedRole?.colors ?? []);
</script>

{#snippet mockMessage()}
	<div class="messageWrapper">
		<ChatMessage.Container continuousMessage>
			<ChatMessage.Wrapper>
				<ChatMessage.Type.Default
					createdBy={mockAuthor}
					createdAt={new Date().toISOString()}
					colors={colors.map((x) => `#${x.toString(16).padStart(6, '0')}`)}
				>
					<Para level="paragraph">
						<LocaleMessage {...localeMessages.mockMessage} />
					</Para>
				</ChatMessage.Type.Default>
			</ChatMessage.Wrapper>
		</ChatMessage.Container>
	</div>
{/snippet}

<Stack gap={1}>
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
