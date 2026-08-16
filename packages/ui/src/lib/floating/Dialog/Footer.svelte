<script lang="ts">
	import { Stack } from '$lib/index.js';
	import type { FooterProps } from './props.ts';

	const { children, direction, directionMobile, ...attributes }: FooterProps = $props();
</script>

<Stack
	direction={direction ?? 'row-reverse'}
	directionMobile={directionMobile ?? 'column'}
	{...attributes}
>
	{@render children?.()}
</Stack>
