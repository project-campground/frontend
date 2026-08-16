<script lang="ts">
	import type BadgeProps from './props.ts';

	const {
		color,
		children,
		position,
		badge,
		size,
		class: className,
		...attributes
	}: BadgeProps = $props();
</script>

<div
	class={['wrapper', className]}
	data-badge-size={size ?? 'md'}
	data-badge-position={position ?? 'bottom-right'}
	data-badge-color={color ?? 'offline'}
	{...attributes}
>
	{@render children()}
	<span class="badge">
		{@render badge?.()}
	</span>
</div>

<style lang="scss">
	@use 'sass:list';
	@use 'sass:math';
	@use '../../common.scss' as *;
	@use '../Avatar/Avatar.scss' as *;
	@use './Badge.scss' as *;
	@use '../Skeleton/Skeleton.scss' as *;

	$available-colors: mention, dnd, away, idle, online, offline, notification;

	.wrapper {
		position: relative;
		width: max-content;
		height: max-content;
	}
	.badge {
		position: absolute;
		min-width: 0.5rem;
		height: 1rem;
		padding: 0 0.25rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		box-sizing: border-box;

		font-size: 0.8em;
		font-weight: 700;

		border: solid 0.125rem var(--background-body);

		@extend %Squircle;
		@extend %Badge-position;

		@each $color in $available-colors {
			[data-badge-color='#{$color}'] > & {
				background: linear-gradient(to bottom right, var(--#{$color}), var(--#{$color}-alt));
				color: var(--primary-glowFore);
			}
		}
		[data-badge-color='neutral'] > & {
			background: var(--neutral-solidBack);
			color: var(--neutral-solidFore);
		}
		[data-badge-color='skeleton'] > & {
			@extend %Skeleton-pulse;
		}
		$i: 0;
		@each $size, $value in $avatar-size-map {
			$i: $i + 1;
			$div: calc(2 * sqrt(sqrt($i)));
			$size-value: calc($value / $div);
			$badge-size: calc(math.ceil($size-value * 10) / 10);
			[data-badge-size='#{$size}'] > & {
				min-width: $badge-size;
				height: $badge-size;
				padding: 0 calc($badge-size / 4);
				border-width: calc($badge-size / 8);
			}
		}
	}
</style>
