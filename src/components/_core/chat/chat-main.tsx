"use client";

import React from "react";
import { Button, Text, Title, Group, Image } from "@mantine/core";
import { Servers } from "./sidebar";

import {
	IconHome2,
	IconGauge,
	IconDeviceDesktopAnalytics,
	IconFingerprint,
	IconCalendarStats,
	IconUser,
	IconSettings,
	IconLogout,
	IconSwitchHorizontal,
} from '@tabler/icons-react';

interface IProps {
  commonProps?: any;
  styles?: any;
};

interface IState {
};

class ChatMain extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	render() {
		const { translate, pathname, locale } = this.props.commonProps;
		const { styles } = this.props;

		const mockdata:Array<any> = [
			{ icon: IconHome2, label: 'Home' },
			{ icon: IconGauge, label: 'Dashboard' },
			{ icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
			{ icon: IconCalendarStats, label: 'Releases' },
			{ icon: IconUser, label: 'Account' },
			{ icon: IconFingerprint, label: 'Security' },
			{ icon: IconSettings, label: 'Settings' },
		];
		
		return (
			<div className={styles.chatpage}>
				<div className={styles.serverslist}>
					<Servers servers={mockdata} />
				</div>
				<div className={styles.mainchat}>
					<Title>{translate("home.title")}</Title>
					<Text ta="left" mt={15}>
						{translate.rich("home.description", {
							br: () => <br />
						})}
					</Text>
					<Group gap={5}>
						<Button mt={25} disabled>
						{translate("home.download")}
						</Button>
						<Button mt={25} style={{ marginLeft: "4px" }}>
						{translate("home.open")}
						</Button>
					</Group>
				</div>
			</div>
		);
	}
}

export default ChatMain;