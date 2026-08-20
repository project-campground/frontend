<script lang="ts">
	import type AlertProps from './props.ts';

	const { children, icon, size, color, ...attributes }: AlertProps = $props();
</script>

<div
	// To not have to reassign every single time
	role="alert"
	aria-live={color === 'danger' ? 'assertive' : 'polite'}
	{...attributes}
	class={['container']}
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
	@use '../../common.scss' as *;
	@use '../../form/Button/Button.scss' as *;

	.container {
		position: relative;
		border-radius: var(--Button-radius);
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
		box-shadow: var(--template-inset-shadow-md) var(--Alert-glow);
		@extend %Button-sizing;

		@each $col in $color-types {
			&[data-color='#{$col}'] {
				--Alert-glow: var(--#{$col}-softBack);
				background-color: var(--#{$col}-softBack);
				color: var(--#{$col}-softFore);
			}
		}
	}
	.icon {
		line-height: 0;
	}
</style>
