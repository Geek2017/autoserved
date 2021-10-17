import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Container, Navbar, NavbarBrand } from 'shards-react';

import NavbarSearch from './NavbarSearch';
import NavbarNav from './NavbarNav/NavbarNav';
import NavbarToggle from './NavbarToggle';
import { LOGO } from '../../../utils/constants';

const MainNavbar = ({ noLogo, t }) => {
  return (
    <div className="main-navbar bg-white sticky-top">
      <Container fluid className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          {!noLogo ? (
            <NavbarBrand
              className="w-100 mr-0"
              href="#"
              style={{ lineHeight: '25px' }}
            >
              <div className="d-table my-auto mx-3">
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1"
                  src={LOGO}
                  alt={t('translation.appName')}
                />
              </div>
            </NavbarBrand>
          ) : null}
          <NavbarSearch hidden />
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.defaultProps = {
  noLogo: false
};

MainNavbar.propTypes = {
  noLogo: PropTypes.bool
};

export default withTranslation()(MainNavbar);
