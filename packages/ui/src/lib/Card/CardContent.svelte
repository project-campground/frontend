<script lang="ts">
	import { capitalize } from '$lib/util/component.js';
	import type { ContentProps } from './props.ts';

	const { class: className, gap, children }: ContentProps = $props();
</script>

<div class={['Card CardContent', gap && `gap${capitalize(gap)}`, className]}>
	{@render children()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	.CardContent {
		display: flex;
		flex-direction: column;
		@each $size, $value in $gaps {
			&.gap#{capitalize($size)} {
				gap: $value;
			}
		}
	}
</style>
