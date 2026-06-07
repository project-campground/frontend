<script lang="ts">
	// Not used in the module to not have it exist outside this library
	import { writable } from "svelte/store";
	import enUS from '../../../../lang/en-US_v2.json' with { type: 'json' };
	import { createIntl, createIntlCache } from '@formatjs/svelte-intl';
	import type { DefaultMessageSegment } from "$lib/FormattedMessage/props.js";
	
	const cache = createIntlCache();
	
	const intlEnUS = createIntl<DefaultMessageSegment>({
		defaultLocale: 'en-US',
		locale: 'en-US',
		messages: Object.fromEntries(
			Object.entries(enUS).map(([key, value]) => [key, (value as { message: string }).message])
		)
	}, cache);

	const localeStore = writable(intlEnUS);

	// Everything below is per-component
	import { globalLocale } from '$lib/declarations.js';
	import FormattedMessage from '$lib/FormattedMessage/index.js';
	import { setLocaleContext } from "$lib/context.js";

	const enUSKeys = Object.keys(enUS);
	setLocaleContext(localeStore);
</script>

<div class="scrollable">
	{#snippet example()}
		<span style:color="red">example</span>
	{/snippet}
	<div class="padded">
		<dl>
			{#each enUSKeys as locale (locale)}
				{@const inGlobalLocale = globalLocale[locale as keyof typeof globalLocale]}
				{@const finalLocale = inGlobalLocale ?? { id: locale, ...enUS[locale as keyof typeof enUS] }}
				<dt>
					<code>{locale}</code>
				</dt>
				<dd>
					<FormattedMessage
						{...finalLocale}
						values={{
							buttonText: example,
							count: 3,
						}}
					/>
				</dd>
			{/each}
		</dl>
	</div>
</div>

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
