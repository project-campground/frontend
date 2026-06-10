<script lang="ts">
	import { Para } from '@campground/ui';
	import type FormSimpleFieldProps from './props.ts';

	const {
		header,
		children,
		component,
		class: className,
		...props
	}: FormSimpleFieldProps = $props();
</script>

<div class={['FormSimpleField container', className]} {...props}>
	<header class={['FormSimpleField header']}>
		{#if header}
			<Para class={['FormSwitch title']} weight={700}>
				{@render header()}
			</Para>
		{/if}
		{@render component()}
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
		gap: 2ch;
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
