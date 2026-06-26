<script lang="ts">
	import { Avatar, BrandLogo, Group, Image, Section, Stack } from '$lib/index.js';
	import SvgUse from '$lib/svg/SvgUse.svelte';
	import type { ComponentSize, ComponentSizeWithNone } from '$lib/types/attributes.js';

	const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
	const sizesWithNone: ComponentSizeWithNone[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
</script>

<Section headerLevel={1}>
	{#snippet header()}
		Image
	{/snippet}
	<Stack>
		{#each sizesWithNone as radius}
			<Group wrap>
				<Image
					w={10}
					h={10}
					{radius}
					src="/example-banner.svg"
				/>
				<Image
					mh={10}
					{radius}
					src="/example-banner.svg"
				/>
				<Image
					mw={10}
					{radius}
					src="/example-banner.svg"
				/>
			</Group>
		{/each}
	</Stack>
</Section>
<Section headerLevel={1}>
	{#snippet header()}
		SvgUse
	{/snippet}
	<Group wrap>
		<SvgUse id="logo" />
		<SvgUse
			id="logo"
			size={8}
		/>
		<SvgUse
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
		<Avatar alt="example alt" />
	</Group>
</Section>
