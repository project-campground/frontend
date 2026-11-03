<script lang="ts">
	import type { TentCategoryView } from '#lib/types/campground/tent.js';
	import { PermissionSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';

	const { value } = getSettings<TentCategoryView>();
</script>

<PermissionSettings categoryId={value.id} />
