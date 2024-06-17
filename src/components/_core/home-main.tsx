"use client";

import React from "react";
import { Button, Text, Title, Group, Image } from "@mantine/core";

interface IProps {
  commonProps?: any;
  styles?: any;
};

interface IState {
};

class HomeMain extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { translate, pathname, locale } = this.props.commonProps;
	const { styles } = this.props;
    return (
		<div className={styles.mainpage}>
			<div style={{ marginLeft: "16px" }}>
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

export default HomeMain;