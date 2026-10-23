<script lang="ts">
	import { ButtonGroup, type ButtonGroupProps } from '#lib/form/index.js';

	const { children, direction, ...attributes }: ButtonGroupProps = $props();
</script>

<ButtonGroup
	direction={direction ?? 'vertical'}
	{...attributes}
>
	{@render children?.()}
</ButtonGroup>
