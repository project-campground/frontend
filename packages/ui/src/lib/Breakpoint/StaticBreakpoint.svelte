<script lang="ts">
	import { capitalize } from '$lib/util/component.js';
	import type BreakpointProps from './props.ts';

	const { value, children }: BreakpointProps = $props();

	const valueClassSplit = $derived(value.split('-'));
</script>

<breakpoint
	class={[
		'Breakpoint',
		valueClassSplit[0]! +
			valueClassSplit
				.slice(1)
				.map((x) => capitalize(x))
				.join('')
	]}
>
	{@render children()}
</breakpoint>

<style lang="scss">
	@use '../index.scss' as *;

	.Breakpoint {
        display: none;
        // Only
		&.mobileOnly {
			@include mobile-only() {
                display: contents;
			}
		}
        &.tabletOnly {
            @include tablet-only() {
                display: contents;
            }
        }
		&.desktopSmOnly {
			@include desktop-sm-only() {
                display: contents;
			}
		}
		&.desktopMdOnly {
			@include desktop-md-only() {
                display: contents;
			}
		}

        // Down
        &.tabletDown {
            @include tablet-down() {
                display: contents;
            }
        }
		&.desktopSmDown {
			@include desktop-sm-down() {
                display: contents;
			}
		}
		&.desktopMdDown {
			@include desktop-md-down() {
                display: contents;
			}
		}

        // Up
        &.tabletUp {
            @include tablet-up() {
                display: contents;
            }
        }
		&.desktopSmUp {
			@include desktop-sm-up() {
                display: contents;
			}
		}
		&.desktopMdUp {
			@include desktop-md-up() {
                display: contents;
			}
		}

		&.desktopLg {
			@include desktop-lg() {
                display: contents;
			}
		}
	}
</style>
