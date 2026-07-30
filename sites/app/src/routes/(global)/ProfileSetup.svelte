<script
	lang="ts"
	module
>
	import { defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		welcomeHeader: {
			id: 'app.createProfile.welcome.header',
			defaultMessage: 'Welcome to Campground!',
			description: 'Profile creation welcome header',
		},
		welcomeDescription: {
			id: 'app.createProfile.welcome.desc',
			defaultMessage:
				"Before we start, you need to create your profile for Campground. Don''t worry, this is a single time only process.",
			description: 'Profile creation welcome description',
		},
	});
</script>

<script lang="ts">
	import { FormattedMessage, FormattedMessageGlobal } from '@campground/locale';

	import {
		Button,
		FlexCenter,
		Paged,
		PagePlaceholder,
		PagePlaceholderIcon,
		Para,
		Stack,
	} from '@campground/ui';
	import { IconArrowRight } from '@tabler/icons-svelte';
</script>

<div class="container">
	<Paged.Root
		fullHeight
		index={0}
		count={8}
	>
		<Paged.Item>
			<FlexCenter>
				<PagePlaceholder icon={PagePlaceholderIcon.Welcome}>
					{#snippet title()}
						<FormattedMessage {...localeMessages.welcomeHeader} />
					{/snippet}
					<Stack
						align="center"
						gap={2}
					>
						<Para>
							<FormattedMessage {...localeMessages.welcomeDescription} />
						</Para>
						<Button>
							<FormattedMessageGlobal id="common.next" />
							<IconArrowRight />
						</Button>
					</Stack>
				</PagePlaceholder>
			</FlexCenter>
		</Paged.Item>
	</Paged.Root>
</div>

<style lang="scss">
	.container {
		padding: 8rem 12rem;
		height: 100%;
	}
</style>
