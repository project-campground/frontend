import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, Text, rem } from '@mantine/core';
import {
	IconHome2,
	IconLogout,
	IconSwitchHorizontal,
} from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './rightbar.module.scss';

interface RightbarLinkProps {
	icon: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick?(): void;
}

interface RightbarLinks {
	items:Array<any>;
}

function RightbarLink({ icon: Icon, label, active, onClick }: RightbarLinkProps) {
	return (
		<Tooltip label={label} position="left" transitionProps={{ duration: 0 }}>
			<UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined} style={{ width: '100%' }}>
				<Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
				<Text style={{ display: 'block', width: '100%', height: rem(20), textAlign: 'left', padding: '0 10px' }}>
					{label}
				</Text>
			</UnstyledButton>
		</Tooltip>
	);
}

export function Rightbar(props:RightbarLinks) {
	const [active, setActive] = useState(2);

	const links = props.items.map((link, index) => (
		<RightbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	));

	return (
		<nav className={classes.rightbar}>
			<div className={classes.rightbarMain}>
				<Stack justify="center" gap={0}>
					{links}
				</Stack>
			</div>
		</nav>
	);
}
