<script lang="ts">
	import { Stack } from '../Stack/index.ts';
	import type GroupProps from './props.ts';

	const { children, class: className, wrap, align, direction, ...attributes }: GroupProps = $props();
</script>

<Stack
	class={['group', className]}
	wrap={wrap ?? 'wrap'}
	align={align ?? 'center'}
	direction={direction ?? 'row'}
>
	{@render children?.()}
</Stack>
