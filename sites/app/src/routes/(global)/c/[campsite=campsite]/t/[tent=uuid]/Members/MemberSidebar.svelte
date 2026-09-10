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
		topic: {
			id: 'info.topic',
			defaultMessage: 'Topic',
			description: 'Topic header in settings and tents',
		},
		noThreads: {
			id: 'app.threads.empty',
			defaultMessage: 'No threads yet',
			description: 'Empty state shown in the threads tab of the right sidebar',
		},
	});
</script>

<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Card, Pick, TextBlock } from '@campground/ui';
	import { IconInfoCircle, IconListTree, IconUsers } from '@tabler/icons-svelte';
	import Markdown from '$lib/components/markdown/Markdown.svelte';
	import { UserDisplaySkeleton } from '$lib/components/users/index.js';
	import { getAppview } from '$lib/context/api.js';
	import type { GetMembersOutput, MemberViewBasic } from '$lib/types/campground/membership.js';
	import type { TentViewBasic } from '$lib/types/campground/tent.js';
	import { getCampsiteContext } from '../../../context.svelte.ts';
	import MemberList from './MemberList.svelte';

	const { tent }: { tent: TentViewBasic } = $props();

	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsite);
	const appview = getAppview();

	let tab = $state(0);
	let members: MemberViewBasic[] = $state([]);
	let loading = $state(true);
	let reachedEnd = $state(false);

	function fetchMembers(offset: number): Promise<GetMembersOutput> {
		return campsite ? appview.members.getMany(campsite.id, offset) : Promise.resolve({ members: [] });
	}

	$effect(() => {
		if (!campsite) return;
		let invalidated = false;
		members = [];
		reachedEnd = false;
		loading = true;
		fetchMembers(0).then((output) => {
			if (invalidated) return;
			members = output.members;
			reachedEnd = output.members.length < 50;
			loading = false;
		});
		return () => {
			invalidated = true;
		};
	});

	function onScroll(ev: Event) {
		if (!campsite || loading || reachedEnd) return;
		const list = ev.currentTarget as HTMLDivElement;
		const remaining = list.scrollHeight - list.scrollTop - list.clientHeight;
		if (remaining > 128) return;
		loading = true;
		fetchMembers(members.length).then((output) => {
			members.push(...output.members);
			loading = false;
			reachedEnd = output.members.length < 50;
		});
	}
</script>

{#if campsite}
	<Card.Root
		level="subtle"
		size="xl"
	>
		<Card.Overflow flex={1}>
			<div class="inner">
				{#if tent.description}
					<div class="topic">
						<TextBlock weight={700}>
							<span class="topicHeader">
								<IconInfoCircle />
								<LocaleMessage {...messages.topic} />
							</span>
						</TextBlock>
						<Markdown value={tent.description} />
					</div>
				{/if}
				<Pick.Root
					value={tab}
					onChange={(value) => (tab = value)}
				>
					<Pick.List size="lg">
						<Pick.Item>
							<span class="tabLabel">
								<IconUsers />
								<LocaleMessage {...messages.members} />
							</span>
						</Pick.Item>
						<Pick.Item>
							<span class="tabLabel">
								<IconListTree />
								<LocaleMessage {...messages.threads} />
							</span>
						</Pick.Item>
					</Pick.List>
				</Pick.Root>
				<div
					class="list"
					onscroll={onScroll}
				>
					{#if tab === 0}
						{#if loading && !members.length}
							{#each Array(6).keys() as i (i)}
								<UserDisplaySkeleton size="sm" />
							{/each}
						{:else}
							<MemberList
								{members}
								roles={campsite.roles}
							/>
						{/if}
					{:else}
						<TextBlock level="subtext">
							<LocaleMessage {...messages.noThreads} />
						</TextBlock>
					{/if}
				</div>
			</div>
		</Card.Overflow>
	</Card.Root>
{/if}

<style lang="scss">
	.inner {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
	}

	.topic {
		padding: 0.25rem 0;
		border-bottom: solid 1px var(--neutral-border);
	}

	.topicHeader {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.tabLabel {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.list {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}
</style>
