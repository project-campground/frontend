<script
	lang="ts"
	module
>
	const messages = defineMessages({
		title: {
			id: 'app.tents.end',
			defaultMessage: 'You have reached tent!',
			description: 'The title of the final section when user is at the end of message list',
		},
		desc: {
			id: 'app.tents.end.desc',
			defaultMessage: 'This is the beginning of this tent. There are no more content in this tent.',
			description: 'The description of the final section when user is at the end of message list',
		},
	});
</script>

<script lang="ts">
	import { LocaleMessage } from '@campground/locale';

	import { Divider, PagePlaceholder, Stack } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
</script>

<div class="container">
	<div class="background">
		<span class="left">
			{PagePlaceholder.Icon.Welcome}
		</span>
		<span class="right">
			{PagePlaceholder.Icon.Appreciation}
		</span>
	</div>
	<Stack gap={2}>
		<PagePlaceholder.Root icon={PagePlaceholder.Icon.NoMore}>
			{#snippet title()}
				<LocaleMessage {...messages.title} />
			{/snippet}
			<LocaleMessage {...messages.desc} />
		</PagePlaceholder.Root>
		<Divider />
	</Stack>
</div>

<style lang="scss">
	.container {
		position: relative;
		padding-block-end: 2rem;
	}
	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;

		display: flex;
		flex-direction: row;
		font-family: sans-serif;
		justify-content: space-between;

		padding: 2rem 8rem;
		font-weight: 700;
		font-size: 2.5rem;
		color: var(--foreground-background);
		mask-image: linear-gradient(to bottom, white, transparent);
		.left {
			transform: rotate(-10deg);
		}
		.right {
			transform: rotate(10deg);
		}
	}
</style>
