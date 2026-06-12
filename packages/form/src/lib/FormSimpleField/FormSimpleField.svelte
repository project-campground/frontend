<script lang="ts">
	import { Para } from '@campground/ui';
	import type FormSimpleFieldProps from './props.ts';

	const {
		header,
		children,
		component,
		reverse,
		class: className,
		...props
	}: FormSimpleFieldProps = $props();
</script>

<div class={['FormSimpleField container', { reverse }, className]} {...props}>
	<header class={['FormSimpleField header']}>
		{@render component()}
		{#if header}
			<Para class={['FormSimpleField title']} weight={700}>
				{@render header()}
			</Para>
		{/if}
	</header>
	<section class={['FormSwitch description']}>
		{@render children?.()}
	</section>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1ch;
	}
	.reverse > .header {
		flex-direction: row-reverse;
	}
	.description {
		color: var(--palette-foreground-level4);
	}
	.header > :global(.title) {
		display: flex;
		flex-direction: row;
		gap: 1ch;
		flex: 1;
	}
</style>
