<script lang="ts">
	import type { FormattedProps } from './props.ts';

	const { children }: FormattedProps = $props();
</script>

<div class="container">
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../../css/markdown.scss' as *;

	.container {
		text-wrap: wrap;
		line-break: normal;
		@extend %MarkdownContent-basic;
	}
</style>
