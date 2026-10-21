<script lang="ts">
	import { getFieldControl } from '#lib/FieldControl/context.svelte.js';
	import { notInherited } from '@campground/ui';
	import type FieldLabelProps from './props.ts';

	const fieldControl = getFieldControl();

	const { children, hideAsterisk, subtle, flex, ...props }: FieldLabelProps = $props();
</script>

<label
	class={['label', { required: fieldControl.required, hideAsterisk, subtle }]}
	{...props}
	style:--Layout-flex={notInherited(flex)}
	id={`label-${fieldControl.key}`}
	for={`control-${fieldControl.key}`}
>
	{@render children()}
	<span class="asterisk">*</span>
</label>

<style lang="scss">
	@use '@campground/ui' as *;

	.label {
		font-size: 0.9em;
		color: var(--foreground-subheading);
		font-weight: bold;
		@extend %InLayout;
	}
	.asterisk {
		color: var(--danger-plainFore);
	}
	.hideAsterisk,
	:not(.required) {
		& > .asterisk {
			display: none;
		}
	}
</style>
