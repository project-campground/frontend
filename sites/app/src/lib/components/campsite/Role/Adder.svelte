<script lang="ts">
	import { Button, getMenuPortal, GradientText, Menu, MenuPortalInstance } from '@campground/ui';
	import type { AdderProps } from './props.ts';
	import { IconPlusFilled } from '@tabler/icons-svelte';
	import { v4 } from 'uuid';

	const menuPortal = getMenuPortal();
	const { roles, onAdd }: AdderProps = $props();

	$effect(() => {
		menuPortal.handleOutsideClick(() => console.log('Outside click'));
	});
	$effect(() => {
		console.log('Items', $state.snapshot(menuPortal.items));
	});
</script>

{#snippet menu(instance: MenuPortalInstance<MouseEvent>)}
	<Menu.Root {instance}>
		<Menu.List>
			{#each roles as role (role.id)}
				<Menu.Item>
					<Menu.Button
						color="neutral"
						onclick={() => onAdd(role.id)}
					>
						<GradientText colors={role.colors.map((x) => `#${x.toString(16).padStart(6, '0')}`)}>
							{role.name}
						</GradientText>
					</Menu.Button>
				</Menu.Item>
			{/each}
		</Menu.List>
	</Menu.Root>
{/snippet}

<Button
	variant="soft"
	color="neutral"
	padding="equal"
	size="sm"
	onclick={(ev) => (
		ev.stopPropagation(),
		ev.preventDefault(),
		console.log(
			'Click',
			menuPortal,
			$state.snapshot(menuPortal.items),
			menuPortal.add(menu, ev.currentTarget, v4(), ev),
		)
	)}
>
	<IconPlusFilled size="1rem" />
</Button>
