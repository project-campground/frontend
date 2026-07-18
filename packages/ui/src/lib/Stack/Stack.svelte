<script lang="ts">
	import { capitalizePhrase, toSpacingPx } from '../util/component.ts';
	import type StackProps from './props.ts';

	const {
		children,
		gap,
		class: className,
		direction,
		directionMobile,
		...attributes
	}: StackProps = $props();
</script>

<div
	{...attributes}
	style:--Stack-gap={toSpacingPx(gap ?? 1)}
	class={[
		'Stack',
		direction && `direction${capitalizePhrase(direction)}`,
		directionMobile && `mobileDirection${capitalizePhrase(directionMobile)}`,
		className,
	]}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.Stack {
		display: flex;
		flex-direction: column;
		gap: var(--Stack-gap);

		&.directionColumn {
			flex-direction: column;
		}
		&.directionColumnReverse {
			flex-direction: column-reverse;
		}
		&.directionRow {
			flex-direction: row;
		}
		&.directionRowReverse {
			flex-direction: row-reverse;
		}

		@include tablet-down() {
			&.mobileDirectionColumn {
				flex-direction: column;
			}
			&.mobileDirectionColumnReverse {
				flex-direction: column-reverse;
			}
			&.mobileDirectionRow {
				flex-direction: row;
			}
			&.mobileDirectionRowReverse {
				flex-direction: row-reverse;
			}
		}
	}
</style>
