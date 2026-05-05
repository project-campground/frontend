<script lang="ts">
	import { capitalize } from '../../util/component.ts';
	import type AlertProps from './props.ts';

	const { children, icon, size, color, ...attributes }: AlertProps = $props();
</script>

<div
	// To not have to reassign every single time
	role="alert"
	aria-live={color === "danger" ? "assertive" : "polite"}
	{...attributes}
	class={[
		'Alert container',
		`size${capitalize(size ?? 'md')}`,
		`color${capitalize(color ?? 'primary')}`
	]}
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

	$button-padding: create-size-map((4px 6px, 8px 12px, 12px 16px, 16px 20px, 20px 32px));

	.Alert {
		&.container {
			position: relative;
			border-radius: var(--Alert-radius);
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 8px;
		}
		&.icon {
			line-height: 0;
		}
		@each $size, $values in $button-padding {
			&.size#{capitalize($size)} {
				padding: $values;
				--Alert-radius: var(--radius-#{$size});
			}
		}
		@each $col in $color-types {
			&.color#{capitalize($col)} {
				background-color: var(--palette-#{$col}-softBack);
				color: var(--palette-#{$col}-softFore);
			}
		}
	}
</style>
