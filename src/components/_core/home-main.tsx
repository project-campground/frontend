"use client";

import React from "react";
import { Button, Text, Title, Group, Image } from "@mantine/core";

type Props = {
  translate: any;
  pathname: any;
  locale: any;
  styles: any;
};

class HomeMain extends React.Component<Props, { mounted: boolean }> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { translate, pathname, locale, styles } = this.props;
    return (
		<div className={styles.mainpage}>
			<div style={{ marginLeft: "16px" }}>
			<Title>{translate("home.title")}</Title>
			<Text ta="left" mt={15}>
			{translate("home.description")}
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