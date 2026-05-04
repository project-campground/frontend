<script lang="ts">
	import { toSpacingPx } from '../../util/component.ts';
	import type GroupProps from './props.ts';

	const { children, gap, class: className, wrap, withMobile, mobileReversed, ...attributes }: GroupProps = $props();
</script>

<div {...attributes} style:--Group-gap={toSpacingPx(gap ?? 1)} class={['Group', { wrap, withMobile, mobileReversed }, className]}>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.Group {
		display: flex;
		flex-direction: row;
		animation: cubic-bezier(1, 0, 0, 1);
		gap: var(--Group-gap);
		&.wrap {
			flex-wrap: wrap;
		}
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
