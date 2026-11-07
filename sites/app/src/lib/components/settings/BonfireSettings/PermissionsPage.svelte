<script lang="ts">
	import type { BonfireViewInList } from '#lib/types/campground/bonfires.js';
	import { PermissionSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';

	const { value } = getSettings<BonfireViewInList>();
</script>

<PermissionSettings bonfireId={value.id} />
