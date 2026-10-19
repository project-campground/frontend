<script
	lang="ts"
	generics="T extends keyof HTMLElementTagNameMap"
>
	import type { HTMLAttributes } from 'svelte/elements';

	import type { WrapperProps } from './props.ts';

	const { element, class: className, children, ...attributes }: WrapperProps<T> = $props();
</script>

<svelte:element
	this={element}
	data-droppable-over="none"
	class={['container', className]}
	{...attributes as string extends T ? HTMLAttributes<any> : Record<string, unknown>}
>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	@use './style.scss' as *;

	.container {
		@extend %Mover;
	}
</style>
