<script lang="ts">
	import { capitalize, toSpacingPx } from '../util/component.ts';
	import type GroupProps from './props.ts';

	const {
		children,
		gap,
		class: className,
		wrap,
		withMobile,
		mobileReversed,
		alignVertically,
		...attributes
	}: GroupProps = $props();
</script>

<div
	{...attributes}
	style:--Group-gap={toSpacingPx(gap ?? 1)}
	class={[
		'Group',
		{ wrap, withMobile, mobileReversed },
		alignVertically && `alignVertically${capitalize(alignVertically)}`,
		className,
	]}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.Group {
		display: flex;
		flex-direction: row;
		gap: var(--Group-gap);
		&.wrap {
			flex-wrap: wrap;
		}
		&.alignVerticallyStart {
			align-items: start;
		}
		&.alignVerticallyCenter {
			align-items: center;
		}
		&.alignVerticallyEnd {
			align-items: end;
		}
		&.alignVerticallyStretch {
			align-items: stretch;
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
