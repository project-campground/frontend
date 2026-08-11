<script lang="ts">
	import type { LinkProps } from './props.ts';

	const { ...props }: LinkProps = $props();
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

		border-radius: var(--card-radius);
		background-color: var(--neutral-700);
		opacity: 0;
		transition: opacity $transition-time-md;
		cursor: pointer;

		&:hover {
			opacity: 12.5%;
		}
	}
</style>
