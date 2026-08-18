<script lang="ts">
	import { Avatar, Group, Stack, TextBlock } from '@campground/ui';
	import NavbarButton from './NavbarButton.svelte';
	import { IconUserFilled } from '@tabler/icons-svelte';
	import { FormattedMessageGlobal } from '@campground/locale';

	interface Props {
		avatar?: string;
		id: string;
		domain: string;
		name: string;
		memberCount: number;
		hasNotification?: boolean;
		pingCount?: number;
		isSelected?: boolean;
		isVerified?: boolean;
		isOwner?: boolean;
	}
	const { id, avatar, name, memberCount, isSelected }: Props = $props();
</script>

<NavbarButton href={`/c/${id}`}>
	<Avatar
		src={avatar}
		size="sm"
	>
		{name[0]}
	</Avatar>
	<Stack gap={0.25}>
		<TextBlock
			level="subheading"
			weight={isSelected ? 900 : 700}>{name}</TextBlock
		>
		<TextBlock
			level="subtext"
			fontSize={0.85}
			weight={700}
		>
			<Group gap={0.5}>
				<IconUserFilled size={12} />
				<FormattedMessageGlobal
					id="app.campsites.members"
					values={{ count: memberCount }}
				/>
			</Group>
		</TextBlock>
	</Stack>
	<div class="CampsiteButton margin"></div>
</NavbarButton>

<style lang="scss">
	.margin {
		width: 0;
	}
</style>
