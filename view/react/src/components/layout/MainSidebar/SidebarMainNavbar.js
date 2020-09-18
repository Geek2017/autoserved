import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand } from 'shards-react';

import { actions as menuActions } from '../MainNavbar';
import { LOGO } from '../../../utils/constants';

const { toggleSidebar } = menuActions;

class SidebarMainNavbar extends Component {
  _handleToggleSidebar = () => {
    const { toggleSidebar, menuVisible } = this.props;
    toggleSidebar(!menuVisible);
  };

  render = () => {
    const { t } = this.props;
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: '25px' }}
          >
            <div className="d-table m-auto">
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                src={LOGO}
                alt={t('translation.appName')}
              />
            </div>
          </NavbarBrand>
          <span
            className="btn toggle-sidebar d-sm-inline d-md-none d-lg-none text-center border-left"
            onClick={this._handleToggleSidebar}
          >
            <i className="material-icons">close</i>
          </span>
        </Navbar>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  menuVisible: state.menuReducer.menuVisible
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { toggleSidebar }
  )(SidebarMainNavbar)
);
