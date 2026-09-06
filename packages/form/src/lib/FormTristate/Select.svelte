<script lang="ts">
	import { Pick } from '@campground/ui';
	import { IconCheck, IconSlash, IconX } from '@tabler/icons-svelte';

	const pickContext = Pick.getPickContext();
</script>

<div style:--Pick-activeIndex={pickContext.activeItemIndex}>
	<Pick.List size="sm">
		<Pick.Item>
			<IconX size="1rem" />
		</Pick.Item>
		<Pick.Item>
			<IconSlash size="1rem" />
		</Pick.Item>
		<Pick.Item>
			<IconCheck size="1rem" />
		</Pick.Item>
	</Pick.List>
</div>

<style lang="scss">
	$type-colors: 'danger', 'warning', 'success';

	div {
		--Pick-count: 3;
		width: 6rem;
		:global {
			$i: 0;
			@each $type in $type-colors {
				[data-active-item='#{$i}'] {
					.highlight {
						background-color: var(--#{$type}-glowFirst);
					}
					.ui-Pick-Item.button[data-active='true'] {
						color: var(--#{$type}-glowFore);
					}
				}
				$i: calc($i + 1);
			}
		}
	}
</style>
