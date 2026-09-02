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

	@mixin in-direction($value) {
		:global([data-threaded-direction='#{$value}'] > .items) > & {
			@content;
		}
	}

	.container {
		display: grid;
		grid-template-columns: var(--ThreadedRoot-width) 1fr;
		grid-template-rows: 1fr 1fr;
		padding-inline-start: var(--ThreadedRoot-padding);
		@include in-direction('to-bottom') {
			.lineStart {
				grid-row: 1 / 2;
				border-bottom-style: solid;
			}
			.lineEnd {
				grid-row: 2 / 3;
			}
			&:last-of-type {
				& > .lineStart {
					border-bottom-left-radius: var(--ThreadedRoot-radius);
				}
			}
		}
		@include in-direction('to-top') {
			.lineStart {
				grid-row: 2 / 3;
				border-top-style: solid;
			}
			.lineEnd {
				grid-row: 1 / 2;
			}
			&:last-of-type {
				& > .lineStart {
					border-top-left-radius: var(--ThreadedRoot-radius);
				}
			}
		}
		&:last-of-type {
			& > .lineEnd {
				display: none;
			}
		}
	}

	.line {
		border-left-style: solid;
		@extend %Threaded-line;
	}
	.content {
		padding-block: 0.5rem;
		grid-row: 1 / 3;
		grid-column: 2 / 3;
	}
</style>
