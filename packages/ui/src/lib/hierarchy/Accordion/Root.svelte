<script lang="ts">
	import { IconCaretRightFilled } from '@tabler/icons-svelte';
	import type AccordionProps from './props.ts';

	let {
		children,
		header,
		subtle,
		class: className,
		size,
		expanded = $bindable(false),
		noBackground,
		...attributes
	}: AccordionProps = $props();
</script>

<section
	{...attributes}
	class={['container', { expanded, subtle, noBackground }, className]}
	data-size={size ?? 'md'}
>
	<button
		class="button"
		aria-expanded={expanded}
		onclick={() => (expanded = !expanded)}
	>
		<span class="header">
			{@render header()}
		</span>
		<span class="arrow">
			<IconCaretRightFilled size="1em" />
		</span>
	</button>
	<article class="content">
		{@render children?.()}
	</article>
</section>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../../form/Button/Button.scss' as *;

	.container {
		display: flex;
		flex-direction: column;

		background-color: var(--neutral-softBack);

		transition: background, box-shadow, border, color;
		transition-duration: $transition-time-md;
		border-radius: var(--radius-md);

		@each $size, $value in $button-padding {
			&[data-size='#{$size}'] > .button {
				padding: calc($value * 1rem) button-padding-x($value);
			}
		}

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
		font-weight: 700;
		font-size: 0.9em;
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
		height: 0;
	}
	.content {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: auto;
		transition-property: height, content-visibility;
		transition-duration: $transition-time-md;
		interpolate-size: allow-keywords;
		transition-behavior: allow-discrete;
	}
</style>
