<script lang="ts">
	import rehypeRaw from 'rehype-raw';
	import remarkBreaks from 'remark-breaks';
	import rehypeSanitize from 'rehype-sanitize';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import { unified } from 'unified';
	import MarkdownFormatted from '../MarkdownFormatted.svelte';
	import Node from './Node.svelte';

	interface Props {
		value: string;
	}

	const { value }: Props = $props();

	const mdAst = $derived(unified().use(remarkParse).parse(value));
	const htmlFromMarkdown = $derived(
		await unified()
			.use(remarkBreaks)
			.use(remarkRehype, { allowDangerousHtml: false })
			.use(rehypeRaw)
			.use(rehypeSanitize)
			.run(mdAst),
	);

	$effect(() => {
		console.log('HTML', htmlFromMarkdown);
	});
</script>

<MarkdownFormatted>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{#each htmlFromMarkdown.children as content, i (i)}
		<Node {content} />
	{/each}
</MarkdownFormatted>
