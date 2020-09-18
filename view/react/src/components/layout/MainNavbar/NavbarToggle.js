import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions as menuActions } from './index';

const { toggleSidebar } = menuActions;

class NavbarToggle extends Component {
  _handleClick = () => {
    const { toggleSidebar, menuVisible } = this.props;
    toggleSidebar(!menuVisible);
  };

  render = () => (
    <nav className="nav">
      <span
        onClick={this._handleClick}
        className="btn rounded-0 nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-none d-lg-none text-center border-left"
      >
        <i className="material-icons">menu</i>
      </span>
    </nav>
  );
}

const mapStateToProps = state => ({
  menuVisible: state.menuReducer.menuVisible
});

export default connect(
  mapStateToProps,
  { toggleSidebar }
)(NavbarToggle);
