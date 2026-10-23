<script lang="ts">
	import { getFieldControl } from '#lib/FieldControl/context.svelte.js';
	import { notInherited } from '@campground/ui';
	import type FieldLabelProps from './props.ts';

	const fieldControl = getFieldControl();

	const { children, hideAsterisk, subtle, flex, ...props }: FieldLabelProps = $props();
</script>

<legend
	class={['label', { required: fieldControl.required, hideAsterisk, subtle }]}
	{...props}
	style:--Layout-flex={notInherited(flex)}
>
	{@render children()}
	<span class="asterisk">*</span>
</legend>

<style lang="scss">
	@use '@campground/ui' as *;

	.label {
		font-size: 0.9em;
		color: var(--foreground-subheading);
		font-weight: bold;
		margin-bottom: 0.5rem;

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
