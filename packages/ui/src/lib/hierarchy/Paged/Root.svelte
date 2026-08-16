<script lang="ts">
	import type { RootProps } from './props.ts';

	const {
		class: className,
		fullHeight,
		index,
		count,
		children,
		...attributes
	}: RootProps = $props();

	let list: HTMLDivElement | null = $state(null);

	$effect(() => list?.scrollTo(list?.clientWidth * index, 0));
</script>

<div
	class={[{ fullHeight }, className]}
	style:--Paged-count={count}
	style:--Paged-index={index}
	bind:this={list}
	{...attributes}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	div {
		display: grid;
		scrollbar-color: transparent transparent;
		scrollbar-width: none;
		overflow: hidden;

		transition: transform $transition-time-md;

		grid-template-columns: repeat(var(--Paged-count), 100%);

		width: 100%;
		scroll-snap-type: x mandatory;
		scroll-snap-stop: always;
		scroll-behavior: smooth;
	}
	.fullHeight {
		height: 100%;
	}
</style>
