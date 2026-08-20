<script lang="ts">
	import {
		Accordion,
		Button,
		Card,
		Group,
		Stack,
		type ComponentSize,
		TextBlock,
		Paged,
		Section,
		GradientText,
		Threaded,
		Para,
	} from '$lib/index.js';

	const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
	let pagedIndex = $state(0);
</script>

<Section headerLevel={1}>
	{#snippet header()}
		Paged
	{/snippet}
	<div>
		<Paged.Root
			index={pagedIndex}
			count={6}
		>
			{#each [0, 1, 2, 3, 4, 5] as page}
				<Paged.Item>
					{page}
				</Paged.Item>
			{/each}
		</Paged.Root>
		<Group>
			<Button
				onclick={() => pagedIndex--}
				disabled={pagedIndex < 1}>Back</Button
			>
			<Button
				onclick={() => pagedIndex++}
				disabled={pagedIndex > 5}>Next</Button
			>
		</Group>
	</div>
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
					<Group align="start">
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
		Threaded
	{/snippet}
	<div>
		<Stack>
			{#each sizes as size}
				<Group>
					<Threaded.Root {size}>
						{#snippet parent()}
							<Card.Root {size}>
								<Card.Content>
									<Para>Threaded size {size}</Para>
									<Para>Parent</Para>
								</Card.Content>
							</Card.Root>
						{/snippet}
						<Threaded.Item>
							<Card.Root {size}>Example item #1</Card.Root>
						</Threaded.Item>
						<Threaded.SubRoot>
							{#snippet parent()}
								<Card.Root {size}>Example item #2</Card.Root>
							{/snippet}
							{#each [1, 2, 3] as i}
								<Threaded.Item>
									<Card.Root {size}>Example item #2.{i}</Card.Root>
								</Threaded.Item>
							{/each}
						</Threaded.SubRoot>
						<Threaded.Item>
							<Card.Root size="xl">Example item #3</Card.Root>
						</Threaded.Item>
					</Threaded.Root>
					<Threaded.Root {size}>
						{#snippet parent()}
							<Card.Root {size}>
								<Card.Content>
									<Para>Threaded size {size}</Para>
									<Para>Parent</Para>
								</Card.Content>
							</Card.Root>
						{/snippet}
						<Threaded.Item>
							<Card.Root>Example item #1</Card.Root>
						</Threaded.Item>
						<Threaded.SubRoot>
							{#snippet parent()}
								<Card.Root size="xl">Example item #2</Card.Root>
							{/snippet}
							{#each [1, 2, 3] as i}
								<Threaded.Item>
									<Card.Root>Example item #2.{i}</Card.Root>
								</Threaded.Item>
							{/each}
						</Threaded.SubRoot>
					</Threaded.Root>
				</Group>
			{/each}
		</Stack>
	</div>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		Accordion
	{/snippet}
	<Stack gap={8}>
		{#each [true, false] as noBackground}
			{#each sizes as size}
				<Group>
					<Accordion
						{noBackground}
						{size}
					>
						{#snippet header()}
							Accordion {size} {noBackground ? 'no background' : ''}
						{/snippet}
						Example accordion {size}
						<GradientText colors={['#FF0000', '#00FF00', '#0000FF']}>Example 2</GradientText>
					</Accordion>
					<Accordion
						subtle
						{noBackground}
						{size}
					>
						{#snippet header()}
							Accordion {size} subtle {noBackground ? 'no background' : ''}
						{/snippet}
						Example accordion {size}
						<GradientText colors={['#FF0000', '#00FF00', '#0000FF']}>Example 2</GradientText>
					</Accordion>
				</Group>
			{/each}
		{/each}
	</Stack>
</Section>
