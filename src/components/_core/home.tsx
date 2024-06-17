"use client";

import React from "react";
import styles from "./css/_main.module.scss";

import Navbar from "../navbar/navbar";
import HomeMain from "./home-main";

interface IProps {
  commonProps?: any;
};

interface IState {
  mainView?: string;
};

class HomePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      mainView: 'home'
    };
  }

  render() {
    let renderComp:any = '';

    switch(this.state.mainView) {
      case 'home':
        renderComp = (<HomeMain
          commonProps={this.props.commonProps}
          styles={styles}
        />);
    }

    return (
      <div id={styles.root} className={styles.homepage}>
        <Navbar commonProps={this.props.commonProps} />
        {renderComp}
      </div>
    );
  }
}

export default HomePage;