<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const messages = defineMessages({
		noThreads: {
			id: 'app.threads.empty',
			defaultMessage: 'No threads yet',
			description: 'Empty state shown in the threads tab of the right sidebar',
		},
	});
</script>

<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Para } from '@campground/ui';
</script>

<Para level="sub0">
	<LocaleMessage {...messages.noThreads} />
</Para>
