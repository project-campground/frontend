<script lang="ts">
	// Everything below is per-component
	import { LocaleMessage } from '$lib/LocaleMessage/index.js';
	import { setLocale, LocaleContext } from '$lib/context.svelte.js';
	import { localeIds, type LocaleId } from '$lib/localeList.js';

	// Not used in the module to not have it exist outside this library
	const locale = new LocaleContext();

	let localeValue = $state<LocaleId>('en-US');

	let enUsLocale = $state(locale.createDefaultLocale());

	$effect(() => {
		locale.setLocale(localeValue).then((newLocale) => {
			if (localeValue === 'en-US') enUsLocale = newLocale;
		});
	});

	setLocale(locale);
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
			<h1>Locale messages</h1>
			<table>
				<thead>
					<tr>
						<th>
							Message code
						</th>
						<th>
							Message in {localeValue}
						</th>
						<th>
							Message in en-US
						</th>
					</tr>
				</thead>
				<tbody>
					{#each Object.keys(enUsLocale.messages) as message (message)}
						<tr>
							<td>
								<code>{message}</code>
							</td>
							<td>
	
								<LocaleMessage
								id={message}
								values={{ buttonText: example, count: 3 }}
							/>
							</td>
							<td>
								{const translatedToEnUs = enUsLocale.formatMessage({ id: message }, { buttonText: example, count: 3 })}
								{const segments = Array.isArray(translatedToEnUs) ? translatedToEnUs : [translatedToEnUs]}
								{#each segments as segment (segment)}
									{#if typeof segment === 'string'}
										{@html segment}
									{:else}
										{@render segment()}
									{/if}
								{/each}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
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
