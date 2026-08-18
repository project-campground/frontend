<script
	lang="ts"
	module
>
	const pdsIconToComponent: Partial<Record<KnownInstanceIcon, typeof IconBrandBluesky>> = {
		bluesky: IconBrandBluesky,
	};
</script>

<script lang="ts">
	import { Select, Svg, TextBlock } from '@campground/ui';

	import { knownPds, type KnownInstance, type KnownInstanceIcon } from '../../lib/api/api.config.ts';
	import { IconBrandBluesky } from '@tabler/icons-svelte';
</script>

{#each knownPds as pds}
	<Select.Option
		value={pds.url}
		color={pds.color}
	>
		{#snippet left()}
			{#if pds.icon === 'campground'}
				<Svg.Logo size={2} />
			{:else if pds.icon}
				{const IconComponent = pdsIconToComponent[pds.icon]}
				<IconComponent size="2rem" />
			{/if}
		{/snippet}
		<TextBlock>
			{pds.name ?? pds.url}
		</TextBlock>
	</Select.Option>
{/each}
