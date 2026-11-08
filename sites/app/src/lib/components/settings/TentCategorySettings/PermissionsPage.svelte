<script lang="ts">
	import type { TentCategoryViewDetailed } from '#lib/types/campground/tent.js';
	import { PermissionSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';

	const { value } = getSettings<TentCategoryViewDetailed>();
</script>

<PermissionSettings categoryId={value.id} />
