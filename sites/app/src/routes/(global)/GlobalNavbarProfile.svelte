<script lang="ts">
	import { defaultAvatar } from '$lib/api/api.config.js';
	import UserAvatar from '$lib/components/users/UserAvatar.svelte';
	import UserCardMenu from '$lib/components/users/UserCardMenu.svelte';
	import { getAccount } from '$lib/context/account.svelte';
	import { getMenuPortal, getOutsideClickBoundary, Menu, MenuPortalInstance } from '@campground/ui';

	let menuInstance: MenuPortalInstance | null = $state(null);

	const menuPortal = getMenuPortal();
	const clickAway = getOutsideClickBoundary();

	const account = getAccount();

	function toggleMenuInstance(ev: MouseEvent & { currentTarget: HTMLElement }) {
		$clickAway = ev;

		menuInstance = menuPortal.add(profileMenu, ev.currentTarget);
	}

	$effect(() => {
		if (menuInstance && !menuPortal.items.includes(menuInstance)) menuInstance = null;
	});
</script>

{#snippet profileMenu(instance: MenuPortalInstance)}
	<Menu.Root
		{instance}
		placement="bottom-end"
		offset={8}
		w={20}
	>
		<UserCardMenu
			user={{
				did: account.sessionInfo?.did ?? 'did:null',
				handle: account.sessionInfo?.handle ?? 'handle.invalid',
				avatar: account.profile?.avatar,
				banner: account.profile?.banner,
			}}
		/>
	</Menu.Root>
{/snippet}

<button
	class={['GlobalNavbarProfile', menuInstance && 'isOpen']}
	onclick={(ev) => (ev.stopPropagation(), toggleMenuInstance(ev))}
>
	<UserAvatar src={account.profile?.avatar ?? defaultAvatar} />
</button>

<style lang="scss">
	@use '@campground/ui' as *;

	.GlobalNavbarProfile {
		@include button-transform();

		display: flex;
		flex-direction: row;
		gap: 2ch;

		font-size: 1rem;
		font-family: var(--font-body);
		outline: none;

		background-color: transparent;
		border: none;
		padding: 0;
		border-radius: 0;
		cursor: pointer;
		position: relative;
	}
</style>
