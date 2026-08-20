<script lang="ts">
	import { Button, type ButtonProps, Link, type LinkProps } from '@campground/ui';

	const {
		href,
		color,
		children,
	}: Pick<ButtonProps, 'color' | 'children'> & Pick<LinkProps, 'href'> = $props();
</script>

<a {href}>
	<Button
		color={color ?? 'neutral'}
		variant="plain"
		justify="start"
	>
		{@render children()}
	</Button>
</a>

<style lang="scss">
	a {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		text-decoration: none;
		color: var(--foreground-body);
	}
</style>
