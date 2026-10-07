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
	import { Para } from '@campground/ui';
	import Item from './Item.svelte';
	import { getFormArray } from './context.svelte.ts';
	import type { ListProps } from './props.ts';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { LocaleMessage } from '@campground/locale';

	let { children }: ListProps = $props();

	const formArray = getFormArray<T>();
</script>

{#if formArray.controls.length}
	<ul class="list">
		{#each formArray.controls as item (item.id)}
			<Item {item}>
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
