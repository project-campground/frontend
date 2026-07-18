<script lang="ts">
	import { toSpacingPx } from '../util/component.ts';
	import type GroupProps from './props.ts';

	const {
		children,
		gap,
		class: className,
		wrap,
		withMobile,
		mobileReversed,
		reversed,
		alignVertically,
		...attributes
	}: GroupProps = $props();
</script>

<div
	{...attributes}
	style:--Group-gap={toSpacingPx(gap ?? 1)}
	class={[{ wrap, reversed, withMobile, mobileReversed }, className]}
	data-align-vertically={alignVertically ?? 'center'}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	div {
		display: flex;
		flex-direction: row;
		align-items: center;

		gap: var(--Group-gap);

		&.reversed {
			flex-direction: row-reverse;
		}

		&.wrap {
			flex-wrap: wrap;
		}
		&[data-align-vertically='start'] {
			align-items: start;
		}
		&[data-align-vertically='end'] {
			align-items: end;
		}
		&[data-align-vertically='stretch'] {
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
