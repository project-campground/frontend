<script lang="ts">
	import { getLocale } from '@campground/locale';
	import { DeleteSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { getAppview } from '#lib/context/api.js';
	import type { BonfireViewInList } from '#lib/types/campground/bonfires.js';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';

	const campsiteContext = getCampsiteContext();
	const locale = getLocale();
	const appview = getAppview();
	const { value } = getSettings<BonfireViewInList>();

	async function doDelete() {
		return appview.bonfires.delete(campsiteContext.campsite!.id, value.id);
	}
</script>

<DeleteSettings
	name={value.name}
	accusative={locale.formatMessage(localeStrings.tents.accusative)}
	requiresConfirmation
	onDelete={doDelete}
/>
