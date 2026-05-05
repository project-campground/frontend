<script lang="ts">
	import { capitalize } from '../../util/component.ts';
	import type GradientTextProps from './props.ts';

	const { children, colors, motion }: GradientTextProps = $props();
	const percentageOfColor = $derived(50 / (colors?.length ?? 1));
	const gradient: string[] | undefined | null = $derived(
		motion === 'linear'
			? colors?.concat(colors.slice(0, 1))
			: motion === 'wave'
				? colors
						?.concat(colors)
						.concat(colors.slice(0, 1))
						.map((x, i) => `${x} ${percentageOfColor * i}%`)
				: motion === 'radial'
					? colors?.concat(colors)
					: colors
	);
	const time: number = $derived((motion === 'radial' ? 10 : 2.5) * (colors?.length ?? 0));
</script>

<span
	style:--GradientText-gradient={gradient?.join(', ') || 'var(--palette-foreground-level1)'}
	style:--GradientText-time="{time}s"
	class={['GradientText', colors?.length && 'withColors', motion && `motion${capitalize(motion)}`]}
>
	{@render children()}
</span>

<style lang="scss">
	@keyframes motion-linear {
		0% {
			background-position-x: 0%;
		}
		100% {
			background-position-x: 100%;
		}
	}
	@keyframes motion-wave {
		0% {
			background-position-x: 0%;
		}
		100% {
			background-position-x: 100%;
		}
	}
	@keyframes motion-radial {
		0% {
			background-position-y: 0%;
			background-position-x: 0%;
		}
		12.5% {
			background-position-y: 50%;
		}
		37.5% {
			background-position-y: 110%;
		}
		37.501% {
			background-position-y: 0%;
		}
		50% {
			background-position-y: 50%;
			background-position-x: 100%;
		}
		62.5% {
			background-position-y: 110%;
		}
		62.501% {
			background-position-y: 0%;
		}
		75% {
			background-position-y: 50%;
		}
		100% {
			background-position-y: 110%;
			background-position-x: 0%;
		}
	}

	.GradientText {
		&.withColors {
			-webkit-text-fill-color: transparent;
			color: transparent;
			background-clip: text;
			width: max-content;
			--GradientText-background: linear-gradient(to right in oklch, var(--GradientText-gradient));
			// oklch just has the best colour interpolation for most colours and might be expected by users
			background: var(--GradientText-background) text;
			animation-duration: var(--GradientText-time);
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}
		&.motionLinear {
			animation: motion-linear;
			background-size: 8000%;
		}
		&.motionWave {
			animation-name: motion-wave;
			background-size: 200%;
		}
		&.motionRadial {
			animation-name: motion-radial;
			--GradientText-background: radial-gradient(circle at center in oklch, var(--GradientText-gradient));
			background-size: 200% 1000%;
		}
	}
</style>
