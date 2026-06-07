<script lang="ts">
	// Not used in the module to not have it exist outside this library
	import { writable } from 'svelte/store';
	import LocaleFetcher from '$lib/fetcher.js';

	const localeFetcher = new LocaleFetcher();

	const localeStore = writable(localeFetcher.createDefaultLocale());

	// Everything below is per-component
	import { globalLocale } from '$lib/declarations.js';
	import FormattedMessage from '$lib/FormattedMessage/index.js';
	import { setLocaleContext } from '$lib/context.js';
	import { localeIds, type LocaleId } from '$lib/localeList.js';

	let localeValue = $state<LocaleId>('en-US');

	let enUsLocale = $state(localeFetcher.createDefaultLocale());

	$effect(() => {
		localeFetcher.fetchLocale(localeValue).then(
			localeValue === 'en-US'
				? (value) => {
						localeStore.set((enUsLocale = value));
					}
				: (value) => {
						localeStore.set(value);
					}
		);
	});

	setLocaleContext(localeStore);
</script>

<article>
	<select bind:value={localeValue}>
		{#each localeIds as localeId}
			<option value={localeId}>
				{localeId}
			</option>
		{/each}
	</select>
	<div class="scrollable">
		{#snippet example()}
			<span style:color="red">example</span>
		{/snippet}
		<div class="padded">
			<h1>Global messages (multiple uses)</h1>
			<dl>
				{#each Object.values(globalLocale) as message (message.id)}
					<dt>
						<code>{message.id}</code>
					</dt>
					<dd>
						<FormattedMessage
							{...message}
							values={{
								buttonText: example,
								count: 3
							}}
						/>
					</dd>
				{/each}
			</dl>
			<h1>Locale messages</h1>
			<dl>
				{#each Object.keys(enUsLocale.messages) as message (message)}
					<dt>
						<code>{message}</code>
					</dt>
					<dd>
						<FormattedMessage
							id={message}
							values={{
								buttonText: example,
								count: 3
							}}
						/>
					</dd>
				{/each}
			</dl>
		</div>
	</div>
</article>

<style>
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
