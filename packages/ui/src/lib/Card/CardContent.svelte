<script lang="ts">
	import type { ContentProps } from './props.ts';

	const { class: className, gap, children }: ContentProps = $props();
</script>

<div
	class={['Card CardContent', className]}
	data-gap={gap}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	.CardContent {
		display: flex;
		flex-direction: column;
		@each $size, $value in $gaps {
			&[data-gap='#{$size}'] {
				gap: $value;
			}
		}
	}
</style>
