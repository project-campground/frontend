<script lang="ts">
	import type ButtonGroupProps from './props.ts';

	const { children, direction, class: className, ...attributes }: ButtonGroupProps = $props();
</script>

<section
	role="group"
	data-direction={direction ?? 'horizontal'}
	data-button-group="true"
	{...attributes}
>
	{@render children()}
</section>

<style lang="scss">
	@use 'sass:list';
	@use '../../common.scss' as *;

	section {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		gap: 0.2rem;

		&[data-direction='vertical'] {
			flex-direction: column;
		}
	}
</style>
