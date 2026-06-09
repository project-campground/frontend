<script lang="ts">
	import Form from '$lib/Form/index.js';
	import FormErrorLabel from '$lib/FormErrorLabel/FormErrorLabel.svelte';
	import { FormField } from '$lib/FormField/index.js';
	import { FormLabel } from '$lib/FormLabel/index.js';
	import FormReactive from '$lib/FormReactive/FormReactive.svelte';
	import { FormTextField } from '$lib/FormTextField/index.js';
	import { LocaleFetcher, setLocaleContext, localeIds, type LocaleId } from '@campground/locale';
	import { Main, Section, theme } from '@campground/ui';
	import { writable } from 'svelte/store';

	let lightTheme: boolean = $state(false);

	const localeManager = new LocaleFetcher();
	const locale = writable(localeManager.createDefaultLocale());

	let localeValue = $state<LocaleId>('en-US');

	setLocaleContext(locale);

	$effect(() => theme.set(lightTheme ? 'light' : 'dark'));
	$effect(() => {
		localeManager.fetchLocale(localeValue).then((newLocale) => {
			locale.set(newLocale);
		});
	});
</script>

<Main>
	<div class="scrollable">
		<input type="checkbox" bind:checked={lightTheme} />
		<select bind:value={localeValue}>
			{#each localeIds as localeId}
				<option value={localeId}>
					{localeId}
				</option>
			{/each}
		</select>
		<div class="padded">
			<Section>
				{#snippet header()}
					Form empty
				{/snippet}
				<Form>
					<p>aaaa</p>
				</Form>
			</Section>
			<Section>
				{#snippet header()}
					Form with field label
				{/snippet}
				<Form>
					<FormField id="withLabel" required>
						<FormLabel>Example label</FormLabel>
					</FormField>
				</Form>
			</Section>
			<Section>
				{#snippet header()}
					Form with field text input
				{/snippet}
				<Form>
					<FormField id="withTextInput">
						<FormLabel>Example label</FormLabel>
						<FormTextField />
					</FormField>
				</Form>
			</Section>
			<Section>
				{#snippet header()}
					Text area form
				{/snippet}
				<Form>
					<FormField id="textArea0">
						<FormLabel>Text area field</FormLabel>
						<FormTextField multipleRows minLength={5} />
					</FormField>
					<FormField id="textArea1">
						<FormLabel>Text area field</FormLabel>
						<FormTextField multipleRows maxLength={50} />
					</FormField>
					<FormField id="textArea2">
						<FormLabel>Text area field</FormLabel>
						<FormTextField multipleRows maxRows={4} />
					</FormField>
					<FormField id="textArea3">
						<FormLabel>Text area field</FormLabel>
						<FormTextField multipleRows rows={8} />
					</FormField>
				</Form>
			</Section>
			<Section>
				{#snippet header()}
					Form Reactive
				{/snippet}
				<Form>
					<FormField id="textField">
						<FormLabel>Text field</FormLabel>
						<FormTextField />
					</FormField>
					<FormField id="textAreaAndStuff">
						<FormLabel>Text area field</FormLabel>
						<FormTextField multipleRows />
					</FormField>
					<FormField id="">
						<FormLabel>Text area field</FormLabel>
						<FormTextField format={{ regex: /^[A-Za-z]+$/, errorMessage: 'Example error' }} />
						<FormErrorLabel />
					</FormField>
					<FormReactive>
						{#snippet render(fields)}
							<pre><code>{JSON.stringify(fields, undefined, 4)}</code></pre>
						{/snippet}
					</FormReactive>
				</Form>
			</Section>
		</div>
	</div>
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
