<script
	lang="ts"
	module
>
	const localeMessages = defineMessages({
		empty: {
			id: 'form.array.empty',
			defaultMessage: 'There are no entries.',
			description: 'Tells the user that array form field (e.g., in role colour lists) has no entries',
		},
	});
</script>

<script
	lang="ts"
	generics="T"
>
	import { getFormControl } from '$lib/FormControl/context.svelte.js';
	import { Para } from '@campground/ui';
	import Item from './Item.svelte';
	import { getFormArray } from './context.svelte.ts';
	import type { ListProps } from './props.ts';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { LocaleMessage } from '@campground/locale';

	let { children }: ListProps = $props();

	const formControl = getFormControl<T[]>();
	const formArray = getFormArray();
</script>

{#if formArray.itemIds.length}
	<ul class="list">
		{#each formArray.itemIds as id, i (id)}
			<Item
				{id}
				value={formControl.value[i]}
			>
				{@render children()}
			</Item>
		{/each}
	</ul>
{:else}
	<Para level="sub0">
		<LocaleMessage {...localeMessages.empty} />
	</Para>
{/if}

<style lang="scss">
	@use '@campground/ui' as *;

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: stretch;

		list-style-type: none;
		margin: 0;
		padding: 0;
	}
</style>
