<script lang="ts">
	import type { TentView } from '#lib/types/campground/tent.js';
	import { PermissionSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';

	const { value } = getSettings<TentView>();
</script>

<PermissionSettings tentId={value.id} />
