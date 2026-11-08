<script lang="ts">
	import { Main } from '@campground/ui';
	import type { LayoutProps } from './$types';

	const { children }: LayoutProps = $props();
</script>

<Main>
	{@render children()}
</Main>

<style lang="scss">
	:global(main#main) {
		width: 100%;
		min-height: 100%;
		height: 100%;
	}
</style>
