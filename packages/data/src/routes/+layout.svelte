<script lang="ts">
	import { LocaleContext, setLocale, localeIds, type LocaleId } from '@campground/locale';
	import {
		Group,
		Main,
		Section,
		Select,
		Stack,
		Switch,
		TextBlock,
		theme,
		Portals,
	} from '@campground/ui';
	import type { Snippet } from 'svelte';

	let lightTheme: boolean = $state(false);

	const locale = new LocaleContext();

	let localeValue = $state<LocaleId>('en-US');

	setLocale(locale);

	$effect(() => theme.set(lightTheme ? 'light' : 'dark'));
	$effect(() => {
		locale.fetchLocale(localeValue).catch((err) => console.error('Error switching locale', err));
	});

	const { children }: { children: Snippet } = $props();
</script>

<Main>
	<Portals.Root>
		<div class="scrollable">
			<div class="padded">
				<Section>
					{#snippet header()}
						[DEVELOPMENT ENVIRONMENT]
					{/snippet}
					<Stack>
						<Group>
							<Switch bind:value={lightTheme} />
							<TextBlock>Light theme</TextBlock>
						</Group>
						<Group>
							<TextBlock>Locale</TextBlock>
							<Select.Button bind:value={localeValue}>
								{#snippet display(value)}
									{value}
								{/snippet}
								{#each localeIds as localeId (localeId)}
									<Select.Option value={localeId}>{localeId}</Select.Option>
								{/each}
							</Select.Button>
						</Group>
					</Stack>
				</Section>
				{@render children()}
			</div>
		</div>
	</Portals.Root>
</Main>

<style lang="scss">
	:global(#main) {
		height: 100%;
	}
	.scrollable {
		height: 100%;
		overflow-y: auto;
	}
	.padded {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 64px;
	}
</style>
