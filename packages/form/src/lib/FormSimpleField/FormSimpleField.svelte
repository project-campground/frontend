<script lang="ts">
	import { Para } from '@campground/ui';
	import type FormSimpleFieldProps from './props.ts';

	const key = $props.id();

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
		{@render component(key)}
		{#if header}
			<label class={['FormSimpleField title']} for={key}>
				{@render header()}
			</label>
		{/if}
	</header>
	{#if children}
		<section class={['FormSimpleField description']}>
			{@render children()}
		</section>
	{/if}
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
	.title {
		font-weight: 700;
		color: var(--palette-foreground-level2);
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
