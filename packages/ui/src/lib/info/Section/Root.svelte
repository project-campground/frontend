<script lang="ts">
	import { Para } from '$lib/index.js';
	import type SectionProps from './props.ts';

	const {
		children,
		header,
		headerLevel,
		gap,
		subtle,
		class: className,
		...attributes
	}: SectionProps = $props();
</script>

<section
	{...attributes}
	class={['container', { subtle }, className]}
	data-gap={gap}
>
	{#if header}
		<header class="header">
			<Para level={`h${headerLevel ?? 2}`}>
				{@render header()}
			</Para>
		</header>
	{/if}
	{@render children?.()}
</section>

<style lang="scss">
	@use '../../common.scss' as *;

	$gap-sizes: create-size-map((0.25rem, 0.5rem, 1rem, 2rem, 3rem));

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		@each $size, $gap in $gap-sizes {
			&[data-gap='#{$size}'] {
				gap: $gap;
			}
		}
	}
	.subtle > .header > :global(.Para) {
		color: var(--foreground-subtext);
	}
</style>
