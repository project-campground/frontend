<script>
	import { page } from '$app/state';
	import { PagePlaceholder, PagePlaceholderIcon } from '@campground/ui';
</script>

<div class="page">
	<PagePlaceholder
		icon={page.status === 404 ? PagePlaceholderIcon.NotFound : PagePlaceholderIcon.Error}
		status={page.status}
	>
		{#snippet title()}
			Error
		{/snippet}
		{page.error?.message}
	</PagePlaceholder>
</div>

<style lang="scss">
	.page {
		grid-column: 1 / 4;
	}
</style>
