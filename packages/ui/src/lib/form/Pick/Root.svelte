<script lang="ts">
	import { PickContext, setPickContext } from './context.svelte.ts';
	import type { RootProps } from './props.ts';

	const pickContext = new PickContext();

	setPickContext(pickContext);

	const { children, value = $bindable(), onChange }: RootProps = $props();

	$effect(() => {
		pickContext.activeItemIndex = value ?? 0;
	});
	$effect(() => {
		onChange?.(pickContext.activeItemIndex);
	});
</script>

<div
	style:--Pick-count={pickContext.itemCount}
	style:--Pick-activeIndex={pickContext.activeItemIndex}
>
	{@render children()}
</div>
