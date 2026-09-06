<script lang="ts">
	import { Para } from '$lib/info/index.js';
	import type { RootProps } from './props.js';

	const { status, title, icon, class: className, children }: RootProps = $props();
</script>

<section class={['container', status && 'hasStatus', className]}>
	<div
		class="icon"
		aria-hidden="true"
	>
		{icon}
	</div>
	<Para
		class="header"
		level="h2"
		align="center"
	>
		{#if status}
			<span class="status">
				{status}
			</span>
			{' '}
		{/if}
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
		overflow: hidden;
		gap: 0.5rem;
	}
	.icon {
		font-size: 2em;
		font-weight: 900;
		color: var(--foreground-subtext);
		margin-bottom: 1rem;
		font-family: sans-serif;
	}
	.status {
		color: var(--foreground-subtext);
	}
	.body {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		flex: 1;
		overflow: hidden;

		color: var(--foreground-subheading);
		text-align: justify;
	}
</style>
