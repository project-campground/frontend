<script lang="ts">
	import { Divider } from '$lib/info/index.js';
	import type { DividerProps } from './props.ts';

	const { orientation }: DividerProps = $props();
</script>

<div
	class="container"
	data-orientation={orientation ?? 'horizontal'}
>
	<div class="divider">
		<Divider
			color="background"
			{orientation}
		/>
	</div>
</div>

<style lang="scss">
	@use '../../index.scss' as *;

	.container {
		position: relative;
	}
	.divider {
		position: absolute;
		[data-orientation='horizontal'] > & {
			left: calc(-1 * var(--Dialog-paddingX) - 1px);
			// * 2, because left already offsets it, + 2, because left offsets left-side border
			width: calc(100% + var(--Dialog-paddingX) * 2 + 2px);
		}
		[data-orientation='vertical'] > & {
			top: calc(-1 * var(--Dialog-paddingY) - 1px);
			height: calc(100% + var(--Dialog-paddingY) * 2 + 2px);
		}
	}
</style>
