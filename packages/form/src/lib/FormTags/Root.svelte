<script lang="ts">
	import type FormTextFieldProps from './props.ts';
	import { getFormControl } from '$lib/FormControl/context.svelte.js';
	import { Chip, TextInput } from '@campground/ui';
	import Tag from './Tag.svelte';

	const { minlength = 0, maxlength, max }: FormTextFieldProps = $props();

	// Functionality
	const control = getFormControl<string[] | undefined>();

	function onKeyPress(
		ev: KeyboardEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement },
	) {
		if (ev.code !== 'Space' && ev.code !== 'Enter') return;
		ev.preventDefault();

		const value = ev.currentTarget.value.trim();

		if (value.length < minlength) return;

		ev.currentTarget.value = '';

		control.value = [...(control.value ?? []), value];
	}

	function removeItem(index: number) {
		control.value!.splice(index, 1);
	}

	let inputValue: string = $state('');
	const reachedMax = $derived(Boolean(max && (control.value?.length ?? 0) >= max));
</script>

<div class="container">
	{#each control.value as value, i (i)}
		<Tag
			{value}
			removeItem={removeItem.bind(null, i)}
		/>
	{/each}
	<Chip color="neutral">
		<TextInput
			bind:value={inputValue}
			size="xs"
			maxWidth={5}
			disabled={reachedMax}
			error={Boolean(minlength && inputValue.length && inputValue.length < minlength)}
			{maxlength}
			onkeypress={onKeyPress}
		/>
	</Chip>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		flex-wrap: wrap;
		gap: 0.5rem;

		position: relative;
	}
</style>
