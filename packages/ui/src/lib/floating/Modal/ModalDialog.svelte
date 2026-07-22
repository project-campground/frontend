<script lang="ts">
	import type { DialogProps } from './props.ts';

	const { children, class: className, size, ...attributes }: DialogProps = $props();
</script>

<article
	class={['dialog', className]}
	data-size={size ?? 'auto'}
	{...attributes}
>
	{@render children?.()}
</article>

<style lang="scss">
	@use '../../index.scss' as *;

	.dialog {
		position: relative;

		box-sizing: border-box;

		background-color: var(--background-content);
		border: solid 1px var(--neutral-border);
		box-shadow: var(--shadow-md);
		border-radius: var(--radius-lg);
		box-sizing: border-box;

		padding: 1rem;
		list-style: none;
		margin: 0;
		overflow: auto;

		&[data-size='auto'] {
			width: max-content;
			height: max-content;
		}
		&[data-size='max'] {
			width: calc(100% - 8rem);
			height: calc(100% - 8rem);
		}
		&[data-size='full'] {
			border-radius: 0;
			border: none;
			width: 100%;
			height: 100%;
		}
	}
</style>
