<script lang="ts">
	import {
		IconCheckFilled,
		IconExclamationCircle,
		IconInfoCircle,
		IconXFilled,
	} from '@tabler/icons-svelte';
	import type { RootProps } from './props.ts';
	import { fly, scale } from 'svelte/transition';
	import { Button } from '$lib/form/index.js';
	import { Emblem } from '$lib/visual/index.ts';

	const { color, children, onClick, onClose, ...attrs }: RootProps = $props();
</script>

<div
	role="alert"
	aria-live="polite"
	class="container"
	data-color={color}
	{...attrs}
	in:fly|global={{ x: 300, duration: 500 }}
	out:scale|global={{ duration: 500 }}
>
	<Emblem {color}>
		{#if color === 'danger'}
			<IconXFilled size="1.5rem" />
		{:else if color === 'warning'}
			<IconExclamationCircle size="1.5rem" />
		{:else if color === 'info'}
			<IconInfoCircle size="1.5rem" />
		{:else if color === 'success'}
			<IconCheckFilled size="1.5rem" />
		{:else}
			<IconCheckFilled size="1.5rem" />
		{/if}
	</Emblem>
	<div class="content">
		{@render children()}
	</div>
	<div class="buttons">
		<Button
			size="sm"
			padding="equal"
			variant="plain"
			color="neutral"
			onclick={onClose}
		>
			<IconXFilled size="1rem" />
		</Button>
	</div>
	<button
		class="action"
		aria-label="toast action"
		onclick={onClick}
	>
	</button>
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../../visual/Avatar/Avatar.scss' as *;

	.container {
		position: relative;

		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0.5rem 1rem;
		outline: none;
		margin: 0;

		font-size: 1rem;
		font-family: var(--font-body);

		gap: 1.5ch;

		border: solid 1px var(--neutral-border);
		background-color: var(--background-content);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		color: var(--foreground-subheading);

		@each $color in $color-types {
			&[data-color='#{$color}'] {
				box-shadow: var(--glow-md) var(--#{$color}-inputGlow);
			}
		}
	}
	.content {
		flex: 1;
	}
	.action {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
		border-radius: var(--radius-md);

		padding: 0;
		border: none;
		margin: 0;
		outline: none;

		opacity: 0;
		background-color: var(--neutral-solidBackHover);
		transition: opacity $transition-time-md;
		cursor: pointer;

		&:hover {
			opacity: 25%;
		}
	}
	.buttons {
		z-index: 3;
	}
</style>
