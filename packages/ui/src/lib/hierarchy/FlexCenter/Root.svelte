<script lang="ts">
	import { Stack } from '../Stack/index.ts';
	import type FlexCenterProps from './props.ts';

	const {
		children,
		class: className,
		direction,
		align,
		justify,
		...props
	}: FlexCenterProps = $props();
</script>

<Stack
	{...props}
	direction={direction ?? 'row'}
	align={align ?? 'center'}
	justify={justify ?? 'center'}
	class={['FlexCenter', className]}
>
	{@render children?.()}
</Stack>
