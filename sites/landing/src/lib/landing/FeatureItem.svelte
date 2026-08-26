<script lang="ts">
	import {
		createIntersectionObservable,
		GradientText,
		Group,
		Para,
		type ComponentColor,
	} from '@campground/ui';
	import type { Snippet } from 'svelte';

	const {
		id,
		subtitle,
		title,
		color,
		children,
	}: { id: string; subtitle: Snippet; title: Snippet; children: Snippet; color: ComponentColor } =
		$props();
</script>

<section
	class="container"
	{...createIntersectionObservable(id)}
>
	<div
		class="background"
		aria-hidden="true"
	></div>
	<article class="content">
		<Para
			level="sub0"
			class="subtitle"
		>
			<Group align="center">
				{@render subtitle()}
			</Group>
		</Para>
		<Para
			level="h1"
			fontSize={3}
			class="title"
			mt="sm"
			mb="sm"
			letterSpacing={2}
		>
			<GradientText
				colors={[`var(--${color}-glowFirst)`, 'var(--primary-glowFirst)', 'var(--primary-glowSecond)']}
				motion="radial"
			>
				{@render title()}
			</GradientText>
		</Para>
		<Para
			class="description"
			fontSize={1.5}
			letterSpacing={0.5}
			lineHeight={2}
		>
			{@render children()}
		</Para>
	</article>
</section>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		position: relative;
		height: max(100vh, 512px);
		grid-column: span 1;
		z-index: 2;
		&:nth-of-type(odd) .background {
			background-color: var(--background-subtle);
		}
	}
	.content {
		padding-top: 128px;
	}
	.background {
		position: absolute;
		z-index: -1;
		top: 0;
		right: calc(-1 * (var(--Layout-paddingX) + 100%));
		left: calc(-1 * var(--Layout-paddingX));
		bottom: 0;
		opacity: 50%;
		mask: radial-gradient(50% 50% at center, white 95.5%, transparent 96%);
		mask-size: 400% 100%;
		mask-position: -150vw;
		mask-repeat: no-repeat;
		@include tablet-down {
			right: calc(-1 * var(--Layout-paddingX));
			left: calc(-1 * var(--Layout-paddingX));
		}
	}
</style>
