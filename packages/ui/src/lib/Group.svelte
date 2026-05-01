<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { toSpacingPx } from '../util/component.ts';

	export interface Props {
		children?: Snippet;
		class?: ClassValue;
		wrap?: boolean;
		withMobile?: boolean;
		mobileReversed?: boolean;
		gap?: number;
	}

	const { children, gap, class: className, ...props }: Props = $props();
</script>

<div style:--Group-gap={toSpacingPx(gap ?? 1)} class={[{ Group: true, ...props }, className]}>
	{@render children?.()}
</div>

<style lang="scss">
	@use './index.scss' as *;

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
