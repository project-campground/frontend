<script lang="ts">
	import { MessageState } from './index.ts';
	import type { WrapperProps } from './props.ts';

	const { state, children }: WrapperProps = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="wrapper"
	data-load-state={Object.entries(MessageState)
		.find((x) => x[1] === state)?.[0]
		.toLowerCase() ?? 'loaded'}
>
	{@render children?.()}
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: 0.5rem;
		padding: 0.25rem 1.5rem;

		&[data-load-state='creating'],
		&[data-load-state='failed'] {
			opacity: 0.5;
		}
	}
</style>
