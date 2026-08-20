<script lang="ts">
	import {
		Avatar,
		Badge,
		BrandLogo,
		Group,
		Image,
		Gradient,
		Section,
		Stack,
		Svg,
		type StatusColor,
		type PositionHorizontal,
		type ComponentSize,
		Skeleton,
		Para,
		type ParaLevel,
		type PositionVertical,
	} from '$lib/index.js';
	import { IconMoonFilled } from '@tabler/icons-svelte';
	import { genericColors, sizes, sizesWithNone } from './values.js';
	import type { VisualObjectProps } from '$lib/visual/Image/props.js';
	import type { Snippet } from 'svelte';

	const positions: `${PositionVertical}-${PositionHorizontal}`[] = [
		'top-left',
		'top-right',
		'bottom-right',
		'bottom-left',
	];
	const extendedSize = [...sizes, 'xxl'] as const;
</script>

{#snippet badgeIcon()}
	<IconMoonFilled size="0.9rem" />
{/snippet}
{#snippet badgeCount()}
	99+
{/snippet}
{#snippet ImageVisualObject(props: VisualObjectProps)}
	<Image
		{...props}
		src="/example-banner.svg"
	/>
{/snippet}
{#snippet GradientVisualObject(props: VisualObjectProps)}
	{const color = genericColors[Math.ceil(Math.random() * (genericColors.length + 1))]}
	<Gradient {...props} {color}>
		adasdas
	</Gradient>
{/snippet}
{#snippet VisualObjectTest(visualObject: Snippet<[VisualObjectProps]>)}
	{#each sizesWithNone as radius (radius)}
		<Section headerLevel={2}>
			{#snippet header()}
				Radius {radius}
			{/snippet}
			<Group
				directionMobile="column"
				align="start"
			>
				{@render visualObject({ w: 6, h: 6, radius })}
				{@render visualObject({ maxh: 6, radius })}
				{@render visualObject({ maxw: 6, radius })}
				{#each [2, 3, 0.5] as ratio (ratio)}
					{@render visualObject({ w: 6, aspectRatio: ratio, radius })}
					{@render visualObject({ w: 10, aspectRatio: ratio, mobileAspectRatio: ratio / 2, radius })}
				{/each}
			</Group>
		</Section>
	{/each}
{/snippet}
<Section headerLevel={1}>
	{#snippet header()}
		Image
	{/snippet}
	<Stack>
		{@render VisualObjectTest(ImageVisualObject)}
	</Stack>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Gradient
	{/snippet}
	<Stack>
		{@render VisualObjectTest(GradientVisualObject)}
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
		{#each genericColors as color}
			{#each extendedSize as size}
				<Avatar
					src="/DefaultAvatar0.png"
					{size}
					{color}
					alt="example alt"
				/>
				<Avatar
					alt="example alt"
					{size}
					{color}
				>
					{size}</Avatar
				>
			{/each}
			<Avatar alt="example alt" {color}>None</Avatar>
		{/each}
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
						{#each extendedSize as size}
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
		{#each extendedSize as size}
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
									alt="example alt"
									{size}
								>
									{size.toUpperCase()}
								</Avatar>
							</Badge>
						{/each}
					{/each}
					<Badge
						{color}
						{size}
					>
						<Avatar
							alt="example alt"
							{size}
						>
							{size.toUpperCase()}
						</Avatar>
					</Badge>
				{/each}
			</Group>
		{/each}
	</Stack>
</Section>
