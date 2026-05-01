<script lang="ts">
	import { toSpacingPx } from '../../util/component.ts';
	import type GroupProps from "./props.ts";

	const { children, gap, class: className, ...props }: GroupProps = $props();
</script>

<div style:--Group-gap={toSpacingPx(gap ?? 1)} class={["Group", props, className]}>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.Group {
		display: flex;
		flex-direction: row;
		animation: cubic-bezier(1, 0, 0, 1);
		gap: var(--Group-gap);
		@include tablet-down() {
			&.withMobile {
				flex-direction: column;
				flex-wrap: wrap;
				&.mobileReversed {
					flex-direction: column-reverse;
				}
			}
		}
	}
</style>
