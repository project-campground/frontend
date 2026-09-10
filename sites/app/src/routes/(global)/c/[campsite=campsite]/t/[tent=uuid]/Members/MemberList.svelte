<script lang="ts">
	import {
		Chip,
		Group,
		getMenuPortal,
		Menu,
		Section,
		type MenuPortalInstance,
	} from '@campground/ui';
	import { GradientText } from '@campground/ui';
	import UserCardMenu from '$lib/components/users/UserCardMenu.svelte';
	import type { MemberViewBasic } from '$lib/types/campground/membership.js';
	import type { RoleView } from '$lib/types/campground/roles.js';
	import { colorToDecimal } from '$lib/util/color.js';
	import MemberItem from './MemberItem.svelte';

	const { members, roles }: { members: MemberViewBasic[]; roles: RoleView[] } = $props();

	const displayedRoles = $derived.by(() => {
		const raised = roles.filter((role) => role.raised);
		const defaultRole = roles.find((x) => x.flags & 1) ?? roles[0];
		if (defaultRole && !raised.includes(defaultRole)) raised.push(defaultRole);
		return raised;
	});

	const groupRoles = $derived.by(() => {
		const sortedMembers = [...members].sort((a, b) =>
			(a.nickname ?? a.user.displayName ?? a.user.did).localeCompare(
				b.nickname ?? b.user.displayName ?? b.user.did,
			),
		);

		return displayedRoles
			.map((role) => ({
				role,
				members: sortedMembers.filter((member) => {
					const displayedRole = displayedRoles.find((x) => member.roles.includes(x.id));
					return displayedRole?.id === role.id;
				}),
			}))
			.filter((x) => x.members.length);
	});

	let cardMember: MemberViewBasic | null = $state(null);
	const menuPortal = getMenuPortal();

	function openMemberCard(
		ev: MouseEvent & { currentTarget: HTMLButtonElement },
		member: MemberViewBasic,
	) {
		cardMember = member;
		menuPortal.add(cardMenu, ev.currentTarget);
	}
</script>

{#snippet cardMenu(instance: MenuPortalInstance)}
	{#if cardMember}
		<Menu.Root
			{instance}
			placement="bottom-end"
			offset={8}
			w={20}
		>
			<UserCardMenu user={cardMember.user} />
		</Menu.Root>
	{/if}
{/snippet}

{#each groupRoles as { role, members: roleMembers } (role.id)}
	<Section
		gap="xs"
		headerLevel={4}
	>
		{#snippet header()}
			<Group gap={8}>
				<GradientText
					colors={colorToDecimal(role.colors)}
					motion={role.motion}
				>
					{role.name}
				</GradientText>
				<Chip size="sm">{roleMembers.length}</Chip>
			</Group>
		{/snippet}
		{#each roleMembers as member (member.user.did)}
			<MemberItem
				{member}
				{roles}
				onclick={openMemberCard}
			/>
		{/each}
	</Section>
{/each}
