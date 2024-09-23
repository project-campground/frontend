import { useState } from 'react';
import { Center, Tooltip, Image, UnstyledButton, Stack, rem } from '@mantine/core';
import {
	IconHome2,
	IconLogout,
	IconSwitchHorizontal,
} from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import SidebarImage from './image';
import classes from './sidebar.module.scss';

interface NavbarLinkProps {
	img?: string;
	icon?: typeof IconHome2;
	label: string;
	active?: boolean;
	index: number;
	onClick?(): void;
}

interface NavbarLinks {
	servers:Array<any>;
}

function NavbarLink({ img, icon: Icon, label, active, index, onClick }: NavbarLinkProps) {
	return (<SidebarImage
		img={img}
		icon={Icon}
		label={label}
		active={active}
		onClick={onClick}
		index={index}
	/>);
}

export function Servers(props:NavbarLinks) {
	const [active, setActive] = useState(1);

	const links = props.servers.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			index={index}
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
