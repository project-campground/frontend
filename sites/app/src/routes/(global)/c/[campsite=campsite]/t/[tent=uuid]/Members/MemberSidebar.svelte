<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const messages = defineMessages({
		members: {
			id: 'app.members',
			defaultMessage: 'Members',
			description: 'Members pseudo-tent name, members tab in the right sidebar',
		},
		threads: {
			id: 'app.threads',
			defaultMessage: 'Threads',
			description: 'Message threads tab in the right sidebar',
		},
	});
</script>

<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Card, Para, Tabs, Stack } from '@campground/ui';
	import { IconListTree, IconUsers } from '@tabler/icons-svelte';
	import type { TentViewBasic } from '$lib/types/campground/tent.js';
	import { getCampsiteContext } from '../../../context.svelte.ts';
	import { Markdown } from '$lib/components/markdown/index.js';
	import { User } from '$lib/components/index.js';
	import { localeStrings } from '$lib/locale/index.js';
	import MemberSidebarMembers from './MemberSidebarMembers.svelte';
	import MemberSidebarThreads from './MemberSidebarThreads.svelte';

	const { tent }: { tent: TentViewBasic } = $props();

	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsite);
</script>

{#if campsite}
	<Stack gap={0.6}>
		{#if tent.description}
			<Card.Root
				level="subtle"
				size="xl"
			>
				<Card.Overflow
					flex={1}
					pl={1}
					pr={1}
					pb={1}
					pt={1}
				>
					<Para level="h3">
						<LocaleMessage {...localeStrings.content.topic} />
					</Para>
					<Markdown.Render value={tent.description} />
				</Card.Overflow>
			</Card.Root>
		{/if}
		<Card.Root
			level="subtle"
			size="xl"
			flex={1}
		>
			<Card.Overflow
				flex={1}
				pl={0.5}
				pr={0.5}
				pt={0.5}
				pb={0.5}
			>
				<Tabs.Root>
					{#snippet tabs()}
						<Tabs.Item>
							<IconUsers />
							<LocaleMessage {...messages.members} />
						</Tabs.Item>
						<Tabs.Item>
							<IconListTree />
							<LocaleMessage {...messages.threads} />
						</Tabs.Item>
					{/snippet}
					<Tabs.AsyncTab alwaysRenderOnceSeen>
						{#snippet skeleton()}
							{#each Array(6).keys() as i (i)}
								<User.DisplaySkeleton size="sm" />
							{/each}
						{/snippet}
						<MemberSidebarMembers />
					</Tabs.AsyncTab>
					<Tabs.AsyncTab>
						{#snippet skeleton()}
							{#each Array(6).keys() as i (i)}
								<User.DisplaySkeleton size="sm" />
							{/each}
						{/snippet}
						<MemberSidebarThreads />
					</Tabs.AsyncTab>
				</Tabs.Root>
			</Card.Overflow>
		</Card.Root>
	</Stack>
{/if}
