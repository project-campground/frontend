<script lang="ts">
	import type { HeaderProps } from './props.ts';

	const { children, ...attrs }: HeaderProps = $props();
</script>

<header
	data-grid-table-header={true}
	{...attrs}
>
	{@render children()}
</header>

<style lang="scss">
	header {
		display: contents;
	}
</style>
