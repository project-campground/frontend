<script lang="ts">
	import { Avatar, Group, TextBlock } from '@campground/ui';
	import NavbarButton from './NavbarButton.svelte';
	import { IconUserFilled } from '@tabler/icons-svelte';
	import { FormattedMessageGlobal } from '@campground/locale';
	import type { Snippet } from 'svelte';

	interface Props {
		avatar?: string;
		id: string;
		domain: string;
		name: string;
		memberCount: number;
		isSelected?: boolean;
		additional?: Snippet;
	}
	const { id, avatar, domain, name, memberCount, isSelected, additional }: Props = $props();
</script>

<NavbarButton href={`/c/${id}@${domain}`}>
	<!-- Keep it even though it has nothing to keep the margin -->
	<div class="additional">
		{@render additional?.()}
	</div>
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
				<IconUserFilled size="0.75rem" />
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
	.additional {
		z-index: 10;
	}
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
