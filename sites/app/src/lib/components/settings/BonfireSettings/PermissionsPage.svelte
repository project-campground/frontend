<script lang="ts">
	import type { BonfireViewBasic } from '#lib/types/campground/bonfires.js';
	import { PermissionSettings } from '../CommonSettings/index.ts';
	import { getSettings } from '../Settings/context.svelte.ts';

	const { value } = getSettings<BonfireViewBasic>();
</script>

<PermissionSettings bonfireId={value.id} />
