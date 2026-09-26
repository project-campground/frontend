<script
	lang="ts"
	module
>
	import type { MemberViewDetailed } from '$lib/types/campground/membership.js';
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		accusative: {
			id: 'app.members.accusative',
			defaultMessage: 'the members',
			description: 'The accusative case (e.g., `him`) of noun `members`',
		},
		nominative: {
			id: 'app.members.nominative',
			defaultMessage: 'members',
			description: 'The nominative case (e.g., `he`) of noun `members`',
		},
	});

	interface MemberViewTable extends MemberViewDetailed {
		id: string;
	}
</script>

<script lang="ts">
	import { Button, Card, Group } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import TentWrapper from '../TentWrapper.svelte';
	import { IconUserFilled } from '@tabler/icons-svelte';
	import { getLocale, LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';
	import { DataTable } from '@campground/data';
	import { getAppview } from '$lib/context/api.js';
	import { User } from '$lib/components/index.js';
	import { Role } from '$lib/components/campsite/index.js';

	const campsiteContext = getCampsiteContext();

	$effect(() => {
		if (campsiteContext.campsiteReference && !campsiteContext.openBonfire)
			campsiteContext.setActiveBonfire(campsiteContext.campsiteReference?.campsite.bonfires[0].id);
	});

	const appview = getAppview();

	async function fetchMembers(count: number, offset: number) {
		if (!campsiteContext.campsite) return [];

		return appview.members
			.getManyDetailed(campsiteContext.campsite.id, count, offset)
			.then((resp) => resp.members.map((x) => ({ ...x, id: x.user.did })));
	}
	function removeMemberRole(memberId: string, roleId: string) {
		return appview.members.removeRole(campsiteContext.campsite!.id, roleId, { memberIds: [memberId] })
	}

	const locale = getLocale();
</script>

{#snippet displayUser(item: MemberViewTable)}
	<User.Display
		user={item.user}
		size="xs"
		hideStatus
	/>
{/snippet}
{#snippet roleDisplay(item: MemberViewTable)}
	{const roles = $derived(campsiteContext.campsite?.roles.filter((role) => item.roles.includes(role.id)) ?? [])}

	<Group gap={0.5}>
		{#each roles.slice(0, 5) as role (role.id)}
			<Role.Display {role} onRemove={() => removeMemberRole(item.user.did, role.id)} />
		{/each}
		{#if roles.length > 5}
			<Button color="neutral" variant="plain">
				<LocaleMessage {...localeStrings.content.amountMore} values={{ amount: roles.length - 5 }} />
			</Button>
		{/if}
	</Group>
{/snippet}

<TentWrapper>
	{#snippet icon()}
		<IconUserFilled />
	{/snippet}
	{#snippet title()}
		<LocaleMessage {...localeStrings.tents.members} />
	{/snippet}
	<div class="content">
		<DataTable
			columns={[
				{
					prop: 'id',
					header: 'Member',
					Component: displayUser,
					mobile: { columns: { from: 2, to: 4 }, rows: 1 },
				},
				{ prop: 'roles', header: 'Roles', Component: roleDisplay, mobile: { columns: { from: 1, to: 4 }, rows: 2 } },
			]}
			entryType={{
				nominative: locale.formatMessage(localeMessages.nominative),
				accusative: locale.formatMessage(localeMessages.accusative),
			}}
			fetch={fetchMembers}
			total={campsiteContext.campsite?.memberCount}
		/>
	</div>
</TentWrapper>
<Card.Root
	level="subtle"
	size="xl">Abcd</Card.Root
>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		padding: 1rem;
		flex: 1;
	}
</style>
