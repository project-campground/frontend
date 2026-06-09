<script lang="ts">
	import { InputWrapper, Switch, Para } from '@campground/ui';
	import type FormSwitchProps from './props.ts';
	import { getFormControlContext } from '$lib/FormControl/context.js';

	const { header, children, ...props }: FormSwitchProps = $props();

	// Functionality
	const fieldContext = getFormControlContext();
	let value = $state(false);

	const required = fieldContext.required;

	// Updating
	$effect(() => {
		fieldContext.state.set({ error: null, value });
	});
</script>

<div class={['FormSwitch container']}>
	<header class={['FormSwitch header']}>
		{#if header}
			<Para class={['FormSwitch title']} weight={700}>
				{@render header()}
			</Para>
		{/if}
		<Switch bind:value {...props} />
	</header>
	<section>
		{@render children?.()}
	</section>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2ch;
	}
	.header > :global(.title) {
		display: flex;
		flex-direction: row;
		gap: 1ch;
		flex: 1;
	}
</style>
