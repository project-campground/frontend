<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { UserDisplayProps } from './props.ts';

	const {
		displayName,
		avatar,
		handle,
		align,
		displayHandle,
		hideAvatar,
		size,
	}: Omit<UserDisplayProps, 'user'> & { avatar: Snippet; displayName: Snippet; handle?: Snippet } =
		$props();
</script>

<div
	class="container"
	data-align={align ?? 'center'}
	data-size={size ?? 'md'}
>
	{#if !hideAvatar}
		{@render avatar()}
	{/if}
	<span class="name">
		{@render displayName()}
	</span>
	{#if displayHandle}
		<span class="handle">
			{@render handle?.()}
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
