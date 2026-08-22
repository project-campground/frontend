<script lang="ts">
	import { Badge, getMenuPortal, Image, MenuPortalInstance, Modal, rem } from '@campground/ui';
	import type { FormImageFieldProps, FormImageFieldValue } from './props.ts';
	import { FormControlInstance, getFormControl } from '$lib/FormControl/context.svelte.js';
	import { IconPencilFilled } from '@tabler/icons-svelte';
	import FormImageDialog from './Dialog.svelte';

	const { children, width, height, aspectRatio, radius }: FormImageFieldProps = $props();

	// Functionality
	const control: FormControlInstance<FormImageFieldValue | undefined> = getFormControl();

	// Error messages and feedback
	const menuPortal = getMenuPortal();

	// When it's destroyed
	$effect(() => {
		if (instance && !menuPortal.includes(instance)) instance = null;
	});

	let instance: MenuPortalInstance | null = $state(null);

	function openMenu(ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (instance) return instance.destroy();

		instance = menuPortal.add(selectMenu, ev.currentTarget);
	}

	function onSubmit(values: FormImageFieldValue) {
		control.value = values;
	}
</script>

<!-- For known values; this is used in registration pages for PDS and possibly in the future for tags -->
{#snippet selectMenu(menu: MenuPortalInstance)}
	<Modal.Root instance={menu}>
		<FormImageDialog {onSubmit} />
	</Modal.Root>
{/snippet}

<button
	class="button"
	style:--FormImageField-width={rem(width)}
	style:--FormImageField-height={rem(height)}
	style:--FormImageField-aspectRatio={aspectRatio}
	data-radius={radius ?? 'lg'}
	disabled={control.disabled}
	onclick={openMenu}
>
	<Badge
		color="neutral"
		position="bottom-right"
		size="lg"
	>
		{#snippet badge()}
			<IconPencilFilled size="1rem" />
		{/snippet}
		<div class={['container']}>
			{#if control.value?.url || control.value?.blob}
				<Image
					src={control.value.url ?? control.value.blob!}
					fit="cover"
					w="100%"
					h="100%"
				/>
			{:else}
				<div class="placeholder">
					{@render children?.()}
				</div>
			{/if}
		</div>
	</Badge>
</button>

<style lang="scss">
	@use '@campground/ui' as *;

	.button {
		padding: 0.125rem;
		margin: 0;
		border: solid 2px transparent;
		outline: none;

		width: max-content;
		height: max-content;

		background-color: transparent;

		@include button-transform();

		&:not(:disabled) {
			cursor: pointer;
		}
		&:not(:disabled):hover {
			border-color: var(--primary-glowFirst);
		}
		@each $size in $size-names-with-none {
			&[data-radius='#{$size}'] {
				border-radius: calc(var(--radius-#{$size}) + 0.125rem);
			}
		}
		&[data-radius='avatar'] {
			border-radius: calc(35% + 0.125rem);
		}
		&[data-radius='avatar'] .container {
			border-radius: 35%;
		}
	}
	.container {
		overflow: hidden;
		width: var(--FormImageField-width);
		height: var(--FormImageField-height);
		aspect-ratio: var(--FormImageField-aspectRatio);

		transition: background $transition-time-md;

		@each $size in $size-names-with-none {
			.button[data-radius='#{$size}'] & {
				border-radius: var(--radius-#{$size});
			}
		}

		background-color: var(--neutral-solidBack);

		.button:hover & {
			background-color: var(--neutral-solidBackHover);
		}
	}
</style>
