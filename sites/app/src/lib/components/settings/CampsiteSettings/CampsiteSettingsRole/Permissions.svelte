<script lang="ts">
	import { Section, Stack } from '@campground/ui';
	import { getCampsiteContext } from '../../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { getRoleSettings } from './context.svelte.ts';
	import { FormObject } from '@campground/form';

	const campsiteContext = getCampsiteContext();
	const roleContext = getRoleSettings();
</script>

<Stack gap={2}>
	<FormObject id="permissions">
		<Section></Section>
	</FormObject>
</Stack>
