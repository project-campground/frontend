<script lang="ts">
	import { Para } from '$lib/info/index.js';
	import type PagePlaceholderProps from './props.ts';
	import { pagePlaceholderIconValues } from './props.ts';

	const { status, title, icon, class: className, children }: PagePlaceholderProps = $props();
</script>

<section class={['container', status && 'hasStatus', className]}>
	<div
		class="icon"
		aria-hidden="true"
	>
		{pagePlaceholderIconValues[icon]}
	</div>
	<Para
		class="header"
		level="h2"
	>
		{#if status}
			<span class="status">
				{status}
			</span>
		{/if}
		{' '}
		{@render title()}
	</Para>
	<div class="body">
		{@render children()}
	</div>
</section>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		gap: 0.5rem;
	}
	.icon {
		font-size: 2em;
		font-weight: 900;
		color: var(--foreground-subtext);
		margin-bottom: 1rem;
	}
	.status {
		color: var(--foreground-subtext);
	}
	.body {
		color: var(--foreground-subheading);
	}
</style>
