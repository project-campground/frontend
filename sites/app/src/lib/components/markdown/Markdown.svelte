<script lang="ts">
	import rehypeRaw from 'rehype-raw';
	import remarkBreaks from 'remark-breaks';
	import rehypeSanitize from 'rehype-sanitize';
	import rehypeStringify from 'rehype-stringify';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import { unified } from 'unified';

	interface Props {
		value: string;
	}

	const { value }: Props = $props();
	const htmlFromMarkdown = $derived(
		await unified()
			.use(remarkParse)
			.use(remarkBreaks)
			.use(remarkRehype, { allowDangerousHtml: false })
			.use(rehypeRaw)
			.use(rehypeSanitize)
			.use(rehypeStringify)
			.process(value)
			.then((value) => String(value)),
	);
</script>

<div class="container">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html htmlFromMarkdown}
</div>

<style lang="scss">
	@use '../../css/markdown.scss' as *;

	.container {
		text-wrap: wrap;
		line-break: normal;
		@extend %MarkdownContent-basic;
	}
</style>
