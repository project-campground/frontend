<script lang="ts">
	import type { ListProps } from './props.ts';

	const { children, invokerRect, placement, class: className, ...attributes }: ListProps = $props();
</script>

<menu
	class={['list', className]}
	{...attributes}
>
	<header class="touchPlace">
		<hr class="touchPlaceDivider" />
	</header>
	{@render children?.()}
</menu>

<style lang="scss">
	@use '../../index.scss' as *;

	.touchPlace {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
	}
	.touchPlaceDivider {
		width: 10%;
		border: none;
		height: 0.25rem;
		background-color: var(--foreground-background);
		border-radius: var(--radius-md);
	}
	@include desktop-sm-up {
		.list {
			border-radius: var(--radius-md);
		}
		.touchPlace {
			display: none;
		}
	}
	.list {
		box-sizing: border-box;

		background-color: var(--background-content);
		border: solid 1px var(--neutral-border);
		box-shadow: var(--shadow-md);
		border-top-left-radius: var(--radius-md);
		border-top-right-radius: var(--radius-md);

		padding: 0.5rem;
		list-style: none;
		margin: 0;
		overflow: auto;
	}
</style>
