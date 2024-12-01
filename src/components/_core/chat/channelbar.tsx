import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, Image, Text, rem, Drawer, Button } from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './chanbar.module.scss';
import { useDisclosure } from '@mantine/hooks';
import { ServerActions } from './serveractions';
import { GroupSection } from './groupsection';

interface ChanbarLinkProps {
	label: string;
	active?: boolean;
	onClick?(): void;
}

interface ChanbarLinks {
	guildname: string;
	guildbanner: string;
	channels: Array<any>;
}

function ChanbarLink({ label, active, onClick }: ChanbarLinkProps) {
	return (
		<UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined} style={{ width: '100%' }}>
			<Text style={{ display: 'block', width: '100%', height: rem(20), textAlign: 'left', padding: '0 10px' }}>
				{label}
			</Text>
		</UnstyledButton>
	);
}

export function Channels(props:ChanbarLinks) {
	const [active, setActive] = useState(2);
	const [opened, { open, close }] = useDisclosure(false);


	const links = props.channels.map((link, index) => (
		<ChanbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	));

	return (
		<nav className={classes.chanbar}>
			<ServerActions
				guildname={props.guildname}
				guildbanner={props.guildbanner}
			/>
			<div className={classes.separator} />
			<GroupSection
				guildname={props.guildname}
				setGroup={() => { return; }}
				groupImg={'/sample_servericon.png'}
				groupName={'Home Group'}
				groupDesc={'Generic group description'}
			/>
			<div className={classes.chanbarMain}>
				<Stack justify="center" gap={0}>
					{links}
				</Stack>
			</div>
		</nav>
	);
}
