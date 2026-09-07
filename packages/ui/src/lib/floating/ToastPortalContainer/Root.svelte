<script lang="ts">
	import { getOutsideClickBoundary } from '$lib/contexts/outside.svelte.js';
	import { onMount } from 'svelte';
	import type ToastPortalProps from './props.ts';
	import { Toast } from '../index.ts';
	import { SvelteDate } from 'svelte/reactivity';

	const { portal, zIndex, ...attributes }: ToastPortalProps = $props();

	// Don't need to handle it every time for containers
	onMount(() => getOutsideClickBoundary().subscribe(() => handleOutsideClick));

	function handleOutsideClick() {
		portal.clear();
	}
	$effect(() => {
		portal.handleOutsideClick(handleOutsideClick);
	});

	function tick() {
		const time = Date.now();

		const remainingToasts = portal.items.filter((x) => x.disappearAt > time);

		if (remainingToasts.length === portal.items.length) return;

		portal.items = remainingToasts;
	}

	onMount(() => {
		const interval = setInterval(tick, 250);

		return () => clearInterval(interval);
	});
</script>

<div
	class={[portal.items.length ? 'hasItems' : 'noItems']}
	onclick={(ev) => ev.stopPropagation()}
	style:--Portal-zIndex={zIndex ?? 1500}
	{...attributes}
>
	{#each portal.items as item (item.key)}
		{const onClose = () => item.destroy()}
		<Toast.Root color={item.color} onClick={onClose} {onClose}>
			{item.message}
		</Toast.Root>
	{/each}
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	div {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;

		pointer-events: none;
		z-index: var(--Portal-zIndex);

		display: flex;
		align-items: end;
		flex-direction: column-reverse;
		justify-content: end;

		gap: 1rem;

		padding: 1rem;
		height: 100%;
		width: 100%;
		box-sizing: border-box;

		& > :global(*) {
			pointer-events: all;
		}
	}
</style>
