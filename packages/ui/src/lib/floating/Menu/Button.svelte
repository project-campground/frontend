<script lang="ts">
	import { Button } from '$lib/form/index.js';
	import type { ButtonProps } from './props.ts';

	const { children, class: className, variant, justify, color, ...props }: ButtonProps = $props();
</script>

<Button
	class={['menu', className]}
	justify={justify ?? 'start'}
	variant={variant ?? 'plain'}
	color={color ?? 'neutral'}
	fullWidth
	{...props}
>
	{@render children()}
</Button>
