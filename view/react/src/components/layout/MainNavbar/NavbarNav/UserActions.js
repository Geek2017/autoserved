import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from 'shards-react';

import { actions as authActions } from '../../../../modules/authentication';
import { DEFAULT_AVATAR } from '../../../../utils/constants';

const { logout } = authActions;

class UserActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  _logout = () => {
    const { history, logout } = this.props;
    logout()
      .then(() => {
        history.push('/login');
      })
      .catch(error => {
        console.error(error);
      });
  };

  _toggleUserActions = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  render = () => {
    const { t, user } = this.props;
    const { visible } = this.state;
    return user ? (
      <NavItem tag={Dropdown} toggle={this._toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="btn text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={user && user.avatar ? user.avatar : DEFAULT_AVATAR}
            alt="User Avatar"
          />{' '}
          <span className="d-none d-inline-block">
            {user ? `${user.fname} ${user.lname}` : null}
          </span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={visible}>
          <DropdownItem tag={Link} to="/profile">
            <i className="material-icons">person</i>{' '}
            {t('translation.menuProfile')}
          </DropdownItem>
          <DropdownItem tag={Link} to="/settings">
            <i className="material-icons">settings</i>{' '}
            {t('translation.menuSettings')}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            tag={Link}
            onClick={this._logout}
            to="/logout"
            className="text-danger"
          >
            <i className="material-icons text-danger">input</i>{' '}
            {t('translation.menuLogout')}
          </DropdownItem>
        </Collapse>
      </NavItem>
    ) : null;
  };
}

const mapStateToProps = state => ({
  user: state.sessionReducer.user
});

export default withRouter(
  withTranslation()(
    connect(
      mapStateToProps,
      { logout }
    )(UserActions)
  )
);
