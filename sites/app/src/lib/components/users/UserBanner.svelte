<script lang="ts">
	import { type ImageProps } from '@campground/ui';
	import ProfileBanner from '../pages/ProfileBanner.svelte';

	interface Props extends Omit<ImageProps, 'src' | 'id'> {
		did: string;
		src?: string | null | undefined;
	}

	const { did, ...props }: Props = $props();
</script>

<ProfileBanner
	{...props}
	id={did.split(':')[2]}
/>
