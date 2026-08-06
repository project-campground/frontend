<script
	lang="ts"
	module
>
	import { defineMessage } from '@formatjs/svelte-intl';

	const stepTitles = [
		defineMessage({
			id: 'app.gettingStarted.steps.welcome',
			defaultMessage: 'Welcome',
			description: 'Welcome step in the create profile stepper component',
		}),
		defineMessage({
			id: 'app.gettingStarted.steps.appearance',
			defaultMessage: 'Appearance',
			description: 'Appearance step in the create profile stepper component',
		}),
		defineMessage({
			id: 'app.gettingStarted.steps.profile',
			defaultMessage: 'Profile',
			description: 'Profile step in the create profile stepper component',
		}),
		defineMessage({
			id: 'app.gettingStarted.steps.profile',
			defaultMessage: 'Socials',
			description: 'Socials step in the create profile stepper component',
		}),
		defineMessage({
			id: 'app.gettingStarted.steps.final',
			defaultMessage: 'Done',
			description: 'Final step in the create profile stepper component',
		}),
	];
</script>

<script lang="ts">
	import { FormattedMessage, FormattedMessageGlobal } from '@campground/locale';

	import { Button, Paged, Para, Stepper, Group } from '@campground/ui';
	import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons-svelte';
	import GettingStartedPage0 from './GettingStarted/GettingStartedPage0.svelte';
	import GettingStartedPage1 from './GettingStarted/GettingStartedPage1.svelte';
	import GettingStartedPage2 from './GettingStarted/GettingStartedPage2.svelte';
	import GettingStartedPage3 from './GettingStarted/GettingStartedPage3.svelte';
	import GettingStartedPage4 from './GettingStarted/GettingStartedPage4.svelte';
	import { GettingStarted } from './GettingStarted/context.svelte.ts';

	let step: number = $state(0);
	let maxSteps: number = $state(5);

	const gettingStarted: GettingStarted = new GettingStarted();
</script>

<div class="container">
	<div class="content">
		<Paged.Root
			fullHeight
			index={step}
			count={maxSteps}
		>
			<Paged.Item>
				<GettingStartedPage0 />
			</Paged.Item>
			<Paged.Item>
				<GettingStartedPage1 />
			</Paged.Item>
			<Paged.Item>
				<GettingStartedPage2 {gettingStarted} />
			</Paged.Item>
			<Paged.Item>
				<GettingStartedPage3 />
			</Paged.Item>
			<Paged.Item>
				<GettingStartedPage4 {gettingStarted} />
			</Paged.Item>
		</Paged.Root>
	</div>
	<Group gap={4}>
		<Button
			disabled={step < 1}
			onclick={() => step--}
		>
			<IconArrowLeft />
			<FormattedMessageGlobal id="common.back" />
		</Button>
		<div class="stepper">
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
		</div>
		<Button
			disabled={step == maxSteps - 1}
			onclick={() => step++}
		>
			<FormattedMessageGlobal id="common.next" />
			<IconArrowRight />
		</Button>
	</Group>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: flex;
		flex-direction: column;
		padding: 6rem 10rem;
		height: 100%;

		@include desktop-sm-only {
			padding: 4rem 8rem;
		}
		@include tablet-only {
			padding: 1rem 2rem;
		}
		@include mobile-only {
			padding: 1rem 0rem;
		}
	}
	.content {
		flex: 1;
	}
	.stepper {
		flex: 1;
	}
</style>
