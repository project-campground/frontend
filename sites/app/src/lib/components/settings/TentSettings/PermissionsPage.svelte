<script lang="ts">
	import type { TentViewBasic } from '#lib/types/campground/tent.js';
	import { PermissionSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';

	const { value } = getSettings<TentViewBasic>();
</script>

<PermissionSettings tentId={value.id} />
