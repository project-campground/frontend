<script lang="ts">
	import { capitalize } from '$lib/util/component.js';
	import { IconCaretRightFilled } from '@tabler/icons-svelte';
	import type AccordionProps from './props.ts';

	let {
		children,
		header,
		gap,
		subtle,
		class: className,
		expanded = $bindable(false),
		noBackground,
		...attributes
	}: AccordionProps = $props();
</script>

<section
	{...attributes}
	class={[
		'Accordion container',
		{ expanded, subtle, noBackground },
		gap && `gap${capitalize(gap)}`,
		className,
	]}
>
	<button
		class="Accordion button"
		aria-expanded={expanded}
		onclick={() => (expanded = !expanded)}
	>
		<span class="Accordion header">
			{@render header()}
		</span>
		<span class="Accordion arrow">
			<IconCaretRightFilled size="1em" />
		</span>
	</button>
	<article class="Accordion content">
		{@render children?.()}
	</article>
</section>

<style lang="scss">
	@use '../index.scss' as *;

	$gap-sizes: create-size-map((0.25rem, 0.5rem, 1rem, 2rem, 3rem));

	.container {
		display: flex;
		flex-direction: column;

		background-color: var(--neutral-softBack);

		transition: background, box-shadow, border, color;
		transition-duration: $transition-time-md;
		border-radius: var(--radius-md);

		gap: var(--Accordion-gap);

		&.subtle > .button {
			color: var(--foreground-subtext);
		}
	}
	.noBackground {
		background-color: transparent;
	}
	.button {
		display: flex;
		flex-direction: row;
		align-items: center;

		text-align: left;
		outline: none;
		background-color: transparent;
		cursor: pointer;

		gap: 2ch;

		border-radius: var(--radius-md);

		--Accordion-glow: transparent;
		border: solid 1px var(--Accordion-glow);

		color: var(--foreground-subheading);
		font-size: 1em;
		font-family: var(--font-display);
		padding: 0.5rem 1rem;

		transition: background, box-shadow, border, color;
		transition-duration: $transition-time-md;

		&:hover {
			background-color: var(--neutral-softBackHover);
		}
		&:active,
		&:active:hover {
			background-color: var(--neutral-softBackActive);
		}
		&:focus-visible {
			--Accordion-glow: var(--primary-regularGlow);
		}
	}
	.header {
		flex: 1;
	}
	.arrow {
		transition: transform $transition-time-md;
		line-height: 0;
		color: var(--foreground-subtext);
		.expanded & {
			transform: rotate(90deg);
		}
	}
	:not(.expanded) > .content {
		display: none;
	}
	.content {
		display: flex;
		flex-direction: column;
		padding: 0 1rem 0.5rem 1rem;
	}
	@each $size, $gap in $gap-sizes {
		.gap#{capitalize($size)} {
			--Accordion-gap: #{$gap};
		}
	}
</style>
