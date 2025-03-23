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

		const mock_spaces:Array<any> = [
			{ img: '/dm_icon.png', label: 'Home' },
			{ img: '/sample_servericon.png', label: 'Programming Space' },
			{ icon: IconDeviceDesktopAnalytics, label: 'Campground' },
			{ icon: IconCalendarStats, label: 'Imasine Chat' },
			{ icon: IconUser, label: 'DevilConnection Unofficial' },
		];
		const mock_rooms:Array<any> = [
			{ icon: '/rules.png', label: 'Rules' },
			{ icon: '/announcements.png', label: 'News' },
			{ icon: '/rules.png', label: 'General Chat' },
			{ icon: '/rules.png', label: 'General Forums' },
		];
		const mock_user_groups:Array<any> = [
			{ id: 0, priority: 0, label: 'Counsellors', hide: false, color: '#CC3332' },
			{ id: 1, priority: 1, label: 'Campground Team', hide: false, color: '#FF5A26' },
			{ id: 2, priority: 2, label: 'Scout Leaders', hide: true, color: '#9558FF' },
			{ id: 3, priority: 3, label: 'CM Lead', hide: true, color: '#C4C9CE' },
			{ id: 4, priority: 4, label: 'Branding Designer', hide: true, color: '#C4C9CE' },
			{ id: 5, priority: 5, label: 'Backend Lead', hide: true, color: '#C4C9CE' },
			{ id: 6, priority: 6, label: 'Frontend Lead', hide: true, color: '#C4C9CE' },
			{ id: 7, priority: 7, label: 'Backend Developer', hide: true, color: '#C4C9CE' },
			{ id: 8, priority: 8, label: 'Frontend Developer', hide: true, color: '#C4C9CE' },
			{ id: 9, priority: 9, label: 'UX/UI Designer', hide: true, color: '#C4C9CE' },
			{ id: 10, priority: 10, label: 'Scouts', hide: false, color: '#1B8FFF' },
			{ id: 11, priority: 11, label: 'Contributors', hide: false, color: '#FF9D1D' },
			{ id: 12, priority: 12, label: 'Translators', hide: false, color: '#1DE2A0' },
			{ id: 13, priority: 13, label: 'Insiders', hide: false, color: '#F0D426' },
			{ id: 14, priority: 14, label: 'Campers', hide: false, color: '#2ECC71' },
			{ id: 15, priority: 15, label: 'Announcements', hide: true, color: '#C4C9CE' },
			{ id: 16, priority: 16, label: 'Events', hide: true, color: '#C4C9CE' },
			{ id: 17, priority: 17, label: 'Updates', hide: true, color: '#C4C9CE' },
			{ id: 18, priority: 18, label: 'Changelogs', hide: true, color: '#C4C9CE' },
		];
		const mock_users:Array<any> = [
			{ id: 12, img: '/sample_servericon.png', label: 'Reapimus [Dev]', roles: [0,1,5,7,8,14,15,17,18] },
			{ id: 1, img: '/sample_servericon.png', label: 'AcousticJamm [CM]', roles: [0,1,14] },
			{ id: 2, img: '/sample_servericon.png', label: 'daskie [CM]', roles: [0,1,2,12,3,4,14] },
			{ id: 3, img: '/sample_servericon.png', label: 'PGN [Dev]', roles: [1,8,7,14,15,16,17,18] },
			{ id: 4, img: '/sample_servericon.png', label: 'R.A.G [Dev]', roles: [1,6,7,8,14,15,16,17,18] },
			{ id: 5, img: '/sample_servericon.png', label: 'Fish', roles: [1,9,14] },
			{ id: 6, img: '/sample_servericon.png', label: 'YumYummity [Dev]', roles: [1,8,14] },
			{ id: 7, img: '/sample_servericon.png', label: 'Ye Olde Harbinger [Mod]', roles: [10,14,15,17] },
			{ id: 8, img: '/sample_servericon.png', label: 'Koi', roles: [12,14,15,17,18] },
			{ id: 9, img: '/sample_servericon.png', label: 'Cactus', roles: [11,14] },
			{ id: 10, img: '/sample_servericon.png', label: 'Brunch', roles: [13,14] },
			{ id: 11, img: '/sample_servericon.png', label: 'sojjlet', roles: [14] },
		];
		const mockguild = 'Programming Space';
		const mockbanner = '/sample_banner.jpg';

		return (
			<div className={styles.chatpage}>
				<div className={styles.serverslist}>
					<Servers servers={mock_spaces} />
				</div>
				<div className={styles.channelslist}>
					<Channels guildname={mockguild} guildbanner={mockbanner} channels={mock_rooms} />
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
					<Rightbar users={mock_users} groups={mock_user_groups} />
				</div>
			</div>
		);
	}
}

export default ChatMain;