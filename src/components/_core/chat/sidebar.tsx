import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
	IconHome2,
	IconLogout,
	IconSwitchHorizontal,
} from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './sidebar.module.scss';

interface NavbarLinkProps {
	icon: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick?(): void;
}

interface NavbarLinks {
	servers:Array<any>;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
	return (
		<Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
			<UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
				<Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	);
}

export function Servers(props:NavbarLinks) {
	const [active, setActive] = useState(2);

	const links = props.servers.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	));

	return (
		<nav className={classes.navbar}>
			{/*
			<Center>
				<MantineLogo type="mark" inverted size={30} />
			</Center>
			*/}

			<div className={classes.navbarMain}>
				<Stack justify="center" gap={0}>
					{links}
				</Stack>
			</div>
			{/*
			<Stack justify="center" gap={0}>
				<NavbarLink icon={IconSwitchHorizontal} label="Change account" />
				<NavbarLink icon={IconLogout} label="Logout" />
			</Stack>
			*/}
		</nav>
	);
}
