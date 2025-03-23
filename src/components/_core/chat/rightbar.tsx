import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, Text, rem } from '@mantine/core';
import {
	IconHome2,
	IconLogout,
	IconSwitchHorizontal,
} from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import SidebarImage from './image';
import classes from './rightbar.module.scss';

interface RightbarLinkProps {
	img?: string;
	icon?: typeof IconHome2;
	label: string;
	active?: boolean;
	index: number;
	onClick?(): void;
}

interface RightbarGroupProps {
	label: string;
	links:Array<any>;
}

interface RightbarLinks {
	users:Array<any>;
	groups:Array<any>;
}

function RightbarLink({ img, icon: Icon, label, active, index, onClick }: RightbarLinkProps) {
	return (
		<Tooltip label={label} position="left" transitionProps={{ duration: 0 }}>
			<UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined} style={{ width: '100%' }}>
				<SidebarImage
					img={img}
					icon={Icon}
					label={label}
					active={active}
					onClick={onClick}
					index={index}
					pxsz={40}
				/>
				<Text style={{ display: 'block', width: '100%', height: rem(20), textAlign: 'left', padding: '0 10px' }} lineClamp={1}>
					{label}
				</Text>
			</UnstyledButton>
		</Tooltip>
	);
}

function RightbarGroup({label, links}: RightbarGroupProps) {
	return (<Stack justify="center" gap={0}>
		<Text style={{ display: 'block', width: '100%', height: rem(20), textAlign: 'left', padding: '0 10px' }}>
			{label}
		</Text>
		{links}
	</Stack>);
}

export function Rightbar(props:RightbarLinks) {
	const [active, setActive] = useState(2);

	// Clone user props into remaining users array
	let remUsers = structuredClone(props.users);

	// Build groups by priority first
	const groups:Array<any> = [];
	props.groups.forEach((group) => {
		// First check how many "remaining" users contain this group ID
		let usersToSplice:Array<number> = [];
		const isMyGroup:Array<any> = [];
		remUsers.forEach((link, index) => {
			if(link.roles.includes(group.id)) {
				// If they're in this group, remove them from the remaining users and generate a user button
				usersToSplice.push(index);
				isMyGroup.push(<RightbarLink
					{...link}
					key={link.label}
					active={link.id === active}
					index={link.id}
					onClick={() => setActive(link.id)}
				/>);
			}
		});
		if(isMyGroup.length > 0) {
			for(let spl = usersToSplice.length - 1; spl >= 0; spl--) {
				remUsers.splice(usersToSplice[spl], 1);
			}
	
			// Build the group on this data
			groups.push(<RightbarGroup
				key={group.label}
				label={group.label}
				links={isMyGroup}
			/>);
		}
	});

	return (
		<nav className={classes.rightbar}>
			<div className={classes.rightbarMain}>
				{groups}
			</div>
		</nav>
	);
}
