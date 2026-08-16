<script lang="ts">
	import type { ItemProps } from './props.ts';

	const { children, ...attributes }: ItemProps = $props();
</script>

<div
	class="container"
	{...attributes}
>
	<span class="line lineStart"></span>
	<span class="line lineEnd"></span>
	<div class="content">
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use './Threaded.scss' as *;

	.container {
		display: grid;
		grid-template-columns: var(--ThreadedRoot-width) 1fr;
		grid-template-rows: 1fr 1fr;
		padding-inline-start: var(--ThreadedRoot-padding);
		&:last-of-type {
			& > .lineEnd {
				display: none;
			}
			& > .lineStart {
				border-bottom-left-radius: var(--ThreadedRoot-radius);
			}
		}
	}

	.line {
		@extend %Threaded-line;
	}
	.lineStart {
		border-left-style: solid;
		border-bottom-style: solid;
		grid-row: 1 / 2;
	}
	.lineEnd {
		border-left-style: solid;
		grid-row: 2 / 3;
	}
	.content {
		padding-block: 0.5rem;
		grid-row: 1 / 3;
		grid-column: 2 / 3;
		.container:first-of-type > & {
			padding-block-start: 1rem;
		}
	}
</style>
