import React, { Component } from "react";
import classNames from "classnames";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarNavItems from "./SidebarNavItems";
import { actions as menuActions } from "../MainNavbar";
import { userMenu } from "../../../utils/helper";

const { toggleSidebar } = menuActions;

class MainSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount = () => {
    const { t, user } = this.props;
    const { items } = this.state;

    if (user && items.length === 0) {
      this.setState({ items: userMenu(t, user.user_type) });
    }
  };

  render = () => {
    const { menuVisible, t, user } = this.props;
    let { items } = this.state;
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      menuVisible && "open"
    );

    if (items.length === 0) {
      items = userMenu(t, user.user_type);
    }

    return (
      <Col
        style={{ zIndex: 1030 }}
        tag="aside"
        className={classes}
        lg={{ size: 2 }}
        md={{ size: 3 }}
      >
        <SidebarMainNavbar />
        {items.length ? <SidebarNavItems items={items} /> : null}
      </Col>
    );
  };
}

const mapStateToProps = state => ({
  menuVisible: state.menuReducer.menuVisible,
  user: state.sessionReducer.user
});

export default withTranslation()(
  connect(mapStateToProps, { toggleSidebar })(MainSidebar)
);
