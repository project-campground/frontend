<script lang="ts">
	import {
		Avatar,
		Badge,
		BrandLogo,
		Group,
		Image,
		Section,
		Stack,
		Svg,
		type ComponentColorAll,
		type ComponentSize,
		type ComponentSizeWithNone,
		type StatusColor,
		type PositionHorizontal,
		type PositionVertical,
	} from '$lib/index.js';
	import { IconMoonFilled } from '@tabler/icons-svelte';

	const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
	const sizesWithNone: ComponentSizeWithNone[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
	const positions: `${PositionVertical}-${PositionHorizontal}`[] = [
		'top-left',
		'top-right',
		'bottom-right',
		'bottom-left',
	];
	const colorsWithNeutral: ComponentColorAll[] = [
		'neutral',
		'primary',
		'success',
		'info',
		'warning',
		'danger',
	];
</script>

{#snippet badgeIcon()}
	<IconMoonFilled size="0.8rem" />
{/snippet}
{#snippet badgeCount()}
	99+
{/snippet}
<Section headerLevel={1}>
	{#snippet header()}
		Image
	{/snippet}
	<Stack>
		{#each sizesWithNone as radius}
			<Section headerLevel={2}>
				{#snippet header()}
					Radius {radius}
				{/snippet}
				<Group
					wrap
					withMobile
					alignVertically="start"
				>
					<Image
						w={6}
						h={6}
						{radius}
						src="/example-banner.svg"
					/>
					<Image
						maxh={6}
						{radius}
						src="/example-banner.svg"
					/>
					<Image
						maxw={6}
						{radius}
						src="/example-banner.svg"
					/>
					{#each [2, 3, 0.5] as ratio}
						<Image
							src="/example-banner.svg"
							w={6}
							aspectRatio={ratio}
							{radius}
						/>
						<Image
							src="/example-banner.svg"
							w={10}
							aspectRatio={ratio}
							mobileAspectRatio={ratio / 2}
							{radius}
						/>
					{/each}
				</Group>
			</Section>
		{/each}
	</Stack>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		SvgUse
	{/snippet}
	<Group wrap>
		<Svg.Use id="logo" />
		<Svg.Use
			id="logo"
			size={8}
		/>
		<Svg.Use
			id="logo"
			w={3}
			h={8}
		/>
	</Group>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		BrandLogo
	{/snippet}
	<Group wrap>
		{#each sizes as size}
			<BrandLogo {size} />
		{/each}
	</Group>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Avatar
	{/snippet}
	<Group wrap>
		{#each sizes as size}
			<Avatar
				src="/DefaultAvatar0.png"
				{size}
				alt="example alt"
			/>
			<Avatar
				alt="example alt"
				{size}
			>
				{size}</Avatar
			>
		{/each}
		<Avatar alt="example alt">None</Avatar>
	</Group>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Badge
	{/snippet}
	<Group wrap>
		{#each ['mention', 'online', 'idle', 'dnd', 'notification', 'offline', 'online'] as StatusColor[] as color}
			{#each positions as pos}
				{#each [undefined, badgeIcon, badgeCount] as badge}
					<Badge
						position={pos}
						{color}
						{badge}
					>
						<Avatar
							src="/DefaultAvatar0.png"
							alt="example alt"
						>
							{color.slice(0, 3)}
						</Avatar>
					</Badge>
				{/each}
			{/each}
			<Badge {color}>
				<Avatar
					src="/DefaultAvatar0.png"
					alt="example alt"
				>
					{color.slice(0, 3)}
				</Avatar>
			</Badge>
		{/each}
	</Group>
</Section>
