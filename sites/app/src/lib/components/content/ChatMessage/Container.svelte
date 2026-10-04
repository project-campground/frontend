<script lang="ts">
	import { MessageState } from './index.ts';
	import type { ContainerProps } from './props.ts';

	const { children, beingRepliedTo, state: loadState, continuousMessage }: ContainerProps = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={['container']}
	data-load-state={Object.entries(MessageState)
		.find((x) => x[1] === loadState)?.[0]
		.toLowerCase() ?? 'loaded'}
	data-state={beingRepliedTo ? 'replying' : 'default'}
	data-continuous-message={continuousMessage}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		position: relative;

		display: flex;
		flex-direction: column;

		transition: background $transition-time-md;
		&:hover {
			background-color: var(--background-content);
		}
		&[data-state='replying'] {
			background-color: var(--primary-softBack);
			&:hover {
				background-color: var(--primary-softBackHover);
			}
			&::before {
				background: linear-gradient(to bottom, var(--primary-glowFirst), var(--primary-glowSecond));
			}
		}
		&::before {
			position: absolute;
			content: '';
			top: 0.5rem;
			left: 0.5rem;
			bottom: 0.5rem;

			width: 0.25rem;
			border-radius: var(--radius-sm);
		}
		border-radius: var(--radius-md);

		&:not([data-continuous-message='true']) {
			margin-top: 1rem;
		}
	}
</style>
