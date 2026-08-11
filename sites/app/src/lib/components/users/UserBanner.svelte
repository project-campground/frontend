<script lang="ts">
	import { Image, type ImageProps } from '@campground/ui';

	interface Props extends Omit<ImageProps, 'src'> {
		src?: string | null | undefined;
	}

	const { aspectRatio, mobileAspectRatio, src }: Props = $props();
</script>

<Image
	src={src ?? '/DefaultAvatar0.png'}
	aspectRatio={aspectRatio ?? 3}
	mobileAspectRatio={mobileAspectRatio ?? 3}
	maxw="100%"
	minw="100%"
	radius="lg"
/>

<style lang="scss">
</style>
