<script lang="ts">
	import type { BodyProps } from './props.ts';

	const { children, ...attrs }: BodyProps = $props();
</script>

<section
	data-grid-table-body={true}
	{...attrs}
>
	{@render children()}
</section>

<style lang="scss">
	section {
		display: contents;
		overflow-y: scroll;
	}
</style>
