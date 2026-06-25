<script lang="ts">
	import Para from '$lib/Para/Para.svelte';
	import { capitalize } from '$lib/util/component.js';
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
	class={['Section container', { subtle }, gap && `gap${capitalize(gap)}`, className]}
>
	{#if header}
		<header class="Section header">
			<Para level={`h${headerLevel ?? 2}`}>
				{@render header()}
			</Para>
		</header>
	{/if}
	{@render children?.()}
</section>

<style lang="scss">
	@use '../index.scss' as *;

	$gap-sizes: create-size-map((0.25rem, 0.5rem, 1rem, 2rem, 3rem));

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.subtle > .header > :global(.Para) {
		color: var(--foreground-subtext);
	}
	@each $size, $gap in $gap-sizes {
		.gap#{capitalize($size)} {
			gap: $gap;
		}
	}
</style>
