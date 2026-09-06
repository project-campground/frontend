<script>
	import { page } from '$app/state';
	import { PagePlaceholder, FlexCenter } from '@campground/ui';
</script>

<div class="page">
	<FlexCenter>
		<PagePlaceholder.Root
			icon={page.status === 404 ? PagePlaceholder.Icon.NotFound : PagePlaceholder.Icon.Error}
			status={page.status}
		>
			{#snippet title()}
				Error
			{/snippet}
			{page.error?.message}
		</PagePlaceholder.Root>
	</FlexCenter>
</div>

<style lang="scss">
	.page {
		grid-column: 1 / 4;
	}
</style>
