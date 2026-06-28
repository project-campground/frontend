<script lang="ts">
	import {
		Alert,
		Card,
		GradientText,
		Group,
		Para,
		Section,
		Stack,
		TextBlock,
		type ComponentColor,
		type ComponentSize,
		type GradientMotion,
	} from '$lib/index.js';
	import type { ParaLevel } from '$lib/Para/props.js';
	import IconLogo from '$lib/svg/IconLogo.svelte';

	const gradientMotions: GradientMotion[] = ['none', 'linear', 'wave', 'radial'];
	const gradientTextMaxColors = [
		['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF'],
		['#FFF', '#000'],
	];
	const gradientTextColors = gradientTextMaxColors.flatMap((x) =>
		Array(x.length)
			.fill(null)
			.map((_, i) => x.slice(0, i + 1)),
	);

	const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
	const colors: ComponentColor[] = ['primary', 'success', 'info', 'warning', 'danger'];
</script>

{#snippet icon()}
	<IconLogo size={2} />
{/snippet}

<Section headerLevel={1}>
	{#snippet header()}
		Paragraphs (Para)
	{/snippet}
	<Stack>
		{#each [500, 600, 700, 800, 900] as const as weight}
			{#each ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'para', 'sub0', 'sub1'] as ParaLevel[] as level}
				<Group>
					{#each [undefined, ...colors] as color}
						<Para
							{level}
							{color}
							{weight}>{weight} {level} {color}</Para
						>
					{/each}
				</Group>
			{/each}
		{/each}
	</Stack>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Card
	{/snippet}
	<div>
		{#each sizes as size}
			<Section headerLevel={2}>
				{#snippet header()}
					{size}
				{/snippet}
				{#each ['default', 'subtle'] as const as level}
					<Group
						wrap
						alignVertically="start"
					>
						<Card.Root
							{size}
							{level}
						>
							<TextBlock>Example no content {size} level {level}</TextBlock>
						</Card.Root>
						<Card.Root
							{size}
							{level}
						>
							<Card.Content>
								<TextBlock>Example {size} level {level}</TextBlock>
							</Card.Content>
						</Card.Root>
						<Card.Root
							{size}
							{level}
						>
							<Card.Overflow>
								<TextBlock>Example overflow {size} level {level}</TextBlock>
							</Card.Overflow>
							<Card.Content>
								<TextBlock>Example</TextBlock>
							</Card.Content>
						</Card.Root>
						<Card.Root
							{size}
							{level}
						>
							<Card.Overflow>
								<TextBlock>Example overflow {size} level {level}</TextBlock>
							</Card.Overflow>
						</Card.Root>
						<Card.Root
							{size}
							{level}
						>
							<Card.Content>
								<TextBlock>Example content 1 {size} level {level}</TextBlock>
							</Card.Content>
							<Card.Content>
								<TextBlock>Example content 2</TextBlock>
							</Card.Content>
							<Card.Content>
								<TextBlock>Example content 3</TextBlock>
							</Card.Content>
							<Card.Content>
								<TextBlock>Example content 4</TextBlock>
							</Card.Content>
						</Card.Root>
					</Group>
				{/each}
			</Section>
		{/each}
	</div>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		GradientText
	{/snippet}
	<div
		style:font-weight="bolder"
		style:font-size="2.5rem"
	>
		{#each gradientMotions as motion}
			<Group wrap>
				<GradientText {motion}>0 colors {motion}</GradientText>
				{#each gradientTextColors as colors}
					<GradientText
						{colors}
						{motion}>{colors.length} colors {motion}</GradientText
					>
				{/each}
			</Group>
		{/each}
	</div>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Alert
	{/snippet}
	<div>
		{#each sizes as size}
			<h2>{size}</h2>
			<Group wrap>
				{#each colors as color}
					<Alert
						{icon}
						{color}
						{size}
					>
						{color}
						{size}
					</Alert>
				{/each}
			</Group>
		{/each}
	</div>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Section
	{/snippet}
	<Stack gap={8}>
		{#each sizes as gap}
			{#each [1, 2, 3, 4, 5, 6] as const as headerLevel}
				<Group wrap>
					<Section
						{gap}
						{headerLevel}
					>
						{#snippet header()}
							{gap} gap and header level {headerLevel}
						{/snippet}
						{gap} gap and header level {headerLevel}
					</Section>
					<Section
						{gap}
						{headerLevel}
						subtle
					>
						{#snippet header()}
							{gap} gap and header level {headerLevel} subtle
						{/snippet}
						{gap} gap and header level {headerLevel} subtle
					</Section>
				</Group>
			{/each}
		{/each}
	</Stack>
</Section>
