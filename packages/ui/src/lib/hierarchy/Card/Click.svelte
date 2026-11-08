<script lang="ts">
	import type { ClickProps } from './props.ts';

	const props: ClickProps = $props();
</script>

<a {...props}></a>

<style lang="scss">
	@use '../../common.scss' as *;

	a {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5;

		border-radius: var(--Card-radius);
		background-color: var(--neutral-solidBackHover);
		opacity: 0;
		transition: opacity $transition-time-md;
		cursor: pointer;

		&:hover {
			opacity: 25%;
		}
	}
</style>
