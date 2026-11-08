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
	<div
		class="progress"
		aria-hidden="true"
	>
		<span class="progressActive"></span>
	</div>
	<div class="content">
		<div class="icon">
			<span class="iconContent">
				{@render icon()}
			</span>
		</div>
		<span class="label">
			{@render children()}
		</span>
	</div>
</div>

<style lang="scss">
	@use '../../visual/Avatar/Avatar.scss' as *;
	@use '../../common.scss' as *;
	@use 'sass:list';

	.content {
		position: relative;
		width: fit-content;
		height: fit-content;
	}
	.label {
		position: absolute;
	}
	.container {
		display: contents;
		/////// Variants & Colors ///////////
		@each $color in $color-types {
			&[data-color='#{$color}'] {
				.icon::before {
					background: linear-gradient(
						to bottom right,
						var(--#{$color}-glowFirst),
						var(--#{$color}-glowSecond)
					);
					box-shadow: var(--glow-md) var(--#{$color}-glowFirst);
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
					box-shadow: var(--glow-md) var(--#{$color}-glowFirst);
				}
			}
		}
		/////// States ///////////
		&:first-of-type .progress {
			display: none;
		}
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
		:global([data-orientation='vertical']) > & {
			& .progress {
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
			.label {
				left: calc(var(--Stepper-iconSize) + 1ch);
				top: 50%;
				transform: translateY(-50%);
			}
		}
		:global([data-orientation='horizontal']) > & {
			& .progress {
				height: 0.25rem;
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
			.label {
				top: calc(var(--Stepper-iconSize) + 0.5rem);
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
	// TODO: Separate into different components
	/////// Icons //////
	.icon {
		position: relative;

		width: var(--Stepper-iconSize);
		height: var(--Stepper-iconSize);

		@extend %Squircle;

		line-height: 0;

		background-color: var(--neutral-regularBack);
		color: var(--neutral-regularFore);

		&::before {
			position: absolute;
			@extend %Squircle;
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
		border-radius: var(--radius-md);
		flex: 1;

		// For animation
		.progressActive {
			position: absolute;
			border-radius: var(--radius-md);
			transition-property: width, height;
			transition-duration: $transition-time-md;
			transition-delay: $transition-time-md;
		}
	}
</style>
