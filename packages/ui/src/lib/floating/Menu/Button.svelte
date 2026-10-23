<script lang="ts">
	import { Button, type ButtonProps } from '#lib/form/index.js';

	const { children, class: className, variant, justify, color, ...props }: ButtonProps = $props();
</script>

<Button
	class={['menu', className]}
	justify={justify ?? 'start'}
	variant={variant ?? 'soft'}
	color={color ?? 'neutral'}
	fullWidth
	role="menuitem"
	{...props}
>
	{@render children()}
</Button>
