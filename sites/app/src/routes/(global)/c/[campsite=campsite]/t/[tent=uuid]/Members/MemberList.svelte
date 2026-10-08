<script lang="ts">
	import {
		Chip,
		Group,
		getMenuPortal,
		Menu,
		Section,
		Stack,
		type MenuPortalInstance,
	} from '@campground/ui';
	import { GradientText } from '@campground/ui';
	import type { MemberViewBasic } from '$lib/types/campground/membership.js';
	import type { RoleView } from '$lib/types/campground/roles.js';
	import { colorToDecimal } from '$lib/util/color.js';
	import MemberItem from './MemberItem.svelte';
	import { v4 as uuid } from 'uuid';
	import { User } from '$lib/components/index.js';

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

	const menuPortal = getMenuPortal();

	function openMemberCard(
		ev: MouseEvent & { currentTarget: HTMLButtonElement },
		member: MemberViewBasic,
	) {
		menuPortal.add(cardMenu, ev.currentTarget, uuid(), member);
	}
</script>

{#snippet cardMenu(instance: MenuPortalInstance<MemberViewBasic>)}
	<Menu.Root
		{instance}
		placement="bottom-end"
		offset={8}
		w={20}
	>
		<User.CardMenu
			user={instance.payload!.user}
			member={instance.payload!}
		/>
	</Menu.Root>
{/snippet}

{#each groupRoles as { role, members: roleMembers } (role.id)}
	<Section
		gap="xs"
		headerLevel={4}
	>
		{#snippet header()}
			<Group>
				<Stack flex={1}>
					<GradientText
						colors={colorToDecimal(role.colors)}
						motion={role.motion}
					>
						{role.name}
					</GradientText>
				</Stack>
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
