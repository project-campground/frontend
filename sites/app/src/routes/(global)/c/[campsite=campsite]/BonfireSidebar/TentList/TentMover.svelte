<script lang="ts">
	import { droppable, type DroppableProps } from '@campground/ui';

	const props: DroppableProps = $props();
</script>

<div
	class="container"
	data-droppable-over="none"
	{@attach droppable(props)}
></div>

<style lang="scss">
	@use '@campground/ui' as *;

	div {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: stretch;
		text-decoration: none;
		box-sizing: border-box;
		height: 0.5rem;

		&::before {
			position: absolute;
			content: '';

			height: 0.25rem;

			left: 0;
			right: 0;
			border-radius: var(--radius-md);
			background: transparent;

			top: 0;

			transition: background $transition-time-md;
		}

		&[data-droppable-over]:not([data-droppable-over='none'])::before {
			background: linear-gradient(to right, var(--primary-glowFirst), var(--primary-glowSecond));
		}
	}
</style>
