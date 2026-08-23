<script lang="ts" module>
	export const bannerGenericColors: GenericColor[] = ['red', 'yellow', 'green', 'blue', 'teal', 'purple', 'grey'];
</script>

<script lang="ts">
	import { Gradient, Image, type GenericColor, type ImageProps } from '@campground/ui';

	interface Props extends Omit<ImageProps, 'src'> {
		id: string;
		src?: string | null | undefined;
	}

	const { id, aspectRatio, mobileAspectRatio, src }: Props = $props();
</script>

{#if src}
	<Image
		src={src!}
		aspectRatio={aspectRatio ?? 3}
		mobileAspectRatio={mobileAspectRatio ?? 3}
		maxw="100%"
		minw="100%"
		radius="xl"
	/>
{:else}
	{const color = bannerGenericColors[id.charCodeAt(0) % bannerGenericColors.length]!}
	<Gradient
		{color}
		aspectRatio={aspectRatio ?? 3}
		mobileAspectRatio={mobileAspectRatio ?? 3}
		maxw="100%"
		minw="100%"
		radius="xl"
	/>
{/if}
