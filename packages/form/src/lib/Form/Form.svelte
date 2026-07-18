<script lang="ts">
	import type FormProps from './props.ts';
	import { FormInstance, setForm } from './context.svelte.ts';

	let {
		children,
		class: className,
		hideOverflow,
		gap,
		inlineContent,
		onSubmit,
		autocomplete,
		...attributes
	}: FormProps = $props();

	const form = new FormInstance(() => onSubmit);

	export function getForm() {
		return form;
	}

	// Basically main functionality of form: the context
	setForm(form);
</script>

<form
	autocomplete={autocomplete ?? 'off'}
	{...attributes}
	class={[{ hideOverflow, inlineContent }, className]}
	data-gap={gap}
>
	{@render children?.()}
</form>

<style lang="scss">
	@use '@campground/ui' as *;

	$gaps: create-size-map((0.5rem, 1rem, 1.5rem, 2rem, 3rem));

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		height: 100%;
		@each $size, $value in $gaps {
			&[data-gap='#{$size}'] {
				gap: $value;
			}
		}
	}
	.inlineContent {
		flex-direction: row;
		flex-wrap: wrap;
	}
	.hideOverflow {
		overflow: hidden;
	}
</style>
