<script lang="ts">
	import type { SubRootProps } from './props.ts';

	const { children, parent, direction, ...attributes }: SubRootProps = $props();
</script>

<div
	class="container"
	data-threaded-direction={direction ?? 'to-bottom'}
	{...attributes}
>
	<div class="lineStart">
		<span class="line lineStartFirst"></span>
		<span class="line lineStartSecond"></span>
	</div>
	<span class="line lineEnd"></span>
	<div class="parent">
		{@render parent()}
	</div>
	<div class="items">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use './Threaded.scss' as *;

	.container {
		display: grid;
		grid-template-columns: var(--ThreadedRoot-width) 1fr;
		grid-template-rows: auto 1fr;
		padding-inline-start: var(--ThreadedRoot-padding);
		&:last-of-type {
			& > .lineEnd,
			& > .lineStart > .lineStartSecond {
				display: none;
			}
			& > .lineStart > .lineStartFirst {
				border-bottom-left-radius: var(--ThreadedRoot-radius);
			}
		}
		&[data-threaded-direction='to-top'] {
			.parent {
				grid-row: 2 / 3;
			}
			.items {
				flex-direction: column-reverse;
				grid-row: 1 / 2;
			}
			.lineEnd {
				grid-row: 1 / 2;
			}
			.lineStart {
				grid-row: 2 / 3;
			}
		}
	}

	.line {
		@extend %Threaded-line;
	}
	.lineStart {
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr;
		grid-row: 1 / 2;
		& > .lineStartFirst {
			border-left-style: solid;
			border-bottom-style: solid;
		}
		& > .lineStartSecond {
			border-left-style: solid;
		}
	}
	.lineEnd {
		border-left-style: solid;
		grid-row: 2 / 3;
	}
	.parent {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
	}
	.items {
		display: flex;
		flex-direction: column;
		align-items: stretch;

		grid-row: 2 / 3;
		grid-column: 2 / 3;
		.container:first-of-type > & {
			padding-block-start: 1rem;
		}
	}
</style>
