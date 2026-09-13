<script lang="ts">
	import { Button, type ButtonProps } from '@campground/ui';

	const { active, children, ...props }: Omit<ButtonProps, 'variant'> & { active?: boolean } =
		$props();
</script>

<Button
	color="neutral"
	variant={active ? 'selected' : 'plain'}
	justify="start"
	{...props}
>
	{@render children()}
</Button>
