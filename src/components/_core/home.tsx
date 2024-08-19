"use client";

import React from "react";
import styles from "./css/_main.module.scss";

import HomeMain from "./home-main";
import ChatMain from "./chat/chat-main";

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

  changeView(_this:any, view:string) {
    _this.setState({mainView: view});
  }

  render() {
    let renderComp:any = '';

    switch(this.state.mainView) {
      case 'home':
        renderComp = (<HomeMain
          commonProps={this.props.commonProps}
          styles={styles}
          homeComp={this}
        />);
        break;
      case 'chat':
        renderComp = (<ChatMain
          commonProps={this.props.commonProps}
          styles={styles}
        />);
        break;
    }

    return (
      <div id={styles.root} className={styles.homepage}>
        {renderComp}
      </div>
    );
  }
}

export default HomePage;