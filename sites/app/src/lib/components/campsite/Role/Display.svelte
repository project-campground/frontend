<script lang="ts">
	import { Button } from '@campground/ui';
	import type { DisplayProps } from './props.ts';
	import { IconXFilled } from '@tabler/icons-svelte';

	const { role, onRemove }: DisplayProps = $props();

	const colorHex = $derived(
		role.colors.map((x) => `#${x.toString(16).padStart(6, '0')}`).join(', '),
	);
</script>

<span
	class="root"
	data-color-count={role.colors.length ?? 0}
	data-colors={colorHex}
	style:--Role-colors={colorHex}
>
	<span class="content">
		<span class="dot"></span>
		<span class="name">
			{role.name}
		</span>
	</span>
	{#if onRemove}
		<Button
			size="sm"
			padding="equal"
			variant="soft"
			color="neutral"
			onclick={onRemove}
		>
			<IconXFilled size="0.75rem" />
		</Button>
	{/if}
</span>

<style lang="scss">
	@use '@campground/ui' as *;

	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;
		user-select: none;
	}
	.root {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;

		position: relative;
		overflow: hidden;
		border-radius: var(--radius-md);
		padding: 0.25rem 0.5rem;
		box-sizing: border-box;

		cursor: pointer;

		&[data-color-count='0'] {
			border: dashed thin var(--neutral-softFore);
			.dot {
				background-color: var(--neutral-softFore);
			}
		}
		&:not([data-color-count='0']) {
			.content::before {
				z-index: 1;
				content: '';
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;

				background: linear-gradient(to right in oklch, var(--Role-colors));

				opacity: 20%;

				position: absolute;
			}
		}
	}
	.name {
		z-index: 2;
		font-size: 0.9em;
		color: var(--foreground-subheading);
	}
	.dot {
		z-index: 2;
		width: 1rem;
		height: 1rem;
		background: linear-gradient(to right in oklch, var(--Role-colors));
		@extend %Squircle;
	}
</style>
