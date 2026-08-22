<script lang="ts">
	import { Select, Svg, TextBlock } from '@campground/ui';

	import { knownAppviews } from '../../lib/api/api.config.ts';
</script>

{#each knownAppviews as appview}
	<Select.Option
		value={appview.url}
		color={appview.color}
	>
		{#snippet left()}
			<Svg.Logo size={2} />
		{/snippet}
		<TextBlock>
			{appview.name ?? appview.url}
		</TextBlock>
	</Select.Option>
{/each}
