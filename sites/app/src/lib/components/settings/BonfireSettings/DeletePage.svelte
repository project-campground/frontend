<script lang="ts">
	import { getLocale } from '@campground/locale';
	import { DeleteSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { getAppview } from '#lib/context/api.js';
	import type { BonfireViewBasic } from '#lib/types/campground/bonfires.js';

	const locale = getLocale();
	const appview = getAppview();
	const { value } = getSettings<BonfireViewBasic>();

	async function doDelete() {
		return appview.bonfires.delete(value.campsiteId, value.id);
	}
</script>

<DeleteSettings
	name={value.name}
	accusative={locale.formatMessage(localeStrings.tents.accusative)}
	requiresConfirmation
	onDelete={doDelete}
/>
