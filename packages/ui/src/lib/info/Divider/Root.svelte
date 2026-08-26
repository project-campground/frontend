<script lang="ts">
	import type DividerProps from './props.ts';

	const { children, color, thickness, class: className, orientation }: DividerProps = $props();
</script>

<div
	class={['divider', className]}
	data-orientation={orientation ?? 'horizontal'}
	data-color={color ?? 'neutral'}
	data-thickness={thickness ?? 'sm'}
	role="separator"
>
	<div class="side">
		<div class="line"></div>
	</div>
	{#if children}
		<div class="content">{@render children()}</div>
		<div class="side">
			<div class="line"></div>
		</div>
	{/if}
</div>

<style lang="scss">
	@use '../../common.scss' as *;

	$thickness-map: create-size-map((0.0625rem, 0.125rem, 0.1875rem, 0.25rem, 0.375rem));

	.divider {
		display: flex;
		flex-direction: row;

		&[data-orientation='vertical'] {
			writing-mode: vertical-lr;
			.side {
				flex-direction: row;
			}
			.line {
				height: 100%;
				width: var(--Divider-thickness);
			}
		}
		@each $color in $status-color-types {
			&[data-color='#{$color}'] {
				.line {
					background-color: var(--#{$color}-background);
				}
				.content {
					color: var(--#{$color});
				}
			}
		}
		@each $size, $thickness in $thickness-map {
			&[data-thickness='#{$size}'] {
				--Divider-thickness: #{$thickness};
			}
		}
		&[data-color='neutral'] {
			.line {
				background-color: var(--neutral-border);
			}
			.content {
				color: var(--foreground-subtext);
			}
		}
		&[data-color='background'] .line {
			background-color: var(--background-body);
		}
	}
	.content {
		margin-inline: 0.5rem;
		font-size: 0.9em;
		color: var(--foreground-subtext);
	}
	.side {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	.line {
		height: var(--Divider-thickness);
		width: 100%;
	}
</style>
