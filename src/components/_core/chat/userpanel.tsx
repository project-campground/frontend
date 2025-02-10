import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, Image, Text, rem, Drawer, Button } from '@mantine/core';
import classes from './chanbar.module.scss';

interface UserPanelProps {
	smallname: string;
	avataricon: string;
	presence: string;
	presenceStatus: string;

	username: string;
	status: string;
	bgtop: string;
	bgbottom: string;
}

export function UserPanel(props:UserPanelProps) {
	const [opened, setOpen] = useState(false);
	// TODO: Control image radius via hover / opened
	return (
		<div className={classes.userPanelCore}>
			<div className={classes.userPanel}>
				<div className={classes.avatarIcon}>
					<Image radius={'15px'} src={props.avataricon} alt={props.smallname + ' avatar'} />
				</div>
				<div className={classes.middleSection}>
					<div className={classes.smallName}>
						<Text>{props.smallname}</Text>
					</div>
					<div className={classes.presenceStatus}>
						<Text>{props.presenceStatus}</Text>
					</div>
				</div>
				<div className={classes.rightSection}>...</div>
			</div>
		</div>
	);
}
