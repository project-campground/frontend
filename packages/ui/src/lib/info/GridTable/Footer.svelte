<script lang="ts">
	import type { FooterProps } from './props.ts';

	const { children, ...attrs }: FooterProps = $props();
</script>

<footer
	data-grid-table-footer={true}
	{...attrs}
>
	{@render children()}
</footer>

<style lang="scss">
	footer {
		display: contents;
	}
</style>
