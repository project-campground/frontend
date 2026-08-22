<script lang="ts">
	import { Avatar, Group, TextBlock } from '@campground/ui';
	import NavbarButton from './NavbarButton.svelte';
	import { IconUserFilled } from '@tabler/icons-svelte';
	import { FormattedMessageGlobal } from '@campground/locale';

	interface Props {
		avatar?: string;
		id: string;
		domain: string;
		name: string;
		memberCount: number;
		isSelected?: boolean;
	}
	const { id, avatar, domain, name, memberCount, isSelected }: Props = $props();
</script>

<NavbarButton href={`/c/${id}@${domain}`}>
	<div class="margin"></div>
	<div class="content">
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
	</div>
	<Avatar
		src={avatar}
		size="sm"
	>
		{name[0].toUpperCase()}
	</Avatar>
</NavbarButton>

<style lang="scss">
	.margin {
		width: 0;
	}
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
