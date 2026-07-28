<script lang="ts">
	import { Modal, setModal } from './context.svelte.ts';
	import type { RootProps } from './props.ts';

	const {
		children,
		class: className,
		instance,
		// Rest
		...attributes
	}: RootProps = $props();

	setModal(new Modal(() => instance));
</script>

<div
	class={['wrapper', className]}
	{...attributes}
	onclick={(ev) => (ev.stopPropagation(), instance.destroy())}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../index.scss' as *;

	.wrapper {
		position: absolute;

		display: flex;
		flex-direction: column;

		align-items: center;
		justify-content: center;

		overscroll-behavior-y: none;
		width: 100%;
		height: 100%;

		overflow: hidden;

		transition: background $transition-time-md;
		background-color: var(--background-overlay);
	}
</style>
