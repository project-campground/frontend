<script lang="ts">
	import { capitalize } from '../../util/component.ts';
	import type AlertProps from './props.ts';

	const { children, icon, size, variant, color, ...attributes }: AlertProps = $props();
</script>

<div
	// To not have to reassign every single time
	role="alert"
	aria-live={color === "danger" ? "assertive" : "polite"}
	{...attributes}
	class={[
		'Alert container',
		`size${capitalize(size ?? 'md')}`,
		`variant${capitalize(variant ?? 'glow')}`,
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
				&.variantGlow {
					background: linear-gradient(to bottom right, var(--palette-#{$col}-500), var(--palette-#{$col}-secondary));
					color: var(--palette-#{$col}-solidFore);
					box-shadow: 0 0 8px var(--palette-#{$col}-500);
				}
				&.variantSolid {
					background-color: var(--palette-#{$col}-solidBack);
					color: var(--palette-#{$col}-solidFore);
				}
				&.variantOutlined {
					color: var(--palette-#{$col}-outlinedFore);
					background-color: var(--palette-#{$col}-outlinedBack, transparent);
					border: solid 1px var(--palette-#{$col}-outlinedBorder, transparent);
				}
				&.variantPlain {
					background-color: transparent;
					color: var(--palette-#{$col}-plainFore);
				}
				&.variantSoft {
					background-color: var(--palette-#{$col}-softBack);
					color: var(--palette-#{$col}-softFore);
				}
			}
		}
	}
</style>
