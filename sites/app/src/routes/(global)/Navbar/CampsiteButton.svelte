<script lang="ts">
	import { Group, TextBlock } from '@campground/ui';
	import NavbarButton from './NavbarButton.svelte';
	import { IconUserFilled } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import ProfileAvatar from '$lib/components/pages/ProfileAvatar.svelte';
	import { localeStrings } from '$lib/locale/index.ts';
	import { LocaleMessage } from '@campground/locale';

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
				<LocaleMessage
					{...localeStrings.campsites.members}
					values={{ count: memberCount }}
				/>
			</Group>
		</TextBlock>
	</div>
	<ProfileAvatar
		id={id.slice(-1)}
		src={avatar}
		size="sm"
	>
		{name[0].toUpperCase()}
	</ProfileAvatar>
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
