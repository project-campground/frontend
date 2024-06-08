"use client";

import React from "react";
import Navbar from "../navbar";
import { Button, Text, Title, Group, Image } from "@mantine/core";

type Props = {
  translate: any;
  pathname: any;
  locale: any;
};

class HomePage extends React.Component<Props, { mounted: boolean }> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { translate } = this.props;
    return (
      <>
        <Navbar />
        <div>
          <div style={{ marginLeft: "16px" }}>
            <Title>{translate("home.title")}</Title>
            <Text ta="left" mt={15}>
              Campground is a place for you and your friends to hang out, <br />
              chat, and have fun without any hassle!{" "}
            </Text>
            <Group gap={5}>
              <Button mt={25} disabled>
                Download Campground
              </Button>
              <Button mt={25} style={{ marginLeft: "4px" }}>
                Open Campground
              </Button>
            </Group>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;