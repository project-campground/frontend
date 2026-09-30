<script lang="ts">
	import { Card, Dialog, Para, Stack } from '@campground/ui';
	import type { DialogProps } from './props.ts';

	const { header, children, sidebar }: DialogProps = $props();
</script>

<Dialog.Root
	variant="dark"
	size="max"
>
	<div class="container">
		<Card.Root
			level="subtle"
			size="lg"
		>
			<Card.Content
				gap="md"
				flex={1}
			>
				<Para level="h5">
					{@render header()}
				</Para>
				<Stack gap={0.5}>
					{@render sidebar()}
				</Stack>
			</Card.Content>
		</Card.Root>
		{@render children()}
	</div>
</Dialog.Root>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 15rem 15rem 15fr;
		grid-template-rows: 1fr;

		width: 100%;
		height: 100%;

		gap: 0.5rem;
		margin: -0.5rem;
	}
</style>
