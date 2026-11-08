<script lang="ts">
	import { droppable, type DroppableProps } from '@campground/ui';
	import Wrapper from './Wrapper.svelte';

	const props: DroppableProps = $props();
</script>

<Wrapper
	element="div"
	{@attach droppable(props)}
>
	<span></span>
</Wrapper>

<style lang="scss">
	span {
		height: 0.5rem;
	}
</style>
