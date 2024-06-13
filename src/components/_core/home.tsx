"use client";

import React from "react";
import styles from "./css/_main.module.scss";

import Navbar from "../navbar";
import HomeMain from "./home-main";

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
    return (
      <div id={styles.root} className={styles.homepage}>
        <Navbar
          translate={this.props.translate}
          pathname={this.props.pathname}
          locale={this.props.locale}
        />
        <HomeMain
          translate={this.props.translate}
          pathname={this.props.pathname}
          locale={this.props.locale}
          styles={styles}
        />
      </div>
    );
  }
}

export default HomePage;