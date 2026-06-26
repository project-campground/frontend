<script lang="ts">
	import { LocaleFetcher, setLocaleContext, localeIds, type LocaleId } from '@campground/locale';
	import { Main, Section, theme } from '@campground/ui';
	import { writable } from 'svelte/store';
	import {
		FormRadio,
		FormLabel,
		FormCheck,
		FormTextField,
		FormControl,
		Form,
		FormErrorLabel,
		FormInstance,
		FormSwitch,
	} from '$lib/index.js';

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

	let reactiveForm: Form | null = $state(null);
</script>

<Main>
	<div class="scrollable">
		<input
			type="checkbox"
			bind:checked={lightTheme}
		/>
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
					<FormControl
						id="withLabel"
						required
					>
						<FormLabel>Example label</FormLabel>
					</FormControl>
				</Form>
			</Section>
			<Section>
				{#snippet header()}
					Form with field text input
				{/snippet}
				<Form>
					<FormControl id="withTextInput">
						<FormLabel>Example label</FormLabel>
						<FormTextField />
					</FormControl>
				</Form>
			</Section>
			<Section>
				{#snippet header()}
					Text area form
				{/snippet}
				<Form>
					<FormControl id="textArea0">
						<FormLabel>Text area field</FormLabel>
						<FormTextField
							multipleRows
							minLength={5}
							placeholder="Example placeholder"
						/>
					</FormControl>
					<FormControl id="textArea1">
						<FormLabel>Text area field</FormLabel>
						<FormTextField
							multipleRows
							maxLength={50}
						/>
					</FormControl>
					<FormControl id="textArea2">
						<FormLabel>Text area field</FormLabel>
						<FormTextField
							multipleRows
							maxRows={4}
						/>
					</FormControl>
					<FormControl id="textArea3">
						<FormLabel>Text area field</FormLabel>
						<FormTextField
							multipleRows
							rows={8}
						/>
					</FormControl>
				</Form>
			</Section>
			<Section>
				{#snippet header()}
					Form Reactive
				{/snippet}
				<Form bind:this={reactiveForm}>
					<FormControl id="textField">
						<FormLabel>Text field</FormLabel>
						<FormTextField />
					</FormControl>
					<FormControl id="textAreaAndStuff">
						<FormLabel>Text area field</FormLabel>
						<FormTextField multipleRows />
					</FormControl>
					<FormControl id="formattedSingleLine">
						<FormLabel>Text field formatted</FormLabel>
						<FormTextField
							format={{ regex: /^[A-Za-z]+$/, errorMessage: 'Example error' }}
							placeholder="Aaa"
						/>
						<FormErrorLabel />
					</FormControl>
					<FormControl id="formattedMultiLine">
						<FormLabel>Text area formatted</FormLabel>
						<FormTextField
							multipleRows
							format={{ regex: /^[A-Za-z]+$/, errorMessage: 'Example error' }}
							placeholder="Aaa"
						/>
						<FormErrorLabel />
					</FormControl>
					<FormControl id="switch">
						<FormLabel>Switch</FormLabel>
						<FormSwitch>
							{#snippet header()}
								Example header
							{/snippet}
							Example description
						</FormSwitch>
						<FormErrorLabel />
					</FormControl>
					<FormControl id="checklist">
						<FormLabel>Checklist</FormLabel>
						<FormCheck.List>
							<FormCheck.Item value="first">
								{#snippet header()}
									First value
								{/snippet}
							</FormCheck.Item>
							<FormCheck.Card value="second">
								{#snippet header()}
									Second value
								{/snippet}
							</FormCheck.Card>
							<FormCheck.Item value={0}>
								{#snippet header()}
									0 value
								{/snippet}
								Description here
							</FormCheck.Item>
							<FormCheck.Item value={0}>
								{#snippet header()}
									Duplicate 0 value
								{/snippet}
							</FormCheck.Item>
						</FormCheck.List>
						<FormErrorLabel />
					</FormControl>
					<FormControl id="radiolist">
						<FormLabel>Radio List</FormLabel>
						<FormRadio.List>
							<FormRadio.Item value="first">
								{#snippet header()}
									First value
								{/snippet}
							</FormRadio.Item>
							<FormRadio.Card value="second">
								{#snippet header()}
									Second value
								{/snippet}
							</FormRadio.Card>
							<FormRadio.Item value={0}>
								{#snippet header()}
									0 value
								{/snippet}
								Description here
							</FormRadio.Item>
							<FormRadio.Item value={0}>
								{#snippet header()}
									Duplicate 0 value
								{/snippet}
							</FormRadio.Item>
						</FormRadio.List>
						<FormErrorLabel />
					</FormControl>
					<div>
						<pre><code
								>{JSON.stringify(
									Object.fromEntries(reactiveForm?.getForm().controls.map((x) => [x.id, x.value]) ?? []),
									undefined,
									4,
								)}</code
							></pre>
					</div>
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
