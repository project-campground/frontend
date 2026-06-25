<script lang="ts">
	import Para from '$lib/Para/Para.svelte';
	import type PagePlaceholderProps from './props.ts';
	import { pagePlaceholderIconValues } from './props.ts';

	const { status, title, icon, class: className, children }: PagePlaceholderProps = $props();
</script>

<section class={['PagePlaceholder container', status && 'hasStatus', className]}>
	<div class="PagePlaceholder icon" aria-hidden="true">
		{pagePlaceholderIconValues[icon]}
	</div>
	<Para class="PagePlaceholder header" level="h2">
		{#if status}
			<span class="PagePlaceholder status">
				{status}
			</span>
		{/if}
		{' '}
		{@render title()}
	</Para>
	<div class="PagePlaceholder body">
		{@render children()}
	</div>
</section>

<style lang="scss">
	.PagePlaceholder {
		&.container {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 100%;
			height: 100%;
		}
		&.icon {
			font-size: 2em;
			font-weight: 900;
			color: var(--foreground-subtext);
			margin-bottom: 16px;
		}
		&.status {
			color: var(--foreground-subtext);
		}
		&.body {
			color: var(--foreground-subheading);
		}
	}
</style>
