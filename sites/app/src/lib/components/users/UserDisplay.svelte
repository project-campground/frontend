<script
	lang="ts"
	module
>
	import type { ProfileViewBasic } from '$lib/types/campground/user.js';

	export interface Props extends Pick<StackProps, 'align'> {
		user: ProfileViewBasic;
		size?: ComponentSize;
		displayHandle?: boolean;
	}
</script>

<script lang="ts">
	import { type ComponentSize, type StackProps } from '@campground/ui';
	import UserAvatar from './UserAvatar.svelte';

	const { user, align, displayHandle, size }: Props = $props();
</script>

<div
	class="container"
	data-align={align ?? 'center'}
	data-size={size ?? 'md'}
>
	<UserAvatar
		src={user.avatar}
		{size}
	/>
	<span class="name">
		{user.displayName ?? user.handle}
	</span>
	{#if displayHandle}
		<span class="handle">
			@{user.handle}
		</span>
	{/if}
</div>

<style lang="scss">
	$aligns: start, center, end;

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1ch;
		@each $align in $aligns {
			&[data-align='#{$align}'] {
				align-items: $align;
			}
		}
	}
	.name {
		font-weight: 700;
		color: var(--foreground-heading);
	}
	.handle {
		color: var(--foreground-subtext);
	}
</style>
