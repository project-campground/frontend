<script lang="ts">
	import { getLocale } from '@campground/locale';
	import { Divider } from '@campground/ui';

	const locale = getLocale();
	const { date }: { date: Date } = $props();
</script>

<div>
	<Divider>
		{date.toLocaleDateString(locale.id)}
	</Divider>
</div>

<style lang="scss">
	div {
		padding-block: 1rem;
	}
</style>
