<script lang="ts">
	import type BadgeProps from './props.ts';

	const { color, children, position, badge, class: className, ...attributes }: BadgeProps = $props();
</script>

<div
	class={['wrapper', className]}
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
		2rem 0.75rem,
		2.5rem 1rem,
		3.5rem 1.25rem,
		5rem 1.75rem,
		7rem 2.75rem;
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
	}
</style>
