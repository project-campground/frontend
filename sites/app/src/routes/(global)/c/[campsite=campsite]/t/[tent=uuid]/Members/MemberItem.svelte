<script lang="ts">
	import { GradientText, TextBlock } from '@campground/ui';
	import { UserAvatar } from '$lib/components/users/index.js';
	import type { MemberViewBasic } from '$lib/types/campground/membership.js';
	import type { RoleView } from '$lib/types/campground/roles.js';
	import { colorToDecimal } from '$lib/util/color.js';

	type ClickEvent = MouseEvent & { currentTarget: HTMLButtonElement };

	const {
		member,
		roles,
		onclick,
	}: {
		member: MemberViewBasic;
		roles: RoleView[];
		onclick: (ev: ClickEvent, member: MemberViewBasic) => void;
	} = $props();

	const highestColorRole = $derived(
		roles.find((x) => x.colors.length && member.roles.includes(x.id)),
	);

	const slogan = $derived(member.nickname ?? member.user.displayName ?? member.user.did);
</script>

<button
	class="member"
	onclick={(ev) => onclick(ev, member)}
>
	<UserAvatar
		did={member.user.did}
		src={member.user.avatar ?? undefined}
		status={member.user.status}
		size="md"
	/>
	<TextBlock weight={700}>
		<GradientText
			colors={colorToDecimal(highestColorRole?.colors)}
			motion={highestColorRole?.motion}
		>
			{slogan}
		</GradientText>
	</TextBlock>
</button>

<style lang="scss">
	.member {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.4rem 0.5rem;
		border: none;
		background: none;
		border-radius: var(--radius-md);
		text-align: left;

		&:hover,
		&:focus-visible {
			background-color: var(--background-body);
		}
	}
</style>
