<script
	lang="ts"
	module
>
	import { defineMessage, defineMessages } from '@formatjs/svelte-intl';

	const localeMessages = defineMessages({
		welcomeHeader: {
			id: 'app.createProfile.welcome.header',
			defaultMessage: 'Welcome to Campground!',
			description: 'Getting started welcome header',
		},
		welcomeDescription: {
			id: 'app.createProfile.welcome.desc',
			defaultMessage:
				"Before we start, you need to create your profile for Campground. Don''t worry, this is a single time only process.",
			description: 'Getting started welcome description',
		},
		step: {
			id: 'app.createProfile.step',
			defaultMessage: 'Step {count, number}',
			description: 'Getting started nth step',
		},
	});
	const stepTitles = [
		defineMessage({
			id: 'app.createProfile.steps.welcome',
			defaultMessage: 'Welcome',
			description: 'Welcome step in the create profile stepper component',
		}),
		defineMessage({
			id: 'app.createProfile.steps.appearance',
			defaultMessage: 'Appearance',
			description: 'Appearance step in the create profile stepper component',
		}),
		defineMessage({
			id: 'app.createProfile.steps.profile',
			defaultMessage: 'Profile',
			description: 'Profile step in the create profile stepper component',
		}),
		defineMessage({
			id: 'app.createProfile.steps.profile',
			defaultMessage: 'Socials',
			description: 'Socials step in the create profile stepper component',
		}),
		defineMessage({
			id: 'app.createProfile.steps.final',
			defaultMessage: 'Done',
			description: 'Final step in the create profile stepper component',
		}),
	];
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
		Stepper,
	} from '@campground/ui';
	import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons-svelte';

	let step: number = $state(0);
	let maxSteps: number = $state(5);
</script>

<div class="container">
	<div class="content">
		<Paged.Root
			fullHeight
			index={step}
			count={maxSteps}
		>
			<Paged.Item>
				<FlexCenter>
					<PagePlaceholder icon={PagePlaceholderIcon.Welcome}>
						{#snippet title()}
							<FormattedMessage {...localeMessages.welcomeHeader} />
						{/snippet}
						<Para>
							<FormattedMessage {...localeMessages.welcomeDescription} />
						</Para>
					</PagePlaceholder>
				</FlexCenter>
			</Paged.Item>
		</Paged.Root>
	</div>
	<Stack
		align="center"
		gap={5}
	>
		<Stack
			direction="row"
			gap={2}
		>
			<Button
				disabled={step < 1}
				onclick={() => step--}
			>
				<IconArrowLeft />
				<FormattedMessageGlobal id="common.back" />
			</Button>
			<Button
				disabled={step == maxSteps - 1}
				onclick={() => step++}
			>
				<FormattedMessageGlobal id="common.next" />
				<IconArrowRight />
			</Button>
		</Stack>
		<Stepper.Root
			active={step}
			size="lg"
		>
			{#each stepTitles as stepTitle, i (i)}
				<Stepper.Step color="success">
					{#snippet icon()}
						<IconCheck />
					{/snippet}
					<Para
						level="sub0"
						lineHeight="1rem"
					>
						Step {i + 1}
					</Para>
					<Para
						level="h3"
						lineHeight="1rem"
						tMargin="sm"
					>
						<FormattedMessage {...stepTitle} />
					</Para>
				</Stepper.Step>
			{/each}
		</Stepper.Root>
	</Stack>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		padding: 10rem 16rem;
		height: 100%;
	}
	.content {
		flex: 1;
	}
</style>
