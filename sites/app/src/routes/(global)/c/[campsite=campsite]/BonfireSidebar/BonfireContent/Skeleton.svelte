<script>
	import { Divider } from '@campground/ui';
	import { TentList } from '../index.ts';
	import Wrapper from './Wrapper.svelte';
</script>

<Wrapper>
	<TentList.Skeleton tentCount={1} />
	<Divider />
	<TentList.Skeleton tentCount={8} />
</Wrapper>
