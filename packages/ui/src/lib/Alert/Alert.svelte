<script lang="ts">
	import type AlertProps from './props.ts';

	const { children, icon, size, color, ...attributes }: AlertProps = $props();
</script>

<div
	// To not have to reassign every single time
	role="alert"
	aria-live={color === 'danger' ? 'assertive' : 'polite'}
	{...attributes}
	class={['Alert container']}
	data-size={size ?? 'md'}
	data-color={color ?? 'primary'}
>
	<div class="Alert icon">
		{@render icon()}
	</div>
	<div class="Alert content">
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use '../index.scss' as *;

	$padding: create-size-map((4px 6px, 8px 12px, 12px 16px, 16px 20px, 20px 32px));

	.Alert {
		&.container {
			position: relative;
			border-radius: var(--Alert-radius);
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 8px;
			box-shadow: var(--template-inset-shadow-md) var(--Alert-glow);
		}
		&.icon {
			line-height: 0;
		}
		@each $size, $values in $padding {
			&[data-size='#{$size}'] {
				padding: $values;
				--Alert-radius: var(--radius-#{$size});
				box-shadow: var(--template-inset-shadow-#{$size}) var(--Alert-glow);
			}
		}
		@each $col in $color-types {
			&[data-color='#{$col}'] {
				--Alert-glow: var(--#{$col}-softBack);
				background-color: var(--#{$col}-softBack);
				color: var(--#{$col}-softFore);
			}
		}
	}
</style>
