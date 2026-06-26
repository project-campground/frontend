<script lang="ts">
	import { PagePlaceholder, PagePlaceholderIcon } from '@campground/ui';
	import type { Snippet } from 'svelte';

	const { status, title, children }: { status: number; title: Snippet; children: Snippet } =
		$props();
</script>

<div class="ErrorPage">
	<PagePlaceholder
		icon={PagePlaceholderIcon.Error}
		{status}
		{title}
		{children}
	/>
</div>

<style lang="scss">
	.ErrorPage {
		padding: 128px 256px 256px 256px;
	}
</style>
