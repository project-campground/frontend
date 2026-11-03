<script lang="ts">
	import type { TentCategoryView } from '#lib/types/campground/tent.js';
	import { getLocale } from '@campground/locale';
	import { DeleteSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { getAppview } from '#lib/context/api.js';

	const locale = getLocale();
	const appview = getAppview();
	const { value } = getSettings<TentCategoryView>();

	async function doDelete() {
		return appview.categories.delete(value.id);
	}
</script>

<DeleteSettings
	name={value.name}
	accusative={locale.formatMessage(localeStrings.tentCategories.accusative)}
	onDelete={doDelete}
/>
