<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { RootProps } from './props.ts';

	const { children, variant, class: className, size, ...attributes }: RootProps = $props();
</script>

<article
	class={['dialog', className]}
	data-size={size ?? 'auto'}
	data-variant={variant ?? 'default'}
	role="dialog"
	{...attributes}
	// Prevent outside click from being registered
	onclick={(ev) => ev.stopPropagation()}
	in:scale={{ duration: 200 }}
>
	{@render children?.()}
</article>

<style lang="scss">
	@use '../../common.scss' as *;

	.dialog {
		position: relative;
		display: flex;
		flex-direction: column;

		box-sizing: border-box;

		box-shadow: var(--shadow-md);
		border-radius: var(--radius-lg);
		box-sizing: border-box;

		&[data-variant='default'] {
			background-color: var(--background-subtle);
			border: solid 1px var(--neutral-border);
		}
		&[data-variant='dark'] {
			background-color: var(--background-body);
		}

		padding: var(--Dialog-paddingY) var(--Dialog-paddingX);
		gap: var(--Dialog-gap);

		--Dialog-paddingX: 1rem;
		--Dialog-paddingY: 1rem;
		--Dialog-gap: 1rem;

		list-style: none;
		margin: 0;
		overflow: visible;

		min-width: 15rem;

		&[data-size='auto'] {
			width: max-content;
			height: max-content;
		}
		&[data-size='max'] {
			width: calc(100% - 4rem);
			height: calc(100% - 4rem);
			@include tablet-only {
				width: calc(100% - 2rem);
				height: calc(100% - 2rem);
			}
			@include mobile-only {
				width: calc(100% - 1rem);
				height: calc(100% - 1rem);
			}
		}
		&[data-size='full'] {
			border: none;
			width: 100%;
			height: 100%;
		}
	}
</style>
