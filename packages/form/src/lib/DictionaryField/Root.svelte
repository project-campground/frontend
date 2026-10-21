<script
	lang="ts"
	generics="T = DictionaryFieldValue"
>
	import type RootProps from './props.ts';
	import { getForm, setForm } from '#lib/Form/context.svelte.js';
	import { onMount } from 'svelte';
	import { DictionaryFieldContext } from './context.svelte.ts';
	import type { DictionaryFieldValue } from './props.ts';

	let {
		children,
		class: className,
		hideOverflow,
		gap,
		inlineContent,
		autocomplete,
		id,
		map,
		// eslint-disable-next-line no-useless-assignment
		value = $bindable(),
		...attributes
	}: RootProps<T> = $props();

	const formContext = getForm();
	const key = $props.id();

	// Sub-form
	const dictionaryField = new DictionaryFieldContext<T>(
		key,
		formContext.submit.bind(formContext),
		() => id,
		() => map ?? ((fields) => Object.fromEntries(fields.map((x) => [x.id, x.value])) as unknown as T),
	);
	setForm(dictionaryField);

	// Make sure form is aware of this object, since there is no control to do that
	onMount(() => formContext.addFieldToForm(dictionaryField));

	// One-way binding for more reactive form
	$effect(() => {
		value = dictionaryField.value;
	});
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
