<script lang="ts">
	import { Para } from '#lib/info/index.js';
	import { notInherited } from '#lib/util/component.js';
	import type { RootProps } from './props.js';

	const { status, title, icon, class: className, fullHeight, flex, children }: RootProps = $props();
</script>

<section
	data-status={status}
	data-full-height={fullHeight}
	style:--Layout-flex={notInherited(flex)}
	class={['container', className]}
>
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
	@use '../../hierarchy/Layout.scss' as *;

	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		overflow: hidden;
		gap: 0.5rem;

		&[data-full-height='true'] {
			height: 100%;
		}

		@extend %InLayout;
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
		max-width: 100%;

		color: var(--foreground-subheading);
		text-align: justify;
	}
</style>
