<script
	lang="ts"
	module
>
	const localeMessages = defineMessages({
		unsaved: {
			id: 'app.settings.unsaved',
			defaultMessage: 'You have unsaved changes',
			description:
				'The card that pops up when changing settings telling user that they have unsaved settings.',
		},
	});
</script>

<script lang="ts">
	import { Button, Card, Dialog, Group, Para, Stack } from '@campground/ui';
	import type { DialogProps } from './props.ts';
	import { getSettings } from './context.svelte.ts';
	import { fly } from 'svelte/transition';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';

	const settings = getSettings();
	const { header, children, sidebar }: DialogProps = $props();
</script>

<Dialog.Root
	variant="dark"
	size="max"
>
	<div class="container">
		<Card.Root
			level="subtle"
			size="lg"
		>
			<Card.Content
				gap="md"
				flex={1}
			>
				<Para level="h5">
					{@render header()}
				</Para>
				<Stack
					gap={0.5}
					flex={1}
				>
					{@render sidebar()}
				</Stack>
				{#if settings.hasChanged}
					<div
						class="saveCard"
						transition:fly={{ duration: 500, y: 300 }}
					>
						<Card.Root
							size="md"
							gap={1}
						>
							<Para level="paragraph">
								<LocaleMessage {...localeMessages.unsaved} />
							</Para>
							<Group
								gap={1}
								justify="end"
							>
								<Button
									color="neutral"
									variant="plain"
									onclick={settings.reset}
								>
									<LocaleMessage {...localeStrings.common.cancel} />
								</Button>
								<Button
									color="success"
									onclick={settings.save}
								>
									<LocaleMessage {...localeStrings.common.save} />
								</Button>
							</Group>
						</Card.Root>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
		{@render children()}
	</div>
</Dialog.Root>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 18rem 18rem 15fr;
		grid-template-rows: 1fr;

		width: 100%;
		height: 100%;

		gap: 0.5rem;
		margin: -0.5rem;
	}
</style>
