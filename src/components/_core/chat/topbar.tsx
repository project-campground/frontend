import { Text } from '@mantine/core';
import classes from './topbar.module.scss';

interface TopbarInfo {
	title: string;
	subtitle: string;
}

export function Topbar(props:TopbarInfo) {
	return (
		<nav className={classes.topbar}>
			<div className={classes.topbarMain}>
				<Text className={classes.title}>
					{props.title}
				</Text>
				<Text className={classes.subtitle} lineClamp={1}>
					{props.subtitle}
				</Text>
			</div>
		</nav>
	);
}
