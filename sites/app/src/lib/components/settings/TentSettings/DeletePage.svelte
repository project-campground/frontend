<script lang="ts">
	import type { TentViewBasic } from '#lib/types/campground/tent.js';
	import { getLocale } from '@campground/locale';
	import { DeleteSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { getAppview } from '#lib/context/api.js';

	const locale = getLocale();
	const appview = getAppview();
	const { value } = getSettings<TentViewBasic>();

	async function doDelete() {
		return appview.tents.delete(value.id);
	}
</script>

<DeleteSettings
	name={value.name}
	accusative={locale.formatMessage(localeStrings.tents.accusative)}
	onDelete={doDelete}
/>
