<script
	lang="ts"
	module
>
	const messageTranslation: Record<
		SystemMessageComponent['message'],
		{ id: string; defaultMessage: string; description: string }
	> = {
		tentCreated: defineMessage({
			id: 'app.content.system.tentCreated',
			defaultMessage: '{executor} has created this tent.',
			description: 'The message that automatically appears when someone creates a tent.',
		}),
		tentNameUpdated: defineMessage({
			id: 'app.content.system.tentNameUpdated',
			defaultMessage: '{executor} has renamed the tent from {oldValue} to {newValue}.',
			description: 'The message that automatically appears when someone renames a tent.',
		}),
	};
	const typeToIcon: Record<SystemMessageComponent['message'], typeof IconPlusFilled> = {
		tentCreated: IconPlusFilled,
		tentNameUpdated: IconPencilFilled,
	};
</script>

<script lang="ts">
	import UserDisplay from '$lib/components/users/UserDisplay/UserDisplay.svelte';

	import type {
		MessageViewWithReplies,
		SystemMessageComponent,
	} from '$lib/types/campground/content.js';
	import { LocaleMessage } from '@campground/locale';
	import { Group, TextBlock } from '@campground/ui';
	import { defineMessage } from '@formatjs/svelte-intl';
	import { IconPencilFilled, IconPlusFilled } from '@tabler/icons-svelte';

	const {
		component,
		createdBy,
	}: { component: SystemMessageComponent; createdBy: MessageViewWithReplies['createdBy'] } =
		$props();
	const systemMessageType = $derived(component.message);
	const IconComponent = $derived(typeToIcon[systemMessageType]);
</script>

{#snippet executor()}
	<TextBlock>
		<UserDisplay
			hideAvatar
			user={createdBy.user}
			size="xs"
		/>
	</TextBlock>
{/snippet}

<div class="container">
	<TextBlock level="subtext">
		<IconComponent />
	</TextBlock>
	<TextBlock whitespace="pre-wrap">
		<LocaleMessage
			{...messageTranslation[systemMessageType]}
			values={{ executor }}
		/>
	</TextBlock>
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: 0.5rem;
	}
</style>
