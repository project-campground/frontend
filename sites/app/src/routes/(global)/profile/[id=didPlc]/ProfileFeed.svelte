<script
	lang="ts"
	module
>
	const messages = defineMessages({
		finalTitle: {
			id: 'app.profile.end.title',
			defaultMessage: 'No more posts',
			description: 'The title of the info at the bottom that there are no more posts',
		},
		finalDescription: {
			id: 'app.profile.end.desc',
			defaultMessage: 'There are no more posts by this user in this section.',
			description: 'The description of the info at the bottom that there are no more posts',
		},
	});
</script>

<script lang="ts">
	import { FormattedMessage } from '@campground/locale';

	import { PagePlaceholder, PagePlaceholderIcon, Stack } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<div class="padding">
	<Stack gap={1}>
		{@render children()}
		<PagePlaceholder icon={PagePlaceholderIcon.NoMore}>
			{#snippet title()}
				<FormattedMessage {...messages.finalTitle} />
			{/snippet}
			<FormattedMessage {...messages.finalDescription} />
		</PagePlaceholder>
	</Stack>
</div>

<style lang="scss">
	.padding {
		padding-top: 1rem;
		padding-bottom: 8rem;
	}
</style>
