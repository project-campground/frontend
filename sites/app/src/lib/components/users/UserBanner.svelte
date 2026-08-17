<script lang="ts" module>
	export const gradientColors: GenericColor[] = ['red', 'yellow', 'green', 'blue', 'teal', 'purple', 'grey'];
</script>

<script lang="ts">
	import { Gradient, Image, type GenericColor, type ImageProps } from '@campground/ui';

	interface Props extends Omit<ImageProps, 'src'> {
		did: string;
		src?: string | null | undefined;
	}

	const { did, aspectRatio, mobileAspectRatio, src }: Props = $props();
</script>

{#if src}
	<Image
		src={src!}
		aspectRatio={aspectRatio ?? 3}
		mobileAspectRatio={mobileAspectRatio ?? 3}
		maxw="100%"
		minw="100%"
		radius="lg"
	/>
{:else}
	{const color = gradientColors[did.split(':')[2].charCodeAt(0) % gradientColors.length]!}
	<Gradient
		{color}
		aspectRatio={aspectRatio ?? 3}
		mobileAspectRatio={mobileAspectRatio ?? 3}
		maxw="100%"
		minw="100%"
		radius="lg"
	/>
{/if}
