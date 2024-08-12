"use client";

import React from "react";
import { Button, Text, Title, Group, Image } from "@mantine/core";
import { Servers } from "./sidebar";
import { Channels } from "./channelbar";
import { Rightbar } from "./rightbar";
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
import { Topbar } from "./topbar";

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
			{ icon: IconGauge, label: 'Programming Space' },
			{ icon: IconDeviceDesktopAnalytics, label: 'Programming Space' },
			{ icon: IconCalendarStats, label: 'Programming Space' },
			{ icon: IconUser, label: 'Programming Space' },
			{ icon: IconFingerprint, label: 'Programming Space' },
			{ icon: IconSettings, label: 'Programming Space' },
		];
		const mockdata2:Array<any> = [
			{ label: 'Welcome' },
			{ label: 'Rules' },
			{ label: 'News' },
			{ label: 'General Chat' },
			{ label: 'Off-topic' },
			{ label: 'General Forums' },
			{ label: 'Settings' },
		];
		const mockdata3:Array<any> = [
			{ icon: IconHome2, label: 'PrettyGoodName' },
			{ icon: IconGauge, label: 'Username' },
			{ icon: IconDeviceDesktopAnalytics, label: 'Username' },
			{ icon: IconCalendarStats, label: 'Username' },
			{ icon: IconUser, label: 'Username' },
			{ icon: IconFingerprint, label: 'Username' },
			{ icon: IconSettings, label: 'Username' },
		];
		
		return (
			<div className={styles.chatpage}>
				<div className={styles.serverslist}>
					<Servers servers={mockdata} />
				</div>
				<div className={styles.channelslist}>
					<Channels channels={mockdata2} />
				</div>
				<Topbar
					title={translate("home.title")}
					subtitle={translate.rich("home.description", { br: () => '' })}
				/>
				<div className={styles.mainchat}>
					<Group gap={5}>
						<Button mt={25} disabled>
						{translate("home.download")}
						</Button>
						<Button mt={25} style={{ marginLeft: "4px" }}>
						{translate("home.open")}
						</Button>
					</Group>
				</div>
				<div className={styles.rightbar}>
					<Rightbar items={mockdata3} />
				</div>
			</div>
		);
	}
}

export default ChatMain;