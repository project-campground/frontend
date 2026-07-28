<script lang="ts">
	import DialogClose from './DialogClose.svelte';
	import DialogDivider from './DialogDivider.svelte';
	import type { HeaderProps } from './props.ts';

	const { children, left, right, ...attributes }: HeaderProps = $props();
</script>

<div
	class="container"
	{...attributes}
>
	<div class="content">
		<div class="row left">
			{@render left?.()}
		</div>
		<div class="row center">
			{@render children?.()}
		</div>
		<div class="row right">
			{@render right?.()}
			<DialogClose />
		</div>
	</div>
	<DialogDivider />
</div>

<style lang="scss">
	@use '../../index.scss' as *;

	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: var(--Dialog-gap);

		// For titles
		color: var(--foreground-subheading);
		font-weight: 700;
		font-size: 0.9em;
		font-family: var(--font-display);
		letter-spacing: 0.05em;
	}
	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.center {
		justify-content: center;
		flex: 1;
	}
</style>
