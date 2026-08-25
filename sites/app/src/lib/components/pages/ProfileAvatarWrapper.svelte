<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		children,
		backgroundLevel,
	}: { children: Snippet; backgroundLevel?: 'body' | 'subtle' | 'content' } = $props();
</script>

<div data-background-level={backgroundLevel ?? 'body'}>
	{@render children()}
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	$background-levels: 'body', 'subtle', 'content';

	div {
		padding: 0.25rem;
		@extend %Squircle;

		@each $level in $background-levels {
			&[data-background-level='#{$level}'] {
				background-color: var(--background-#{$level});
			}
		}
	}
</style>
