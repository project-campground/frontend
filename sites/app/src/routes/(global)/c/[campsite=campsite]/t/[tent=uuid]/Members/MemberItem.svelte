<script lang="ts">
	import { GradientText, TextBlock, Button } from '@campground/ui';
	import type { MemberViewBasic } from '$lib/types/campground/membership.js';
	import type { RoleView } from '$lib/types/campground/roles.js';
	import { colorToDecimal } from '$lib/util/color.js';
	import { User } from '$lib/components/index.js';

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

<Button
	variant="plain"
	color="neutral"
	class="member"
	justify="start"
	onclick={(ev) => onclick(ev, member)}
>
	<User.Avatar
		did={member.user.did}
		src={member.user.avatar ?? undefined}
		status={member.user.status}
		size="sm"
	/>
	<TextBlock weight={700}>
		<GradientText
			colors={colorToDecimal(highestColorRole?.colors)}
			motion={highestColorRole?.motion}
		>
			{slogan}
		</GradientText>
	</TextBlock>
</Button>
