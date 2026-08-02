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
	@use '../../index.scss' as *;

	$sizes:
		1rem 0.5rem,
		1.25rem 0.75rem,
		1.5rem 1rem,
		2rem 1.5rem,
		3rem 2rem;
	$size-map: create-size-map($sizes);
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

		font-size: 0.8em;
		font-weight: 700;
		border-radius: var(--radius-md);
		border: solid 3px var(--background-body);
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
		@each $vertical in $position-vertical {
			@each $horizontal in $position-horizontal {
				[data-badge-position='#{$vertical}-#{$horizontal}'] > & {
					#{$horizontal}: -0.25rem;
					#{$vertical}: -0.25rem;
				}
			}
		}
		@each $size, $value in $size-map {
			$height: list.nth($value, 1);
			$width: list.nth($value, 2);
			[data-badge-size='#{$size}'] > & {
				min-width: $width;
				height: $height;
				padding: 0 calc($width / 2);
			}
		}
	}
</style>
