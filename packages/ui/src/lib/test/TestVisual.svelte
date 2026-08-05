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
		type StatusColor,
		type PositionHorizontal,
		type PositionVertical,
		type ComponentSize,
		Skeleton,
		Para,
		type ParaLevel,
	} from '$lib/index.js';
	import { IconMoonFilled } from '@tabler/icons-svelte';
	import { sizes, sizesWithNone } from './values.js';
	import TextBlock from '$lib/info/TextBlock/TextBlock.svelte';

	const positions: `${PositionVertical}-${PositionHorizontal}`[] = [
		'top-left',
		'top-right',
		'bottom-right',
		'bottom-left',
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
					directionMobile="column"
					align="start"
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
	<Group>
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
	<Group>
		{#each sizes as size}
			<BrandLogo {size} />
		{/each}
	</Group>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Avatar
	{/snippet}
	<Group>
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
		Skeleton
	{/snippet}
	<Group>
		{#each [...sizesWithNone, 'avatar'] as ComponentSize[] as radius}
			<Section headerLevel={2}>
				{#snippet header()}
					Radius {radius}
				{/snippet}
				<Group>
					<Stack>
						{#each ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'paragraph', 'sub0', 'sub1'] as ParaLevel[] as paraLevel}
							<Para level={paraLevel}>
								<Skeleton {radius}>abcdef</Skeleton>
							</Para>
						{/each}
					</Stack>
					<Stack>
						{#each sizes as size}
							<Group>
								<Skeleton {radius}>
									<Avatar {size} />
								</Skeleton>
								<Badge
									{size}
									color="skeleton"
								>
									<Skeleton {radius}>
										<Avatar {size} />
									</Skeleton>
								</Badge>
							</Group>
						{/each}
					</Stack>
				</Group>
			</Section>
		{/each}
	</Group>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Badge
	{/snippet}
	<Stack>
		{#each sizes as size}
			<Group>
				{#each ['mention', 'online', 'idle', 'dnd', 'notification', 'offline', 'online', 'skeleton', 'neutral'] as StatusColor[] as color}
					{#each positions as pos}
						{#each [undefined, badgeIcon, badgeCount] as badge}
							<Badge
								position={pos}
								{color}
								{badge}
								{size}
							>
								<Avatar
									src="/DefaultAvatar0.png"
									alt="example alt"
									{size}
								>
									{color.slice(0, 3)}
								</Avatar>
							</Badge>
						{/each}
					{/each}
					<Badge
						{color}
						{size}
					>
						<Avatar
							src="/DefaultAvatar0.png"
							alt="example alt"
							{size}
						>
							{color.slice(0, 3)}
						</Avatar>
					</Badge>
				{/each}
			</Group>
		{/each}
	</Stack>
</Section>
