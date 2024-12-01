import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, Image, Text, rem, Drawer, Button } from '@mantine/core';
import classes from './chanbar.module.scss';

interface GroupSectionProps {
	guildname: string;
	setGroup: any;
	groupImg: string;
	groupName: string;
	groupDesc: string;
}

export function GroupSection(props:GroupSectionProps) {
	const [opened, setOpen] = useState(false);

	return (
		<div>
			<div className={classes.groupMain}>
				<div className={classes.groupIcon}>
					<Image radius={'18px'} src={'/sample_servericon.png'} alt={props.guildname} />
				</div>
				<div className={classes.groupLeft}>
					<div className={classes.groupName}>
						<Text>{props.groupName}</Text>
					</div>
					<div className={classes.groupDesc}>
						<Text>{props.groupDesc}</Text>
					</div>
				</div>
				<div className={classes.groupRight}>...</div>
			</div>
			<div className={classes.groupSub}>
				<div className={classes.groupSubSection}>
					<Image src={'/group_overview_icon.png'} alt={props.guildname} />
					Overview
				</div>
				<div className={classes.groupSubSection}>
					<Image src={'/group_members_icon.png'} alt={props.guildname} />
					Members
				</div>
			</div>
			<div className={classes.groupSeparator}>...</div>
		</div>
	);
}
