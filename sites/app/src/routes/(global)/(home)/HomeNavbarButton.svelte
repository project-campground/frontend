<script lang="ts">
	import { page } from '$app/state';
	import { Button, type ButtonProps, type LinkProps } from '@campground/ui';

	const {
		href,
		color,
		children,
	}: Pick<ButtonProps, 'color' | 'children'> & Pick<LinkProps, 'href'> = $props();

	const isActive = $derived(page.url.pathname === href);
</script>

<a {href}>
	<Button
		color={color ?? 'neutral'}
		variant={isActive ? 'selected' : 'plain'}
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
