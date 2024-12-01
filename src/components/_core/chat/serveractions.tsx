import { useState } from 'react';
import { Image } from '@mantine/core';
import classes from './chanbar.module.scss';

interface ServerActionProps {
	guildname: string;
	guildbanner: string;
}

export function ServerActions(props:ServerActionProps) {
	const [opened, setOpen] = useState(false);

	return (
		<div className={classes.chanbarImg}>
			<Image radius={'30px 30px 0 0'} src={props.guildbanner} alt={props.guildname} />
			<div className={classes.chanbarName}>
				<div className={classes.chanbarClickable}>
					<span>{props.guildname}</span>
				</div>
			</div>
		</div>
	);
}
