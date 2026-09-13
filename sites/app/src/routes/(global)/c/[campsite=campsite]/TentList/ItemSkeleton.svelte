<script lang="ts">
	import { loremIpsum, Skeleton } from '@campground/ui';
	import Item from './Item.svelte';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';
</script>

<Item>
	<Skeleton>
		<TentIcon
			type="text"
			viewType={0}
		/>
	</Skeleton>
	<Skeleton>
		{loremIpsum.sm}
	</Skeleton>
</Item>
