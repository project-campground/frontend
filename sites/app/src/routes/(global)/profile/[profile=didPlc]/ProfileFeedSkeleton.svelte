<script>
	import { Stack } from '@campground/ui';
	import ProfileFeedPostSkeleton from './ProfileFeedPostSkeleton.svelte';
</script>

<div class="padding">
	<Stack gap={1}>
		{#each [false, false, true, false, true] as hasParent}
			<ProfileFeedPostSkeleton {hasParent} />
		{/each}
	</Stack>
</div>

<style lang="scss">
	.padding {
		padding-top: 1rem;
		padding-bottom: 8rem;
	}
</style>
