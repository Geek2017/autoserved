import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'shards-react';

const NavbarSearch = ({ hidden, t }) => (
  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
    {!hidden ? (
      <InputGroup seamless className="ml-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <i className="material-icons">search</i>
          </InputGroupText>
        </InputGroupAddon>
        <FormInput
          className="navbar-search"
          placeholder={t('common.phSearch')}
        />
      </InputGroup>
    ) : null}
  </Form>
);

NavbarSearch.defaultProps = {
  hidden: false
};

NavbarSearch.propTypes = {
  hidden: PropTypes.bool
};

export default withTranslation()(NavbarSearch);
