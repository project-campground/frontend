<script lang="ts">
	import { Group, Stack } from '$lib/info/index.js';
	import DialogDivider from './DialogDivider.svelte';
	import type { FooterProps } from './props.ts';

	const { children, direction, directionMobile, ...attributes }: FooterProps = $props();
</script>

<div class="container">
	<DialogDivider />
	<Stack
		direction={direction ?? 'row-reverse'}
		directionMobile={directionMobile ?? 'column'}
		{...attributes}
	>
		{@render children?.()}
	</Stack>
</div>

<style lang="scss">
	@use '../../index.scss' as *;

	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: var(--Dialog-gap);
	}
</style>
