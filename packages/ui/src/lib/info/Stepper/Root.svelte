<script lang="ts">
	import { writable } from 'svelte/store';
	import type { RootProps } from './props.ts';
	import { setStepperIndex } from './context.svelte.ts';

	let {
		class: className,
		size,
		active = $bindable(-1),
		orientation,
		children,
		...attributes
	}: RootProps = $props();

	const indexReadable = writable(active);

	$effect(() => {
		$indexReadable = active;
	});

	setStepperIndex(indexReadable);
</script>

<div
	data-size={size ?? 'md'}
	data-orientation={orientation ?? 'horizontal'}
	{...attributes}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use 'sass:list';

	$input-sizes: create-size-map((1.25rem, 1.5rem, 1.75rem, 2.25rem, 2.75rem));

	div {
		display: flex;
		flex-direction: row;
		align-items: center;

		gap: 0.5rem;

		&[data-orientation='vertical'] {
			flex-direction: column;
		}

		@each $size, $proportions in $input-sizes {
			&[data-size='#{$size}'] {
				--Stepper-iconSize: #{$proportions};
			}
		}
	}
</style>
