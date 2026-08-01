<script lang="ts">
	import { onMount } from 'svelte';
	import { getStepperIndex } from './context.svelte.ts';
	import type { StepProps } from './props.ts';

	let { class: className, color, icon, children, ...attributes }: StepProps = $props();
	let step: HTMLDivElement | null = $state(null);
	let isActive = $state(false);

	const stepperIndex = getStepperIndex();

	onMount(() =>
		stepperIndex.subscribe(
			(value) => (isActive = [...(step?.parentElement?.children ?? [])].indexOf(step!) <= value),
		),
	);
</script>

<div
	bind:this={step}
	class={['container', { active: isActive, inactive: !isActive }, className]}
	data-color={color ?? 'primary'}
	{...attributes}
>
	<div class="display">
		<div class="progress">
			<span class="progressActive"></span>
		</div>
		<div class="icon">
			<span class="iconContent">
				{@render icon()}
			</span>
		</div>
	</div>
	<div class="content">
		<div class="label">
			{@render children()}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../index.scss' as *;
	@use 'sass:list';

	.display {
		display: flex;
		align-items: center;
		gap: var(--Stepper-gap);
	}
	.content {
		position: relative;
	}
	.container {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		&:first-of-type .progress {
			display: none;
		}

		:global([data-orientation='vertical']) > & {
			flex-direction: row;
			.display {
				flex-direction: column;
			}
			& .progress {
				height: var(--Stepper-lineSize);
				width: 0.25rem;
				.progressActive {
					left: 0;
					right: 0;
					top: 0;
					height: 0.01%;
				}
			}
			&.active .progress .progressActive {
				height: 100%;
			}
			&:not(:first-of-type) .content {
				margin-top: var(--Stepper-lineSize);
			}
		}
		:global([data-orientation='horizontal']) > & {
			flex-direction: column;
			.display {
				flex-direction: row;
			}
			& .progress {
				height: 0.25rem;
				width: var(--Stepper-lineSize);
				.progressActive {
					top: 0;
					bottom: 0;
					left: 0;
					width: 0.01%;
				}
			}
			&.active .progress .progressActive {
				width: 100%;
			}
			// Completely different from vertical, since it needs to be aligned to the center for it to make sense
			// Vertical can be aligned to the side just by the icon
			.content {
				position: relative;
			}
			.label {
				position: absolute;
				// Alignment
				left: calc((var(--Stepper-lineSize) + var(--Stepper-gap)) / 2);
				transform: translateX(-50%);
				text-align: center;
				// Appearance
				color: var(--foreground-subtext);
				// Additional
				align-items: center;
			}
			&:first-of-type .label {
				left: 50%;
			}
		}

		/////// States ///////////
		&.active {
			.label {
				color: var(--foreground-subheading);
			}
			.progressActive {
				transition-delay: 0.01s;
			}
			.icon::before,
			.label {
				transition-delay: $transition-time-md;
			}
			.icon::before {
				opacity: 100%;
			}
		}
		/////// Variants & Colors ///////////
		@each $color in $color-types {
			&[data-color='#{$color}'] {
				.icon::before {
					background: linear-gradient(
						to bottom right,
						var(--#{$color}-glowFirst),
						var(--#{$color}-glowSecond)
					);
				}
				.icon {
					color: var(--#{$color}-glowFore);
				}
				.progressActive {
					background: linear-gradient(
						to bottom right,
						var(--#{$color}-glowFirst),
						var(--#{$color}-glowSecond)
					);
				}
			}
		}
	}
	// TODO: Separate into different components
	/////// Icons //////
	.icon {
		position: relative;

		border-radius: var(--Stepper-radius);
		corner-shape: squircle;
		width: var(--Stepper-iconSize);
		height: var(--Stepper-iconSize);

		overflow: hidden;
		line-height: 0;

		background-color: var(--neutral-regularBack);
		color: var(--neutral-regularFore);

		&::before {
			position: absolute;
			content: '';
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1;
		}
	}
	.icon::before {
		opacity: 0%;
	}
	.iconContent {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		z-index: 2;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
	}
	.icon::before,
	.label {
		transition-property: opacity, color;
		transition-duration: $transition-time-md;
		transition-delay: 0;
	}
	/////// Line progressing into the icon //////////////
	.progress {
		position: relative;
		background-color: var(--neutral-regularBack);
		border-radius: 0.25rem;
		overflow: hidden;

		// For animation
		.progressActive {
			position: absolute;
			transition-property: width, height;
			transition-duration: $transition-time-md;
			transition-delay: $transition-time-md;
		}
	}
	/////// Text below or to the side /////////////
	.label {
		display: flex;
		flex-direction: column;
	}
</style>
